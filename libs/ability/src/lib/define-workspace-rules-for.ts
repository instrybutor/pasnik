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
  MarkAsOpened = 'markAsOpened',
}

export enum UsersAction {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}

export type AppAbility = Ability<
  | [WorkspacesAction, WorkspaceModel | 'WorkspaceModel']
  | [WorkspaceUsersAction, WorkspaceUserModel | 'WorkspaceUserModel']
  | [OrdersAction, OrderModel | 'OrderModel']
  | [UsersAction, UserModel | 'UserModel']
  | ['manage', 'all']
>;

type AppAbilityBuilder = AbilityBuilder<AppAbility>;

function defineAdminRules({ can, cannot }: AppAbilityBuilder) {
  // can('manage', 'all');
}

function defineWorkspaceOwnerRules(
  { can, cannot }: AppAbilityBuilder,
  workspaceUser: WorkspaceUserModel
) {
  // WorkspaceModel
  can(WorkspacesAction.Manage, 'WorkspaceModel');
  cannot(WorkspacesAction.Join, 'WorkspaceModel');
  cannot(WorkspacesAction.Leave, 'WorkspaceModel');

  // WorkspaceUserModel
  cannot(WorkspaceUsersAction.Delete, 'WorkspaceUserModel', {
    id: workspaceUser.id,
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

  // OrderModel
  can(OrdersAction.Manage, 'OrderModel');
}

function defineWorkspaceAdminRules(
  { can, cannot }: AppAbilityBuilder,
  workspaceUser: WorkspaceUserModel
) {
  can(WorkspacesAction.Update, 'WorkspaceModel');

  can(WorkspaceUsersAction.Create, 'WorkspaceUserModel');

  can(WorkspaceUsersAction.Delete, 'WorkspaceUserModel');
  cannot(WorkspaceUsersAction.Delete, 'WorkspaceUserModel', {
    id: workspaceUser.id,
  });
}

function defineWorkspaceUserRules(
  { can, cannot }: AppAbilityBuilder,
  workspaceUser: WorkspaceUserModel
) {
  can(WorkspacesAction.Create, 'WorkspaceModel');
  can(WorkspacesAction.Leave, 'WorkspaceModel');
  can(WorkspacesAction.Read, 'WorkspaceModel');
  cannot(WorkspacesAction.Join, 'WorkspaceModel');
  can(WorkspacesAction.CreateOrder, 'WorkspaceModel');

  // OrderModel
  can(OrdersAction.Read, 'OrderModel');
  can(OrdersAction.Update, 'OrderModel', {
    userId: workspaceUser.user!.id,
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
  can(OrdersAction.MarkAsOpened, 'OrderModel', {
    status: OrderStatus.Canceled,
  });
  can(OrdersAction.MarkAsOpened, 'OrderModel', {
    status: OrderStatus.Ordered,
  });
  can(OrdersAction.MarkAsDelivered, 'OrderModel', {
    status: OrderStatus.Ordered,
  });
  can(OrdersAction.Duplicate, 'OrderModel', {
    status: OrderStatus.Delivered,
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
      defineWorkspaceOwnerRules(builder, workspaceUser);
      defineWorkspaceAdminRules(builder, workspaceUser);
      break;
    case WorkspaceUserRole.Admin:
      defineWorkspaceAdminRules(builder, workspaceUser);
      defineWorkspaceUserRules(builder, workspaceUser);
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
