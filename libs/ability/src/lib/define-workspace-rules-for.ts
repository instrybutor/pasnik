import { Ability, AbilityBuilder, AbilityClass } from '@casl/ability';
import {
  OrderModel,
  OrderStatus,
  UserModel,
  WorkspaceModel,
  WorkspacePrivacy,
  WorkspaceUserModel,
  WorkspaceUserRole,
} from '@pasnik/api/data-transfer';

export enum WorkspacesAction {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
  Leave = 'leave',
  Join = 'join',
  CreateOrder = 'createOrder',
  RequestAccess = 'request-access',
  ApproveAccess = 'approve-access',
  ChangeOwner = 'change-owner',
}

export enum WorkspaceUsersAction {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
  Promote = 'promote',
  Demote = 'demote',
}

export enum OrdersAction {
  Manage = 'manage',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
  Duplicate = 'duplicate',
  MarkAsOrdered = 'markAsOrdered',
  MarkAsDelivered = 'markAsDelivered',
  MarkAsClosed = 'markAsClosed',
  MarkAsOpen = 'markAsOpen',
  CreateDish = 'createDish',
  ManageDish = 'ManageDish',
  SetPayer = 'setPayer',
}

export enum UsersAction {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
  SeeEmails = 'seeEmails',
}

export type AppAbility = Ability<
  | [WorkspacesAction, WorkspaceModel | 'WorkspaceModel']
  | [WorkspaceUsersAction, WorkspaceUserModel | 'WorkspaceUserModel']
  | [OrdersAction, OrderModel | 'OrderModel']
  | [UsersAction, UserModel | 'UserModel']
  | ['manage', 'all']
>;

type AppAbilityBuilder = AbilityBuilder<AppAbility>;

function defineAdminRules({ can }: AppAbilityBuilder) {
  // can('manage', 'all');
  can(UsersAction.SeeEmails, 'UserModel');
  can(UsersAction.Read, 'UserModel');
  can(WorkspacesAction.Update, 'WorkspaceModel');
  can(WorkspacesAction.Delete, 'WorkspaceModel');
  can(WorkspacesAction.Read, 'WorkspaceModel');
}

function defineWorkspaceOwnerRules(
  { can, cannot }: AppAbilityBuilder,
  workspaceUser: WorkspaceUserModel
) {
  // WorkspaceModel
  cannot(WorkspacesAction.Leave, 'WorkspaceModel');
  can(WorkspacesAction.ChangeOwner, 'WorkspaceModel');

  // WorkspaceUserModel
  can(WorkspaceUsersAction.Delete, 'WorkspaceUserModel');
  cannot(WorkspaceUsersAction.Delete, 'WorkspaceUserModel', {
    role: WorkspaceUserRole.Owner,
  });

  can(WorkspaceUsersAction.Promote, 'WorkspaceUserModel', {
    role: WorkspaceUserRole.User,
  });
  can(WorkspaceUsersAction.Demote, 'WorkspaceUserModel', {
    role: WorkspaceUserRole.Admin,
  });
  can(WorkspaceUsersAction.Update, 'WorkspaceUserModel');
  cannot(WorkspaceUsersAction.Update, 'WorkspaceUserModel', {
    id: workspaceUser.id,
  });
}

function defineWorkspaceAdminRules(
  { can, cannot }: AppAbilityBuilder,
  workspaceUser: WorkspaceUserModel
) {
  can(WorkspaceUsersAction.Create, 'WorkspaceUserModel');

  can(WorkspaceUsersAction.Delete, 'WorkspaceUserModel', {
    role: WorkspaceUserRole.User,
  });
  cannot(WorkspaceUsersAction.Delete, 'WorkspaceUserModel', {
    id: workspaceUser.id,
  });

  can(OrdersAction.MarkAsOrdered, 'OrderModel', {
    status: OrderStatus.Delivered,
  });
}

function defineWorkspaceUserRules(
  { can, cannot }: AppAbilityBuilder,
  workspaceUser: WorkspaceUserModel
) {
  can(WorkspacesAction.Create, 'WorkspaceModel');
  can(WorkspacesAction.CreateOrder, 'WorkspaceModel');
  can(WorkspacesAction.Leave, 'WorkspaceModel');
  can(WorkspacesAction.Read, 'WorkspaceModel');
  cannot(WorkspacesAction.Join, 'WorkspaceModel');

  // OrderModel
  can(OrdersAction.Read, 'OrderModel');
  can(OrdersAction.Update, 'OrderModel', {
    status: OrderStatus.InProgress,
  });
  can(OrdersAction.MarkAsClosed, 'OrderModel', {
    status: OrderStatus.InProgress,
  });
  can(OrdersAction.MarkAsOrdered, 'OrderModel', {
    status: OrderStatus.InProgress,
  });
  cannot(OrdersAction.MarkAsOrdered, 'OrderModel', {
    dishes: { $size: 0 },
  });
  can(OrdersAction.MarkAsOpen, 'OrderModel', {
    status: OrderStatus.Canceled,
  });
  can(OrdersAction.MarkAsOpen, 'OrderModel', {
    status: OrderStatus.Ordered,
  });
  can(OrdersAction.MarkAsDelivered, 'OrderModel', {
    status: OrderStatus.Ordered,
  });
  can(OrdersAction.Duplicate, 'OrderModel', {
    status: OrderStatus.Delivered,
  });
  can(OrdersAction.CreateDish, 'OrderModel', {
    status: OrderStatus.InProgress,
  });
  can(OrdersAction.ManageDish, 'OrderModel', {
    status: OrderStatus.InProgress,
  });
  can(OrdersAction.SetPayer, 'OrderModel', {
    status: OrderStatus.Ordered,
  });
}

function defineWorkspaceAnonymousRules({ can }: AppAbilityBuilder) {
  can(WorkspacesAction.Create, 'WorkspaceModel');
  can(WorkspacesAction.Read, 'WorkspaceModel', {
    privacy: WorkspacePrivacy.Public,
  });
  can(WorkspacesAction.Join, 'WorkspaceModel', {
    privacy: WorkspacePrivacy.Public,
  });
  can(WorkspacesAction.RequestAccess, 'WorkspaceModel', {
    privacy: WorkspacePrivacy.PrivateToMembers,
  });
}

export function defineWorkspaceRulesFor(
  user?: UserModel,
  workspaceUser?: WorkspaceUserModel
) {
  const builder = new AbilityBuilder<AppAbility>(
    Ability as AbilityClass<AppAbility>
  );

  if (user?.isAdmin) {
    defineAdminRules(builder);
  }

  switch (workspaceUser?.role) {
    case WorkspaceUserRole.Owner:
      defineWorkspaceUserRules(builder, workspaceUser);
      defineWorkspaceAdminRules(builder, workspaceUser);
      defineWorkspaceOwnerRules(builder, workspaceUser);
      break;
    case WorkspaceUserRole.Admin:
      defineWorkspaceUserRules(builder, workspaceUser);
      defineWorkspaceAdminRules(builder, workspaceUser);
      break;
    case WorkspaceUserRole.User:
      defineWorkspaceUserRules(builder, workspaceUser);
      break;
    default:
      defineWorkspaceAnonymousRules(builder);
      break;
  }

  return builder.build({
    detectSubjectType: (subject) => subject.kind,
  });
}
