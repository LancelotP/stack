export type Maybe<T> = T | null;

export interface EstateCreateInput {
  address: AddressCreateInput;

  surface: number;

  name: string;

  type: EstateType;

  estimatedPrice: Maybe<number>;
}

export interface AddressCreateInput {
  addressLine1: string;

  addressLine2: Maybe<string>;

  addressLine3: Maybe<string>;

  postalCode: string;

  city: string;

  country: CountryCode;
}

export interface SaleCreateInput {
  estateId: number;
}

export interface UserRegisterInput {
  email: string;
}

export interface UserUpdateInput {
  userId: number;

  firstName: Maybe<string>;

  lastName: Maybe<string>;

  gender: Maybe<UserGender>;
}

export interface VaultFolderCreateInput {
  vaultId: number;

  parentId: number;

  name: string;
}

export interface VaultFolderDeleteInput {
  vaultFolderId: number;
}

export enum EstateType {
  Building = "BUILDING"
}

export enum CountryCode {
  Fr = "FR"
}

export enum UserGender {
  Male = "male",
  Female = "female"
}

export enum UserOnboardingStep {
  Identity = "identity",
  Profile = "profile",
  Plan = "plan",
  Contract = "contract",
  Completed = "completed"
}

export enum FileType {
  Pdf = "pdf"
}

export enum CacheControlScope {
  Public = "PUBLIC",
  Private = "PRIVATE"
}

/** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
export type DateTime = any;

/** A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
export type Date = any;

/** A time string at UTC, such as 10:15:30Z, compliant with the `full-time` format outlined in section 5.6 of the RFC 3339profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
export type Time = any;

// ====================================================
// Scalars
// ====================================================

// ====================================================
// Types
// ====================================================

export interface Query {
  _empty: Maybe<string>;

  sales: Sale[];

  viewer: Maybe<User>;
}

export interface Sale {
  id: number;

  isSeller: boolean;

  isBuyer: boolean;

  estate: Estate;

  buyers: SaleBuyer[];

  seller: User;

  vault: Maybe<Vault>;
}

export interface Estate {
  id: number;

  surface: number;

  type: EstateType;

  name: string;

  estimatedPrice: Maybe<number>;

  address: Address;

  owner: User;

  pictures: EstatePicture[];

  currentSale: Maybe<Sale>;

  vault: Vault;
}

export interface Address {
  id: number;

  addressLine1: string;

  addressLine2: Maybe<string>;

  addressLine3: Maybe<string>;

  postalCode: string;

  city: string;

  country: CountryCode;
}

export interface User {
  id: number;

  firstName: Maybe<string>;

  lastName: Maybe<string>;

  gender: Maybe<UserGender>;

  email: Maybe<string>;

  isViewer: boolean;

  onboardingStep: UserOnboardingStep;

  avatar: Maybe<Image>;

  estates: Estate[];

  transactions: Transaction[];

  notifications: Notification[];
}

export interface Image {
  id: number;
}

export interface Rent {
  id: number;

  estate: Estate;

  owner: User;

  tenant: User;

  lease: Maybe<File>;
}

export interface File {
  id: number;

  type: FileType;
}

export interface Evaluation {
  id: number;

  estate: Estate;

  expert: User;

  report: Maybe<File>;
}

export interface Notification {
  id: number;

  createdAt: DateTime;

  readAt: Maybe<DateTime>;
}

export interface EstatePicture {
  id: number;

  description: Maybe<string>;

  picture: Image;
}

export interface Vault {
  id: number;
}

export interface SaleBuyer {
  id: number;

  joinedAt: DateTime;

  user: User;

  loi: Maybe<File>;
}

export interface Mutation {
  _empty: Maybe<string>;

  estateCreate: Estate;

  saleCreate: Maybe<Sale>;

  userRegister: boolean;

  userUpdate: User;

  vaultFolderCreate: VaultFolder;

  vaultFolderDelete: VaultFolder;
}

export interface VaultFolder {
  id: number;

  createdAt: DateTime;

  canUploadFile: boolean;

  canDelete: boolean;

  canChangePermissions: boolean;

  path: string[];

  name: string;

  vault: Vault;

  parent: Maybe<VaultFolder>;

  content: VaultContent[];
}

export interface VaultFile {
  id: string;

  canUpdate: boolean;

  canDelete: boolean;

  canChangePermission: boolean;

  path: string[];

  name: string;

  vault: Vault;

  parent: Maybe<VaultFolder>;

  createdAt: DateTime;

  updatedAt: DateTime;

  versions: VaultFile[];
}

export interface Subscription {
  _empty: Maybe<string>;

  notificationCreated: Notification;

  vaultFileCreated: VaultFile;

  vaultFileDeleted: VaultFile;

  vaultFileUpdate: VaultFile;

  vaultFolderCreated: VaultFolder;

  vaultFolderDeleted: VaultFolder;

  vaultFolderUpdate: VaultFolder;
}

// ====================================================
// Arguments
// ====================================================

export interface EstateCreateMutationArgs {
  input: EstateCreateInput;
}
export interface SaleCreateMutationArgs {
  input: SaleCreateInput;
}
export interface UserRegisterMutationArgs {
  input: UserRegisterInput;
}
export interface UserUpdateMutationArgs {
  input: UserUpdateInput;
}
export interface VaultFolderCreateMutationArgs {
  input: VaultFolderCreateInput;
}
export interface VaultFolderDeleteMutationArgs {
  input: VaultFolderDeleteInput;
}
export interface VaultFileCreatedSubscriptionArgs {
  vaultId: string;
}
export interface VaultFileDeletedSubscriptionArgs {
  vaultId: string;
}
export interface VaultFileUpdateSubscriptionArgs {
  vaultId: string;
}
export interface VaultFolderCreatedSubscriptionArgs {
  vaultId: string;
}
export interface VaultFolderDeletedSubscriptionArgs {
  vaultId: string;
}
export interface VaultFolderUpdateSubscriptionArgs {
  vaultId: string;
}

// ====================================================
// Unions
// ====================================================

export type Transaction = Sale | Rent | Evaluation;

export type VaultContent = VaultFile | VaultFolder;

import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig
} from "graphql";

import { Address } from "../models/address.entity";

import { Estate } from "../models/estate.entity";

import { Notification } from "../models/notification.entity";

import { Sale } from "../models/sale.entity";

import { User } from "../models/user.entity";

import { FZLContext } from "../middlewares/context";

export type Resolver<Result, Parent = {}, Context = {}, Args = {}> = (
  parent: Parent,
  args: Args,
  context: Context,
  info: GraphQLResolveInfo
) => Promise<Result> | Result;

export interface ISubscriptionResolverObject<Result, Parent, Context, Args> {
  subscribe<R = Result, P = Parent>(
    parent: P,
    args: Args,
    context: Context,
    info: GraphQLResolveInfo
  ): AsyncIterator<R | Result> | Promise<AsyncIterator<R | Result>>;
  resolve?<R = Result, P = Parent>(
    parent: P,
    args: Args,
    context: Context,
    info: GraphQLResolveInfo
  ): R | Result | Promise<R | Result>;
}

export type SubscriptionResolver<
  Result,
  Parent = {},
  Context = {},
  Args = {}
> =
  | ((
      ...args: any[]
    ) => ISubscriptionResolverObject<Result, Parent, Context, Args>)
  | ISubscriptionResolverObject<Result, Parent, Context, Args>;

export type TypeResolveFn<Types, Parent = {}, Context = {}> = (
  parent: Parent,
  context: Context,
  info: GraphQLResolveInfo
) => Maybe<Types>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult, TArgs = {}, TContext = {}> = (
  next: NextResolverFn<TResult>,
  source: any,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export namespace QueryResolvers {
  export interface Resolvers<Context = FZLContext, TypeParent = {}> {
    _empty?: _EmptyResolver<Maybe<string>, TypeParent, Context>;

    sales?: SalesResolver<Sale[], TypeParent, Context>;

    viewer?: ViewerResolver<Maybe<User>, TypeParent, Context>;
  }

  export type _EmptyResolver<
    R = Maybe<string>,
    Parent = {},
    Context = FZLContext
  > = Resolver<R, Parent, Context>;
  export type SalesResolver<
    R = Sale[],
    Parent = {},
    Context = FZLContext
  > = Resolver<R, Parent, Context>;
  export type ViewerResolver<
    R = Maybe<User>,
    Parent = {},
    Context = FZLContext
  > = Resolver<R, Parent, Context>;
}

export namespace SaleResolvers {
  export interface Resolvers<Context = FZLContext, TypeParent = Sale> {
    id?: IdResolver<number, TypeParent, Context>;

    isSeller?: IsSellerResolver<boolean, TypeParent, Context>;

    isBuyer?: IsBuyerResolver<boolean, TypeParent, Context>;

    estate?: EstateResolver<Estate, TypeParent, Context>;

    buyers?: BuyersResolver<SaleBuyer[], TypeParent, Context>;

    seller?: SellerResolver<User, TypeParent, Context>;

    vault?: VaultResolver<Maybe<Vault>, TypeParent, Context>;
  }

  export type IdResolver<
    R = number,
    Parent = Sale,
    Context = FZLContext
  > = Resolver<R, Parent, Context>;
  export type IsSellerResolver<
    R = boolean,
    Parent = Sale,
    Context = FZLContext
  > = Resolver<R, Parent, Context>;
  export type IsBuyerResolver<
    R = boolean,
    Parent = Sale,
    Context = FZLContext
  > = Resolver<R, Parent, Context>;
  export type EstateResolver<
    R = Estate,
    Parent = Sale,
    Context = FZLContext
  > = Resolver<R, Parent, Context>;
  export type BuyersResolver<
    R = SaleBuyer[],
    Parent = Sale,
    Context = FZLContext
  > = Resolver<R, Parent, Context>;
  export type SellerResolver<
    R = User,
    Parent = Sale,
    Context = FZLContext
  > = Resolver<R, Parent, Context>;
  export type VaultResolver<
    R = Maybe<Vault>,
    Parent = Sale,
    Context = FZLContext
  > = Resolver<R, Parent, Context>;
}

export namespace EstateResolvers {
  export interface Resolvers<Context = FZLContext, TypeParent = Estate> {
    id?: IdResolver<number, TypeParent, Context>;

    surface?: SurfaceResolver<number, TypeParent, Context>;

    type?: TypeResolver<EstateType, TypeParent, Context>;

    name?: NameResolver<string, TypeParent, Context>;

    estimatedPrice?: EstimatedPriceResolver<Maybe<number>, TypeParent, Context>;

    address?: AddressResolver<Address, TypeParent, Context>;

    owner?: OwnerResolver<User, TypeParent, Context>;

    pictures?: PicturesResolver<EstatePicture[], TypeParent, Context>;

    currentSale?: CurrentSaleResolver<Maybe<Sale>, TypeParent, Context>;

    vault?: VaultResolver<Vault, TypeParent, Context>;
  }

  export type IdResolver<
    R = number,
    Parent = Estate,
    Context = FZLContext
  > = Resolver<R, Parent, Context>;
  export type SurfaceResolver<
    R = number,
    Parent = Estate,
    Context = FZLContext
  > = Resolver<R, Parent, Context>;
  export type TypeResolver<
    R = EstateType,
    Parent = Estate,
    Context = FZLContext
  > = Resolver<R, Parent, Context>;
  export type NameResolver<
    R = string,
    Parent = Estate,
    Context = FZLContext
  > = Resolver<R, Parent, Context>;
  export type EstimatedPriceResolver<
    R = Maybe<number>,
    Parent = Estate,
    Context = FZLContext
  > = Resolver<R, Parent, Context>;
  export type AddressResolver<
    R = Address,
    Parent = Estate,
    Context = FZLContext
  > = Resolver<R, Parent, Context>;
  export type OwnerResolver<
    R = User,
    Parent = Estate,
    Context = FZLContext
  > = Resolver<R, Parent, Context>;
  export type PicturesResolver<
    R = EstatePicture[],
    Parent = Estate,
    Context = FZLContext
  > = Resolver<R, Parent, Context>;
  export type CurrentSaleResolver<
    R = Maybe<Sale>,
    Parent = Estate,
    Context = FZLContext
  > = Resolver<R, Parent, Context>;
  export type VaultResolver<
    R = Vault,
    Parent = Estate,
    Context = FZLContext
  > = Resolver<R, Parent, Context>;
}

export namespace AddressResolvers {
  export interface Resolvers<Context = FZLContext, TypeParent = Address> {
    id?: IdResolver<number, TypeParent, Context>;

    addressLine1?: AddressLine1Resolver<string, TypeParent, Context>;

    addressLine2?: AddressLine2Resolver<Maybe<string>, TypeParent, Context>;

    addressLine3?: AddressLine3Resolver<Maybe<string>, TypeParent, Context>;

    postalCode?: PostalCodeResolver<string, TypeParent, Context>;

    city?: CityResolver<string, TypeParent, Context>;

    country?: CountryResolver<CountryCode, TypeParent, Context>;
  }

  export type IdResolver<
    R = number,
    Parent = Address,
    Context = FZLContext
  > = Resolver<R, Parent, Context>;
  export type AddressLine1Resolver<
    R = string,
    Parent = Address,
    Context = FZLContext
  > = Resolver<R, Parent, Context>;
  export type AddressLine2Resolver<
    R = Maybe<string>,
    Parent = Address,
    Context = FZLContext
  > = Resolver<R, Parent, Context>;
  export type AddressLine3Resolver<
    R = Maybe<string>,
    Parent = Address,
    Context = FZLContext
  > = Resolver<R, Parent, Context>;
  export type PostalCodeResolver<
    R = string,
    Parent = Address,
    Context = FZLContext
  > = Resolver<R, Parent, Context>;
  export type CityResolver<
    R = string,
    Parent = Address,
    Context = FZLContext
  > = Resolver<R, Parent, Context>;
  export type CountryResolver<
    R = CountryCode,
    Parent = Address,
    Context = FZLContext
  > = Resolver<R, Parent, Context>;
}

export namespace UserResolvers {
  export interface Resolvers<Context = FZLContext, TypeParent = User> {
    id?: IdResolver<number, TypeParent, Context>;

    firstName?: FirstNameResolver<Maybe<string>, TypeParent, Context>;

    lastName?: LastNameResolver<Maybe<string>, TypeParent, Context>;

    gender?: GenderResolver<Maybe<UserGender>, TypeParent, Context>;

    email?: EmailResolver<Maybe<string>, TypeParent, Context>;

    isViewer?: IsViewerResolver<boolean, TypeParent, Context>;

    onboardingStep?: OnboardingStepResolver<
      UserOnboardingStep,
      TypeParent,
      Context
    >;

    avatar?: AvatarResolver<Maybe<Image>, TypeParent, Context>;

    estates?: EstatesResolver<Estate[], TypeParent, Context>;

    transactions?: TransactionsResolver<Transaction[], TypeParent, Context>;

    notifications?: NotificationsResolver<Notification[], TypeParent, Context>;
  }

  export type IdResolver<
    R = number,
    Parent = User,
    Context = FZLContext
  > = Resolver<R, Parent, Context>;
  export type FirstNameResolver<
    R = Maybe<string>,
    Parent = User,
    Context = FZLContext
  > = Resolver<R, Parent, Context>;
  export type LastNameResolver<
    R = Maybe<string>,
    Parent = User,
    Context = FZLContext
  > = Resolver<R, Parent, Context>;
  export type GenderResolver<
    R = Maybe<UserGender>,
    Parent = User,
    Context = FZLContext
  > = Resolver<R, Parent, Context>;
  export type EmailResolver<
    R = Maybe<string>,
    Parent = User,
    Context = FZLContext
  > = Resolver<R, Parent, Context>;
  export type IsViewerResolver<
    R = boolean,
    Parent = User,
    Context = FZLContext
  > = Resolver<R, Parent, Context>;
  export type OnboardingStepResolver<
    R = UserOnboardingStep,
    Parent = User,
    Context = FZLContext
  > = Resolver<R, Parent, Context>;
  export type AvatarResolver<
    R = Maybe<Image>,
    Parent = User,
    Context = FZLContext
  > = Resolver<R, Parent, Context>;
  export type EstatesResolver<
    R = Estate[],
    Parent = User,
    Context = FZLContext
  > = Resolver<R, Parent, Context>;
  export type TransactionsResolver<
    R = Transaction[],
    Parent = User,
    Context = FZLContext
  > = Resolver<R, Parent, Context>;
  export type NotificationsResolver<
    R = Notification[],
    Parent = User,
    Context = FZLContext
  > = Resolver<R, Parent, Context>;
}

export namespace ImageResolvers {
  export interface Resolvers<Context = FZLContext, TypeParent = Image> {
    id?: IdResolver<number, TypeParent, Context>;
  }

  export type IdResolver<
    R = number,
    Parent = Image,
    Context = FZLContext
  > = Resolver<R, Parent, Context>;
}

export namespace RentResolvers {
  export interface Resolvers<Context = FZLContext, TypeParent = Rent> {
    id?: IdResolver<number, TypeParent, Context>;

    estate?: EstateResolver<Estate, TypeParent, Context>;

    owner?: OwnerResolver<User, TypeParent, Context>;

    tenant?: TenantResolver<User, TypeParent, Context>;

    lease?: LeaseResolver<Maybe<File>, TypeParent, Context>;
  }

  export type IdResolver<
    R = number,
    Parent = Rent,
    Context = FZLContext
  > = Resolver<R, Parent, Context>;
  export type EstateResolver<
    R = Estate,
    Parent = Rent,
    Context = FZLContext
  > = Resolver<R, Parent, Context>;
  export type OwnerResolver<
    R = User,
    Parent = Rent,
    Context = FZLContext
  > = Resolver<R, Parent, Context>;
  export type TenantResolver<
    R = User,
    Parent = Rent,
    Context = FZLContext
  > = Resolver<R, Parent, Context>;
  export type LeaseResolver<
    R = Maybe<File>,
    Parent = Rent,
    Context = FZLContext
  > = Resolver<R, Parent, Context>;
}

export namespace FileResolvers {
  export interface Resolvers<Context = FZLContext, TypeParent = File> {
    id?: IdResolver<number, TypeParent, Context>;

    type?: TypeResolver<FileType, TypeParent, Context>;
  }

  export type IdResolver<
    R = number,
    Parent = File,
    Context = FZLContext
  > = Resolver<R, Parent, Context>;
  export type TypeResolver<
    R = FileType,
    Parent = File,
    Context = FZLContext
  > = Resolver<R, Parent, Context>;
}

export namespace EvaluationResolvers {
  export interface Resolvers<Context = FZLContext, TypeParent = Evaluation> {
    id?: IdResolver<number, TypeParent, Context>;

    estate?: EstateResolver<Estate, TypeParent, Context>;

    expert?: ExpertResolver<User, TypeParent, Context>;

    report?: ReportResolver<Maybe<File>, TypeParent, Context>;
  }

  export type IdResolver<
    R = number,
    Parent = Evaluation,
    Context = FZLContext
  > = Resolver<R, Parent, Context>;
  export type EstateResolver<
    R = Estate,
    Parent = Evaluation,
    Context = FZLContext
  > = Resolver<R, Parent, Context>;
  export type ExpertResolver<
    R = User,
    Parent = Evaluation,
    Context = FZLContext
  > = Resolver<R, Parent, Context>;
  export type ReportResolver<
    R = Maybe<File>,
    Parent = Evaluation,
    Context = FZLContext
  > = Resolver<R, Parent, Context>;
}

export namespace NotificationResolvers {
  export interface Resolvers<Context = FZLContext, TypeParent = Notification> {
    id?: IdResolver<number, TypeParent, Context>;

    createdAt?: CreatedAtResolver<DateTime, TypeParent, Context>;

    readAt?: ReadAtResolver<Maybe<DateTime>, TypeParent, Context>;
  }

  export type IdResolver<
    R = number,
    Parent = Notification,
    Context = FZLContext
  > = Resolver<R, Parent, Context>;
  export type CreatedAtResolver<
    R = DateTime,
    Parent = Notification,
    Context = FZLContext
  > = Resolver<R, Parent, Context>;
  export type ReadAtResolver<
    R = Maybe<DateTime>,
    Parent = Notification,
    Context = FZLContext
  > = Resolver<R, Parent, Context>;
}

export namespace EstatePictureResolvers {
  export interface Resolvers<Context = FZLContext, TypeParent = EstatePicture> {
    id?: IdResolver<number, TypeParent, Context>;

    description?: DescriptionResolver<Maybe<string>, TypeParent, Context>;

    picture?: PictureResolver<Image, TypeParent, Context>;
  }

  export type IdResolver<
    R = number,
    Parent = EstatePicture,
    Context = FZLContext
  > = Resolver<R, Parent, Context>;
  export type DescriptionResolver<
    R = Maybe<string>,
    Parent = EstatePicture,
    Context = FZLContext
  > = Resolver<R, Parent, Context>;
  export type PictureResolver<
    R = Image,
    Parent = EstatePicture,
    Context = FZLContext
  > = Resolver<R, Parent, Context>;
}

export namespace VaultResolvers {
  export interface Resolvers<Context = FZLContext, TypeParent = Vault> {
    id?: IdResolver<number, TypeParent, Context>;
  }

  export type IdResolver<
    R = number,
    Parent = Vault,
    Context = FZLContext
  > = Resolver<R, Parent, Context>;
}

export namespace SaleBuyerResolvers {
  export interface Resolvers<Context = FZLContext, TypeParent = SaleBuyer> {
    id?: IdResolver<number, TypeParent, Context>;

    joinedAt?: JoinedAtResolver<DateTime, TypeParent, Context>;

    user?: UserResolver<User, TypeParent, Context>;

    loi?: LoiResolver<Maybe<File>, TypeParent, Context>;
  }

  export type IdResolver<
    R = number,
    Parent = SaleBuyer,
    Context = FZLContext
  > = Resolver<R, Parent, Context>;
  export type JoinedAtResolver<
    R = DateTime,
    Parent = SaleBuyer,
    Context = FZLContext
  > = Resolver<R, Parent, Context>;
  export type UserResolver<
    R = User,
    Parent = SaleBuyer,
    Context = FZLContext
  > = Resolver<R, Parent, Context>;
  export type LoiResolver<
    R = Maybe<File>,
    Parent = SaleBuyer,
    Context = FZLContext
  > = Resolver<R, Parent, Context>;
}

export namespace MutationResolvers {
  export interface Resolvers<Context = FZLContext, TypeParent = {}> {
    _empty?: _EmptyResolver<Maybe<string>, TypeParent, Context>;

    estateCreate?: EstateCreateResolver<Estate, TypeParent, Context>;

    saleCreate?: SaleCreateResolver<Maybe<Sale>, TypeParent, Context>;

    userRegister?: UserRegisterResolver<boolean, TypeParent, Context>;

    userUpdate?: UserUpdateResolver<User, TypeParent, Context>;

    vaultFolderCreate?: VaultFolderCreateResolver<
      VaultFolder,
      TypeParent,
      Context
    >;

    vaultFolderDelete?: VaultFolderDeleteResolver<
      VaultFolder,
      TypeParent,
      Context
    >;
  }

  export type _EmptyResolver<
    R = Maybe<string>,
    Parent = {},
    Context = FZLContext
  > = Resolver<R, Parent, Context>;
  export type EstateCreateResolver<
    R = Estate,
    Parent = {},
    Context = FZLContext
  > = Resolver<R, Parent, Context, EstateCreateArgs>;
  export interface EstateCreateArgs {
    input: EstateCreateInput;
  }

  export type SaleCreateResolver<
    R = Maybe<Sale>,
    Parent = {},
    Context = FZLContext
  > = Resolver<R, Parent, Context, SaleCreateArgs>;
  export interface SaleCreateArgs {
    input: SaleCreateInput;
  }

  export type UserRegisterResolver<
    R = boolean,
    Parent = {},
    Context = FZLContext
  > = Resolver<R, Parent, Context, UserRegisterArgs>;
  export interface UserRegisterArgs {
    input: UserRegisterInput;
  }

  export type UserUpdateResolver<
    R = User,
    Parent = {},
    Context = FZLContext
  > = Resolver<R, Parent, Context, UserUpdateArgs>;
  export interface UserUpdateArgs {
    input: UserUpdateInput;
  }

  export type VaultFolderCreateResolver<
    R = VaultFolder,
    Parent = {},
    Context = FZLContext
  > = Resolver<R, Parent, Context, VaultFolderCreateArgs>;
  export interface VaultFolderCreateArgs {
    input: VaultFolderCreateInput;
  }

  export type VaultFolderDeleteResolver<
    R = VaultFolder,
    Parent = {},
    Context = FZLContext
  > = Resolver<R, Parent, Context, VaultFolderDeleteArgs>;
  export interface VaultFolderDeleteArgs {
    input: VaultFolderDeleteInput;
  }
}

export namespace VaultFolderResolvers {
  export interface Resolvers<Context = FZLContext, TypeParent = VaultFolder> {
    id?: IdResolver<number, TypeParent, Context>;

    createdAt?: CreatedAtResolver<DateTime, TypeParent, Context>;

    canUploadFile?: CanUploadFileResolver<boolean, TypeParent, Context>;

    canDelete?: CanDeleteResolver<boolean, TypeParent, Context>;

    canChangePermissions?: CanChangePermissionsResolver<
      boolean,
      TypeParent,
      Context
    >;

    path?: PathResolver<string[], TypeParent, Context>;

    name?: NameResolver<string, TypeParent, Context>;

    vault?: VaultResolver<Vault, TypeParent, Context>;

    parent?: ParentResolver<Maybe<VaultFolder>, TypeParent, Context>;

    content?: ContentResolver<VaultContent[], TypeParent, Context>;
  }

  export type IdResolver<
    R = number,
    Parent = VaultFolder,
    Context = FZLContext
  > = Resolver<R, Parent, Context>;
  export type CreatedAtResolver<
    R = DateTime,
    Parent = VaultFolder,
    Context = FZLContext
  > = Resolver<R, Parent, Context>;
  export type CanUploadFileResolver<
    R = boolean,
    Parent = VaultFolder,
    Context = FZLContext
  > = Resolver<R, Parent, Context>;
  export type CanDeleteResolver<
    R = boolean,
    Parent = VaultFolder,
    Context = FZLContext
  > = Resolver<R, Parent, Context>;
  export type CanChangePermissionsResolver<
    R = boolean,
    Parent = VaultFolder,
    Context = FZLContext
  > = Resolver<R, Parent, Context>;
  export type PathResolver<
    R = string[],
    Parent = VaultFolder,
    Context = FZLContext
  > = Resolver<R, Parent, Context>;
  export type NameResolver<
    R = string,
    Parent = VaultFolder,
    Context = FZLContext
  > = Resolver<R, Parent, Context>;
  export type VaultResolver<
    R = Vault,
    Parent = VaultFolder,
    Context = FZLContext
  > = Resolver<R, Parent, Context>;
  export type ParentResolver<
    R = Maybe<VaultFolder>,
    Parent = VaultFolder,
    Context = FZLContext
  > = Resolver<R, Parent, Context>;
  export type ContentResolver<
    R = VaultContent[],
    Parent = VaultFolder,
    Context = FZLContext
  > = Resolver<R, Parent, Context>;
}

export namespace VaultFileResolvers {
  export interface Resolvers<Context = FZLContext, TypeParent = VaultFile> {
    id?: IdResolver<string, TypeParent, Context>;

    canUpdate?: CanUpdateResolver<boolean, TypeParent, Context>;

    canDelete?: CanDeleteResolver<boolean, TypeParent, Context>;

    canChangePermission?: CanChangePermissionResolver<
      boolean,
      TypeParent,
      Context
    >;

    path?: PathResolver<string[], TypeParent, Context>;

    name?: NameResolver<string, TypeParent, Context>;

    vault?: VaultResolver<Vault, TypeParent, Context>;

    parent?: ParentResolver<Maybe<VaultFolder>, TypeParent, Context>;

    createdAt?: CreatedAtResolver<DateTime, TypeParent, Context>;

    updatedAt?: UpdatedAtResolver<DateTime, TypeParent, Context>;

    versions?: VersionsResolver<VaultFile[], TypeParent, Context>;
  }

  export type IdResolver<
    R = string,
    Parent = VaultFile,
    Context = FZLContext
  > = Resolver<R, Parent, Context>;
  export type CanUpdateResolver<
    R = boolean,
    Parent = VaultFile,
    Context = FZLContext
  > = Resolver<R, Parent, Context>;
  export type CanDeleteResolver<
    R = boolean,
    Parent = VaultFile,
    Context = FZLContext
  > = Resolver<R, Parent, Context>;
  export type CanChangePermissionResolver<
    R = boolean,
    Parent = VaultFile,
    Context = FZLContext
  > = Resolver<R, Parent, Context>;
  export type PathResolver<
    R = string[],
    Parent = VaultFile,
    Context = FZLContext
  > = Resolver<R, Parent, Context>;
  export type NameResolver<
    R = string,
    Parent = VaultFile,
    Context = FZLContext
  > = Resolver<R, Parent, Context>;
  export type VaultResolver<
    R = Vault,
    Parent = VaultFile,
    Context = FZLContext
  > = Resolver<R, Parent, Context>;
  export type ParentResolver<
    R = Maybe<VaultFolder>,
    Parent = VaultFile,
    Context = FZLContext
  > = Resolver<R, Parent, Context>;
  export type CreatedAtResolver<
    R = DateTime,
    Parent = VaultFile,
    Context = FZLContext
  > = Resolver<R, Parent, Context>;
  export type UpdatedAtResolver<
    R = DateTime,
    Parent = VaultFile,
    Context = FZLContext
  > = Resolver<R, Parent, Context>;
  export type VersionsResolver<
    R = VaultFile[],
    Parent = VaultFile,
    Context = FZLContext
  > = Resolver<R, Parent, Context>;
}

export namespace SubscriptionResolvers {
  export interface Resolvers<Context = FZLContext, TypeParent = {}> {
    _empty?: _EmptyResolver<Maybe<string>, TypeParent, Context>;

    notificationCreated?: NotificationCreatedResolver<
      Notification,
      TypeParent,
      Context
    >;

    vaultFileCreated?: VaultFileCreatedResolver<VaultFile, TypeParent, Context>;

    vaultFileDeleted?: VaultFileDeletedResolver<VaultFile, TypeParent, Context>;

    vaultFileUpdate?: VaultFileUpdateResolver<VaultFile, TypeParent, Context>;

    vaultFolderCreated?: VaultFolderCreatedResolver<
      VaultFolder,
      TypeParent,
      Context
    >;

    vaultFolderDeleted?: VaultFolderDeletedResolver<
      VaultFolder,
      TypeParent,
      Context
    >;

    vaultFolderUpdate?: VaultFolderUpdateResolver<
      VaultFolder,
      TypeParent,
      Context
    >;
  }

  export type _EmptyResolver<
    R = Maybe<string>,
    Parent = {},
    Context = FZLContext
  > = SubscriptionResolver<R, Parent, Context>;
  export type NotificationCreatedResolver<
    R = Notification,
    Parent = {},
    Context = FZLContext
  > = SubscriptionResolver<R, Parent, Context>;
  export type VaultFileCreatedResolver<
    R = VaultFile,
    Parent = {},
    Context = FZLContext
  > = SubscriptionResolver<R, Parent, Context, VaultFileCreatedArgs>;
  export interface VaultFileCreatedArgs {
    vaultId: string;
  }

  export type VaultFileDeletedResolver<
    R = VaultFile,
    Parent = {},
    Context = FZLContext
  > = SubscriptionResolver<R, Parent, Context, VaultFileDeletedArgs>;
  export interface VaultFileDeletedArgs {
    vaultId: string;
  }

  export type VaultFileUpdateResolver<
    R = VaultFile,
    Parent = {},
    Context = FZLContext
  > = SubscriptionResolver<R, Parent, Context, VaultFileUpdateArgs>;
  export interface VaultFileUpdateArgs {
    vaultId: string;
  }

  export type VaultFolderCreatedResolver<
    R = VaultFolder,
    Parent = {},
    Context = FZLContext
  > = SubscriptionResolver<R, Parent, Context, VaultFolderCreatedArgs>;
  export interface VaultFolderCreatedArgs {
    vaultId: string;
  }

  export type VaultFolderDeletedResolver<
    R = VaultFolder,
    Parent = {},
    Context = FZLContext
  > = SubscriptionResolver<R, Parent, Context, VaultFolderDeletedArgs>;
  export interface VaultFolderDeletedArgs {
    vaultId: string;
  }

  export type VaultFolderUpdateResolver<
    R = VaultFolder,
    Parent = {},
    Context = FZLContext
  > = SubscriptionResolver<R, Parent, Context, VaultFolderUpdateArgs>;
  export interface VaultFolderUpdateArgs {
    vaultId: string;
  }
}

export namespace TransactionResolvers {
  export interface Resolvers {
    __resolveType: ResolveType;
  }
  export type ResolveType<
    R = "Sale" | "Rent" | "Evaluation",
    Parent = Sale | Rent | Evaluation,
    Context = FZLContext
  > = TypeResolveFn<R, Parent, Context>;
}

export namespace VaultContentResolvers {
  export interface Resolvers {
    __resolveType: ResolveType;
  }
  export type ResolveType<
    R = "VaultFile" | "VaultFolder",
    Parent = VaultFile | VaultFolder,
    Context = FZLContext
  > = TypeResolveFn<R, Parent, Context>;
}

export type CacheControlDirectiveResolver<Result> = DirectiveResolverFn<
  Result,
  CacheControlDirectiveArgs,
  FZLContext
>;
export interface CacheControlDirectiveArgs {
  maxAge: Maybe<number>;

  scope: Maybe<CacheControlScope>;
}

/** Directs the executor to skip this field or fragment when the `if` argument is true. */
export type SkipDirectiveResolver<Result> = DirectiveResolverFn<
  Result,
  SkipDirectiveArgs,
  FZLContext
>;
export interface SkipDirectiveArgs {
  /** Skipped when true. */
  if: boolean;
}

/** Directs the executor to include this field or fragment only when the `if` argument is true. */
export type IncludeDirectiveResolver<Result> = DirectiveResolverFn<
  Result,
  IncludeDirectiveArgs,
  FZLContext
>;
export interface IncludeDirectiveArgs {
  /** Included when true. */
  if: boolean;
}

/** Marks an element of a GraphQL schema as no longer supported. */
export type DeprecatedDirectiveResolver<Result> = DirectiveResolverFn<
  Result,
  DeprecatedDirectiveArgs,
  FZLContext
>;
export interface DeprecatedDirectiveArgs {
  /** Explains why this element was deprecated, usually also including a suggestion for how to access supported similar data. Formatted using the Markdown syntax (as specified by [CommonMark](https://commonmark.org/). */
  reason: string;
}

export interface DateTimeScalarConfig
  extends GraphQLScalarTypeConfig<DateTime, any> {
  name: "DateTime";
}
export interface DateScalarConfig extends GraphQLScalarTypeConfig<Date, any> {
  name: "Date";
}
export interface TimeScalarConfig extends GraphQLScalarTypeConfig<Time, any> {
  name: "Time";
}

export interface IResolvers<Context = FZLContext> {
  Query?: QueryResolvers.Resolvers<Context>;
  Sale?: SaleResolvers.Resolvers<Context>;
  Estate?: EstateResolvers.Resolvers<Context>;
  Address?: AddressResolvers.Resolvers<Context>;
  User?: UserResolvers.Resolvers<Context>;
  Image?: ImageResolvers.Resolvers<Context>;
  Rent?: RentResolvers.Resolvers<Context>;
  File?: FileResolvers.Resolvers<Context>;
  Evaluation?: EvaluationResolvers.Resolvers<Context>;
  Notification?: NotificationResolvers.Resolvers<Context>;
  EstatePicture?: EstatePictureResolvers.Resolvers<Context>;
  Vault?: VaultResolvers.Resolvers<Context>;
  SaleBuyer?: SaleBuyerResolvers.Resolvers<Context>;
  Mutation?: MutationResolvers.Resolvers<Context>;
  VaultFolder?: VaultFolderResolvers.Resolvers<Context>;
  VaultFile?: VaultFileResolvers.Resolvers<Context>;
  Subscription?: SubscriptionResolvers.Resolvers<Context>;
  Transaction?: TransactionResolvers.Resolvers;
  VaultContent?: VaultContentResolvers.Resolvers;
  DateTime?: GraphQLScalarType;
  Date?: GraphQLScalarType;
  Time?: GraphQLScalarType;
}

export interface IDirectiveResolvers<Result> {
  cacheControl?: CacheControlDirectiveResolver<Result>;
  skip?: SkipDirectiveResolver<Result>;
  include?: IncludeDirectiveResolver<Result>;
  deprecated?: DeprecatedDirectiveResolver<Result>;
}
