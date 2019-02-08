export type Maybe<T> = T | null;

export type Date = any;

export type DateTime = any;

export type Time = any;

// ====================================================
// Scalars
// ====================================================

// ====================================================
// Types
// ====================================================

export interface Query {
  _empty: Maybe<string>;

  viewer: Maybe<User>;
}

export interface User {
  id: number;
}

export interface Mutation {
  _empty: Maybe<string>;
}

export interface Subscription {
  _empty: Maybe<string>;
}

// ====================================================
// Arguments
// ====================================================

import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig
} from "graphql";

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

    viewer?: ViewerResolver<Maybe<User>, TypeParent, Context>;
  }

  export type _EmptyResolver<
    R = Maybe<string>,
    Parent = {},
    Context = FZLContext
  > = Resolver<R, Parent, Context>;
  export type ViewerResolver<
    R = Maybe<User>,
    Parent = {},
    Context = FZLContext
  > = Resolver<R, Parent, Context>;
}

export namespace UserResolvers {
  export interface Resolvers<Context = FZLContext, TypeParent = User> {
    id?: IdResolver<number, TypeParent, Context>;
  }

  export type IdResolver<
    R = number,
    Parent = User,
    Context = FZLContext
  > = Resolver<R, Parent, Context>;
}

export namespace MutationResolvers {
  export interface Resolvers<Context = FZLContext, TypeParent = {}> {
    _empty?: _EmptyResolver<Maybe<string>, TypeParent, Context>;
  }

  export type _EmptyResolver<
    R = Maybe<string>,
    Parent = {},
    Context = FZLContext
  > = Resolver<R, Parent, Context>;
}

export namespace SubscriptionResolvers {
  export interface Resolvers<Context = FZLContext, TypeParent = {}> {
    _empty?: _EmptyResolver<Maybe<string>, TypeParent, Context>;
  }

  export type _EmptyResolver<
    R = Maybe<string>,
    Parent = {},
    Context = FZLContext
  > = SubscriptionResolver<R, Parent, Context>;
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

export interface DateScalarConfig extends GraphQLScalarTypeConfig<Date, any> {
  name: "Date";
}
export interface DateTimeScalarConfig
  extends GraphQLScalarTypeConfig<DateTime, any> {
  name: "DateTime";
}
export interface TimeScalarConfig extends GraphQLScalarTypeConfig<Time, any> {
  name: "Time";
}

export interface IResolvers<Context = FZLContext> {
  Query?: QueryResolvers.Resolvers<Context>;
  User?: UserResolvers.Resolvers<Context>;
  Mutation?: MutationResolvers.Resolvers<Context>;
  Subscription?: SubscriptionResolvers.Resolvers<Context>;
  Date?: GraphQLScalarType;
  DateTime?: GraphQLScalarType;
  Time?: GraphQLScalarType;
}

export interface IDirectiveResolvers<Result> {
  skip?: SkipDirectiveResolver<Result>;
  include?: IncludeDirectiveResolver<Result>;
  deprecated?: DeprecatedDirectiveResolver<Result>;
}
