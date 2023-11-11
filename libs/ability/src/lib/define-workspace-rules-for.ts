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
}

export enum OrdersAction {
  Manage = 'manage',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
  Duplicate = 'duplicate',
  MarkAsProcessing = 'markAsProcessing',
  MarkAsOrdered = 'markAsOrdered',
  MarkAsDelivered = 'markAsDelivered',
  SetETA = 'setETA',
  MarkAsClosed = 'markAsClosed',
  MarkAsOpen = 'markAsOpen',
  CreateDish = 'createDish',
  UpdateDish = 'updateDish',
  DeleteDish = 'deleteDish',
  UpdateDishOwner = 'updateDishOwner',
  SetPayer = 'setPayer',
}

export enum UsersAction {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
  SeeEmails = 'seeEmails',
  ApproveAccess = 'approveAccess',
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
  can(WorkspaceUsersAction.Update, 'WorkspaceUserModel');
}

function defineWorkspaceOwnerRules(
  { can, cannot }: AppAbilityBuilder,
  workspaceUser: WorkspaceUserModel
) {
  // WorkspaceModel
  cannot(WorkspacesAction.Leave, 'WorkspaceModel');
  can(WorkspacesAction.ChangeOwner, 'WorkspaceModel');
  can(WorkspacesAction.Update, 'WorkspaceModel');
  can(WorkspacesAction.Delete, 'WorkspaceModel');

  // WorkspaceUserModel
  can(WorkspaceUsersAction.Delete, 'WorkspaceUserModel');
  cannot(WorkspaceUsersAction.Delete, 'WorkspaceUserModel', {
    role: WorkspaceUserRole.Owner,
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
  can(UsersAction.ApproveAccess, 'UserModel');
  can(WorkspaceUsersAction.Create, 'WorkspaceUserModel');
  can(WorkspacesAction.ApproveAccess, 'WorkspaceModel');

  can(WorkspaceUsersAction.Delete, 'WorkspaceUserModel', {
    role: WorkspaceUserRole.User,
  });
  cannot(WorkspaceUsersAction.Delete, 'WorkspaceUserModel', {
    id: workspaceUser.id,
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
  can(OrdersAction.MarkAsClosed, 'OrderModel');
  cannot(OrdersAction.MarkAsClosed, 'OrderModel', {
    status: OrderStatus.Delivered,
  });
  cannot(OrdersAction.MarkAsClosed, 'OrderModel', {
    status: OrderStatus.Canceled,
  });
  can(OrdersAction.MarkAsProcessing, 'OrderModel', {
    status: OrderStatus.InProgress,
  });
  can(OrdersAction.MarkAsOrdered, 'OrderModel', {
    status: OrderStatus.Processing,
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
  can(OrdersAction.MarkAsOpen, 'OrderModel', {
    status: OrderStatus.Processing,
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
  can(OrdersAction.UpdateDish, 'OrderModel', {
    status: OrderStatus.InProgress,
  });
  can(OrdersAction.UpdateDish, 'OrderModel', {
    status: OrderStatus.Processing,
  });
  can(OrdersAction.DeleteDish, 'OrderModel', {
    status: OrderStatus.Processing,
  });
  can(OrdersAction.DeleteDish, 'OrderModel', {
    status: OrderStatus.InProgress,
  });
  can(OrdersAction.SetPayer, 'OrderModel');
  can(OrdersAction.SetETA, 'OrderModel', {
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
