
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Utilisateur
 * 
 */
export type Utilisateur = $Result.DefaultSelection<Prisma.$UtilisateurPayload>
/**
 * Model Projet
 * 
 */
export type Projet = $Result.DefaultSelection<Prisma.$ProjetPayload>
/**
 * Model Categorie
 * 
 */
export type Categorie = $Result.DefaultSelection<Prisma.$CategoriePayload>
/**
 * Model Tache
 * 
 */
export type Tache = $Result.DefaultSelection<Prisma.$TachePayload>
/**
 * Model FicherJoint
 * 
 */
export type FicherJoint = $Result.DefaultSelection<Prisma.$FicherJointPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Status: {
  TODO: 'TODO',
  IN_PROGRESS: 'IN_PROGRESS',
  DONE: 'DONE'
};

export type Status = (typeof Status)[keyof typeof Status]


export const Priorite: {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH'
};

export type Priorite = (typeof Priorite)[keyof typeof Priorite]

}

export type Status = $Enums.Status

export const Status: typeof $Enums.Status

export type Priorite = $Enums.Priorite

export const Priorite: typeof $Enums.Priorite

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Utilisateurs
 * const utilisateurs = await prisma.utilisateur.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Utilisateurs
   * const utilisateurs = await prisma.utilisateur.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.utilisateur`: Exposes CRUD operations for the **Utilisateur** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Utilisateurs
    * const utilisateurs = await prisma.utilisateur.findMany()
    * ```
    */
  get utilisateur(): Prisma.UtilisateurDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.projet`: Exposes CRUD operations for the **Projet** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Projets
    * const projets = await prisma.projet.findMany()
    * ```
    */
  get projet(): Prisma.ProjetDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.categorie`: Exposes CRUD operations for the **Categorie** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Categories
    * const categories = await prisma.categorie.findMany()
    * ```
    */
  get categorie(): Prisma.CategorieDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.tache`: Exposes CRUD operations for the **Tache** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Taches
    * const taches = await prisma.tache.findMany()
    * ```
    */
  get tache(): Prisma.TacheDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.ficherJoint`: Exposes CRUD operations for the **FicherJoint** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more FicherJoints
    * const ficherJoints = await prisma.ficherJoint.findMany()
    * ```
    */
  get ficherJoint(): Prisma.FicherJointDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.9.0
   * Query Engine version: 81e4af48011447c3cc503a190e86995b66d2a28e
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Utilisateur: 'Utilisateur',
    Projet: 'Projet',
    Categorie: 'Categorie',
    Tache: 'Tache',
    FicherJoint: 'FicherJoint'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "utilisateur" | "projet" | "categorie" | "tache" | "ficherJoint"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Utilisateur: {
        payload: Prisma.$UtilisateurPayload<ExtArgs>
        fields: Prisma.UtilisateurFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UtilisateurFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UtilisateurPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UtilisateurFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UtilisateurPayload>
          }
          findFirst: {
            args: Prisma.UtilisateurFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UtilisateurPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UtilisateurFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UtilisateurPayload>
          }
          findMany: {
            args: Prisma.UtilisateurFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UtilisateurPayload>[]
          }
          create: {
            args: Prisma.UtilisateurCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UtilisateurPayload>
          }
          createMany: {
            args: Prisma.UtilisateurCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UtilisateurCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UtilisateurPayload>[]
          }
          delete: {
            args: Prisma.UtilisateurDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UtilisateurPayload>
          }
          update: {
            args: Prisma.UtilisateurUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UtilisateurPayload>
          }
          deleteMany: {
            args: Prisma.UtilisateurDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UtilisateurUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UtilisateurUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UtilisateurPayload>[]
          }
          upsert: {
            args: Prisma.UtilisateurUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UtilisateurPayload>
          }
          aggregate: {
            args: Prisma.UtilisateurAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUtilisateur>
          }
          groupBy: {
            args: Prisma.UtilisateurGroupByArgs<ExtArgs>
            result: $Utils.Optional<UtilisateurGroupByOutputType>[]
          }
          count: {
            args: Prisma.UtilisateurCountArgs<ExtArgs>
            result: $Utils.Optional<UtilisateurCountAggregateOutputType> | number
          }
        }
      }
      Projet: {
        payload: Prisma.$ProjetPayload<ExtArgs>
        fields: Prisma.ProjetFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProjetFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjetPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProjetFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjetPayload>
          }
          findFirst: {
            args: Prisma.ProjetFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjetPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProjetFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjetPayload>
          }
          findMany: {
            args: Prisma.ProjetFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjetPayload>[]
          }
          create: {
            args: Prisma.ProjetCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjetPayload>
          }
          createMany: {
            args: Prisma.ProjetCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProjetCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjetPayload>[]
          }
          delete: {
            args: Prisma.ProjetDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjetPayload>
          }
          update: {
            args: Prisma.ProjetUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjetPayload>
          }
          deleteMany: {
            args: Prisma.ProjetDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProjetUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProjetUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjetPayload>[]
          }
          upsert: {
            args: Prisma.ProjetUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjetPayload>
          }
          aggregate: {
            args: Prisma.ProjetAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProjet>
          }
          groupBy: {
            args: Prisma.ProjetGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProjetGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProjetCountArgs<ExtArgs>
            result: $Utils.Optional<ProjetCountAggregateOutputType> | number
          }
        }
      }
      Categorie: {
        payload: Prisma.$CategoriePayload<ExtArgs>
        fields: Prisma.CategorieFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CategorieFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CategorieFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriePayload>
          }
          findFirst: {
            args: Prisma.CategorieFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CategorieFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriePayload>
          }
          findMany: {
            args: Prisma.CategorieFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriePayload>[]
          }
          create: {
            args: Prisma.CategorieCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriePayload>
          }
          createMany: {
            args: Prisma.CategorieCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CategorieCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriePayload>[]
          }
          delete: {
            args: Prisma.CategorieDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriePayload>
          }
          update: {
            args: Prisma.CategorieUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriePayload>
          }
          deleteMany: {
            args: Prisma.CategorieDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CategorieUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CategorieUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriePayload>[]
          }
          upsert: {
            args: Prisma.CategorieUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriePayload>
          }
          aggregate: {
            args: Prisma.CategorieAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCategorie>
          }
          groupBy: {
            args: Prisma.CategorieGroupByArgs<ExtArgs>
            result: $Utils.Optional<CategorieGroupByOutputType>[]
          }
          count: {
            args: Prisma.CategorieCountArgs<ExtArgs>
            result: $Utils.Optional<CategorieCountAggregateOutputType> | number
          }
        }
      }
      Tache: {
        payload: Prisma.$TachePayload<ExtArgs>
        fields: Prisma.TacheFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TacheFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TachePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TacheFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TachePayload>
          }
          findFirst: {
            args: Prisma.TacheFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TachePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TacheFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TachePayload>
          }
          findMany: {
            args: Prisma.TacheFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TachePayload>[]
          }
          create: {
            args: Prisma.TacheCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TachePayload>
          }
          createMany: {
            args: Prisma.TacheCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TacheCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TachePayload>[]
          }
          delete: {
            args: Prisma.TacheDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TachePayload>
          }
          update: {
            args: Prisma.TacheUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TachePayload>
          }
          deleteMany: {
            args: Prisma.TacheDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TacheUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TacheUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TachePayload>[]
          }
          upsert: {
            args: Prisma.TacheUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TachePayload>
          }
          aggregate: {
            args: Prisma.TacheAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTache>
          }
          groupBy: {
            args: Prisma.TacheGroupByArgs<ExtArgs>
            result: $Utils.Optional<TacheGroupByOutputType>[]
          }
          count: {
            args: Prisma.TacheCountArgs<ExtArgs>
            result: $Utils.Optional<TacheCountAggregateOutputType> | number
          }
        }
      }
      FicherJoint: {
        payload: Prisma.$FicherJointPayload<ExtArgs>
        fields: Prisma.FicherJointFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FicherJointFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FicherJointPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FicherJointFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FicherJointPayload>
          }
          findFirst: {
            args: Prisma.FicherJointFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FicherJointPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FicherJointFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FicherJointPayload>
          }
          findMany: {
            args: Prisma.FicherJointFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FicherJointPayload>[]
          }
          create: {
            args: Prisma.FicherJointCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FicherJointPayload>
          }
          createMany: {
            args: Prisma.FicherJointCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FicherJointCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FicherJointPayload>[]
          }
          delete: {
            args: Prisma.FicherJointDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FicherJointPayload>
          }
          update: {
            args: Prisma.FicherJointUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FicherJointPayload>
          }
          deleteMany: {
            args: Prisma.FicherJointDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FicherJointUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FicherJointUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FicherJointPayload>[]
          }
          upsert: {
            args: Prisma.FicherJointUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FicherJointPayload>
          }
          aggregate: {
            args: Prisma.FicherJointAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFicherJoint>
          }
          groupBy: {
            args: Prisma.FicherJointGroupByArgs<ExtArgs>
            result: $Utils.Optional<FicherJointGroupByOutputType>[]
          }
          count: {
            args: Prisma.FicherJointCountArgs<ExtArgs>
            result: $Utils.Optional<FicherJointCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    utilisateur?: UtilisateurOmit
    projet?: ProjetOmit
    categorie?: CategorieOmit
    tache?: TacheOmit
    ficherJoint?: FicherJointOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UtilisateurCountOutputType
   */

  export type UtilisateurCountOutputType = {
    projet: number
    taches: number
  }

  export type UtilisateurCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    projet?: boolean | UtilisateurCountOutputTypeCountProjetArgs
    taches?: boolean | UtilisateurCountOutputTypeCountTachesArgs
  }

  // Custom InputTypes
  /**
   * UtilisateurCountOutputType without action
   */
  export type UtilisateurCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UtilisateurCountOutputType
     */
    select?: UtilisateurCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UtilisateurCountOutputType without action
   */
  export type UtilisateurCountOutputTypeCountProjetArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjetWhereInput
  }

  /**
   * UtilisateurCountOutputType without action
   */
  export type UtilisateurCountOutputTypeCountTachesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TacheWhereInput
  }


  /**
   * Count Type ProjetCountOutputType
   */

  export type ProjetCountOutputType = {
    categories: number
    taches: number
  }

  export type ProjetCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    categories?: boolean | ProjetCountOutputTypeCountCategoriesArgs
    taches?: boolean | ProjetCountOutputTypeCountTachesArgs
  }

  // Custom InputTypes
  /**
   * ProjetCountOutputType without action
   */
  export type ProjetCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjetCountOutputType
     */
    select?: ProjetCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProjetCountOutputType without action
   */
  export type ProjetCountOutputTypeCountCategoriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CategorieWhereInput
  }

  /**
   * ProjetCountOutputType without action
   */
  export type ProjetCountOutputTypeCountTachesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TacheWhereInput
  }


  /**
   * Count Type CategorieCountOutputType
   */

  export type CategorieCountOutputType = {
    taches: number
  }

  export type CategorieCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    taches?: boolean | CategorieCountOutputTypeCountTachesArgs
  }

  // Custom InputTypes
  /**
   * CategorieCountOutputType without action
   */
  export type CategorieCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategorieCountOutputType
     */
    select?: CategorieCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CategorieCountOutputType without action
   */
  export type CategorieCountOutputTypeCountTachesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TacheWhereInput
  }


  /**
   * Count Type TacheCountOutputType
   */

  export type TacheCountOutputType = {
    fichiers_joints: number
  }

  export type TacheCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    fichiers_joints?: boolean | TacheCountOutputTypeCountFichiers_jointsArgs
  }

  // Custom InputTypes
  /**
   * TacheCountOutputType without action
   */
  export type TacheCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TacheCountOutputType
     */
    select?: TacheCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TacheCountOutputType without action
   */
  export type TacheCountOutputTypeCountFichiers_jointsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FicherJointWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Utilisateur
   */

  export type AggregateUtilisateur = {
    _count: UtilisateurCountAggregateOutputType | null
    _avg: UtilisateurAvgAggregateOutputType | null
    _sum: UtilisateurSumAggregateOutputType | null
    _min: UtilisateurMinAggregateOutputType | null
    _max: UtilisateurMaxAggregateOutputType | null
  }

  export type UtilisateurAvgAggregateOutputType = {
    id_utilisateur: number | null
  }

  export type UtilisateurSumAggregateOutputType = {
    id_utilisateur: number | null
  }

  export type UtilisateurMinAggregateOutputType = {
    id_utilisateur: number | null
    email: string | null
    password: string | null
  }

  export type UtilisateurMaxAggregateOutputType = {
    id_utilisateur: number | null
    email: string | null
    password: string | null
  }

  export type UtilisateurCountAggregateOutputType = {
    id_utilisateur: number
    email: number
    password: number
    _all: number
  }


  export type UtilisateurAvgAggregateInputType = {
    id_utilisateur?: true
  }

  export type UtilisateurSumAggregateInputType = {
    id_utilisateur?: true
  }

  export type UtilisateurMinAggregateInputType = {
    id_utilisateur?: true
    email?: true
    password?: true
  }

  export type UtilisateurMaxAggregateInputType = {
    id_utilisateur?: true
    email?: true
    password?: true
  }

  export type UtilisateurCountAggregateInputType = {
    id_utilisateur?: true
    email?: true
    password?: true
    _all?: true
  }

  export type UtilisateurAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Utilisateur to aggregate.
     */
    where?: UtilisateurWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Utilisateurs to fetch.
     */
    orderBy?: UtilisateurOrderByWithRelationInput | UtilisateurOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UtilisateurWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Utilisateurs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Utilisateurs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Utilisateurs
    **/
    _count?: true | UtilisateurCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UtilisateurAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UtilisateurSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UtilisateurMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UtilisateurMaxAggregateInputType
  }

  export type GetUtilisateurAggregateType<T extends UtilisateurAggregateArgs> = {
        [P in keyof T & keyof AggregateUtilisateur]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUtilisateur[P]>
      : GetScalarType<T[P], AggregateUtilisateur[P]>
  }




  export type UtilisateurGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UtilisateurWhereInput
    orderBy?: UtilisateurOrderByWithAggregationInput | UtilisateurOrderByWithAggregationInput[]
    by: UtilisateurScalarFieldEnum[] | UtilisateurScalarFieldEnum
    having?: UtilisateurScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UtilisateurCountAggregateInputType | true
    _avg?: UtilisateurAvgAggregateInputType
    _sum?: UtilisateurSumAggregateInputType
    _min?: UtilisateurMinAggregateInputType
    _max?: UtilisateurMaxAggregateInputType
  }

  export type UtilisateurGroupByOutputType = {
    id_utilisateur: number
    email: string
    password: string
    _count: UtilisateurCountAggregateOutputType | null
    _avg: UtilisateurAvgAggregateOutputType | null
    _sum: UtilisateurSumAggregateOutputType | null
    _min: UtilisateurMinAggregateOutputType | null
    _max: UtilisateurMaxAggregateOutputType | null
  }

  type GetUtilisateurGroupByPayload<T extends UtilisateurGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UtilisateurGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UtilisateurGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UtilisateurGroupByOutputType[P]>
            : GetScalarType<T[P], UtilisateurGroupByOutputType[P]>
        }
      >
    >


  export type UtilisateurSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_utilisateur?: boolean
    email?: boolean
    password?: boolean
    projet?: boolean | Utilisateur$projetArgs<ExtArgs>
    taches?: boolean | Utilisateur$tachesArgs<ExtArgs>
    _count?: boolean | UtilisateurCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["utilisateur"]>

  export type UtilisateurSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_utilisateur?: boolean
    email?: boolean
    password?: boolean
  }, ExtArgs["result"]["utilisateur"]>

  export type UtilisateurSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_utilisateur?: boolean
    email?: boolean
    password?: boolean
  }, ExtArgs["result"]["utilisateur"]>

  export type UtilisateurSelectScalar = {
    id_utilisateur?: boolean
    email?: boolean
    password?: boolean
  }

  export type UtilisateurOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id_utilisateur" | "email" | "password", ExtArgs["result"]["utilisateur"]>
  export type UtilisateurInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    projet?: boolean | Utilisateur$projetArgs<ExtArgs>
    taches?: boolean | Utilisateur$tachesArgs<ExtArgs>
    _count?: boolean | UtilisateurCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UtilisateurIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UtilisateurIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UtilisateurPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Utilisateur"
    objects: {
      projet: Prisma.$ProjetPayload<ExtArgs>[]
      taches: Prisma.$TachePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id_utilisateur: number
      email: string
      password: string
    }, ExtArgs["result"]["utilisateur"]>
    composites: {}
  }

  type UtilisateurGetPayload<S extends boolean | null | undefined | UtilisateurDefaultArgs> = $Result.GetResult<Prisma.$UtilisateurPayload, S>

  type UtilisateurCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UtilisateurFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UtilisateurCountAggregateInputType | true
    }

  export interface UtilisateurDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Utilisateur'], meta: { name: 'Utilisateur' } }
    /**
     * Find zero or one Utilisateur that matches the filter.
     * @param {UtilisateurFindUniqueArgs} args - Arguments to find a Utilisateur
     * @example
     * // Get one Utilisateur
     * const utilisateur = await prisma.utilisateur.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UtilisateurFindUniqueArgs>(args: SelectSubset<T, UtilisateurFindUniqueArgs<ExtArgs>>): Prisma__UtilisateurClient<$Result.GetResult<Prisma.$UtilisateurPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Utilisateur that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UtilisateurFindUniqueOrThrowArgs} args - Arguments to find a Utilisateur
     * @example
     * // Get one Utilisateur
     * const utilisateur = await prisma.utilisateur.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UtilisateurFindUniqueOrThrowArgs>(args: SelectSubset<T, UtilisateurFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UtilisateurClient<$Result.GetResult<Prisma.$UtilisateurPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Utilisateur that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UtilisateurFindFirstArgs} args - Arguments to find a Utilisateur
     * @example
     * // Get one Utilisateur
     * const utilisateur = await prisma.utilisateur.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UtilisateurFindFirstArgs>(args?: SelectSubset<T, UtilisateurFindFirstArgs<ExtArgs>>): Prisma__UtilisateurClient<$Result.GetResult<Prisma.$UtilisateurPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Utilisateur that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UtilisateurFindFirstOrThrowArgs} args - Arguments to find a Utilisateur
     * @example
     * // Get one Utilisateur
     * const utilisateur = await prisma.utilisateur.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UtilisateurFindFirstOrThrowArgs>(args?: SelectSubset<T, UtilisateurFindFirstOrThrowArgs<ExtArgs>>): Prisma__UtilisateurClient<$Result.GetResult<Prisma.$UtilisateurPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Utilisateurs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UtilisateurFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Utilisateurs
     * const utilisateurs = await prisma.utilisateur.findMany()
     * 
     * // Get first 10 Utilisateurs
     * const utilisateurs = await prisma.utilisateur.findMany({ take: 10 })
     * 
     * // Only select the `id_utilisateur`
     * const utilisateurWithId_utilisateurOnly = await prisma.utilisateur.findMany({ select: { id_utilisateur: true } })
     * 
     */
    findMany<T extends UtilisateurFindManyArgs>(args?: SelectSubset<T, UtilisateurFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UtilisateurPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Utilisateur.
     * @param {UtilisateurCreateArgs} args - Arguments to create a Utilisateur.
     * @example
     * // Create one Utilisateur
     * const Utilisateur = await prisma.utilisateur.create({
     *   data: {
     *     // ... data to create a Utilisateur
     *   }
     * })
     * 
     */
    create<T extends UtilisateurCreateArgs>(args: SelectSubset<T, UtilisateurCreateArgs<ExtArgs>>): Prisma__UtilisateurClient<$Result.GetResult<Prisma.$UtilisateurPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Utilisateurs.
     * @param {UtilisateurCreateManyArgs} args - Arguments to create many Utilisateurs.
     * @example
     * // Create many Utilisateurs
     * const utilisateur = await prisma.utilisateur.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UtilisateurCreateManyArgs>(args?: SelectSubset<T, UtilisateurCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Utilisateurs and returns the data saved in the database.
     * @param {UtilisateurCreateManyAndReturnArgs} args - Arguments to create many Utilisateurs.
     * @example
     * // Create many Utilisateurs
     * const utilisateur = await prisma.utilisateur.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Utilisateurs and only return the `id_utilisateur`
     * const utilisateurWithId_utilisateurOnly = await prisma.utilisateur.createManyAndReturn({
     *   select: { id_utilisateur: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UtilisateurCreateManyAndReturnArgs>(args?: SelectSubset<T, UtilisateurCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UtilisateurPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Utilisateur.
     * @param {UtilisateurDeleteArgs} args - Arguments to delete one Utilisateur.
     * @example
     * // Delete one Utilisateur
     * const Utilisateur = await prisma.utilisateur.delete({
     *   where: {
     *     // ... filter to delete one Utilisateur
     *   }
     * })
     * 
     */
    delete<T extends UtilisateurDeleteArgs>(args: SelectSubset<T, UtilisateurDeleteArgs<ExtArgs>>): Prisma__UtilisateurClient<$Result.GetResult<Prisma.$UtilisateurPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Utilisateur.
     * @param {UtilisateurUpdateArgs} args - Arguments to update one Utilisateur.
     * @example
     * // Update one Utilisateur
     * const utilisateur = await prisma.utilisateur.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UtilisateurUpdateArgs>(args: SelectSubset<T, UtilisateurUpdateArgs<ExtArgs>>): Prisma__UtilisateurClient<$Result.GetResult<Prisma.$UtilisateurPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Utilisateurs.
     * @param {UtilisateurDeleteManyArgs} args - Arguments to filter Utilisateurs to delete.
     * @example
     * // Delete a few Utilisateurs
     * const { count } = await prisma.utilisateur.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UtilisateurDeleteManyArgs>(args?: SelectSubset<T, UtilisateurDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Utilisateurs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UtilisateurUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Utilisateurs
     * const utilisateur = await prisma.utilisateur.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UtilisateurUpdateManyArgs>(args: SelectSubset<T, UtilisateurUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Utilisateurs and returns the data updated in the database.
     * @param {UtilisateurUpdateManyAndReturnArgs} args - Arguments to update many Utilisateurs.
     * @example
     * // Update many Utilisateurs
     * const utilisateur = await prisma.utilisateur.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Utilisateurs and only return the `id_utilisateur`
     * const utilisateurWithId_utilisateurOnly = await prisma.utilisateur.updateManyAndReturn({
     *   select: { id_utilisateur: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UtilisateurUpdateManyAndReturnArgs>(args: SelectSubset<T, UtilisateurUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UtilisateurPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Utilisateur.
     * @param {UtilisateurUpsertArgs} args - Arguments to update or create a Utilisateur.
     * @example
     * // Update or create a Utilisateur
     * const utilisateur = await prisma.utilisateur.upsert({
     *   create: {
     *     // ... data to create a Utilisateur
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Utilisateur we want to update
     *   }
     * })
     */
    upsert<T extends UtilisateurUpsertArgs>(args: SelectSubset<T, UtilisateurUpsertArgs<ExtArgs>>): Prisma__UtilisateurClient<$Result.GetResult<Prisma.$UtilisateurPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Utilisateurs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UtilisateurCountArgs} args - Arguments to filter Utilisateurs to count.
     * @example
     * // Count the number of Utilisateurs
     * const count = await prisma.utilisateur.count({
     *   where: {
     *     // ... the filter for the Utilisateurs we want to count
     *   }
     * })
    **/
    count<T extends UtilisateurCountArgs>(
      args?: Subset<T, UtilisateurCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UtilisateurCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Utilisateur.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UtilisateurAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UtilisateurAggregateArgs>(args: Subset<T, UtilisateurAggregateArgs>): Prisma.PrismaPromise<GetUtilisateurAggregateType<T>>

    /**
     * Group by Utilisateur.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UtilisateurGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UtilisateurGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UtilisateurGroupByArgs['orderBy'] }
        : { orderBy?: UtilisateurGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UtilisateurGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUtilisateurGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Utilisateur model
   */
  readonly fields: UtilisateurFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Utilisateur.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UtilisateurClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    projet<T extends Utilisateur$projetArgs<ExtArgs> = {}>(args?: Subset<T, Utilisateur$projetArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjetPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    taches<T extends Utilisateur$tachesArgs<ExtArgs> = {}>(args?: Subset<T, Utilisateur$tachesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TachePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Utilisateur model
   */
  interface UtilisateurFieldRefs {
    readonly id_utilisateur: FieldRef<"Utilisateur", 'Int'>
    readonly email: FieldRef<"Utilisateur", 'String'>
    readonly password: FieldRef<"Utilisateur", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Utilisateur findUnique
   */
  export type UtilisateurFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Utilisateur
     */
    select?: UtilisateurSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Utilisateur
     */
    omit?: UtilisateurOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UtilisateurInclude<ExtArgs> | null
    /**
     * Filter, which Utilisateur to fetch.
     */
    where: UtilisateurWhereUniqueInput
  }

  /**
   * Utilisateur findUniqueOrThrow
   */
  export type UtilisateurFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Utilisateur
     */
    select?: UtilisateurSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Utilisateur
     */
    omit?: UtilisateurOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UtilisateurInclude<ExtArgs> | null
    /**
     * Filter, which Utilisateur to fetch.
     */
    where: UtilisateurWhereUniqueInput
  }

  /**
   * Utilisateur findFirst
   */
  export type UtilisateurFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Utilisateur
     */
    select?: UtilisateurSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Utilisateur
     */
    omit?: UtilisateurOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UtilisateurInclude<ExtArgs> | null
    /**
     * Filter, which Utilisateur to fetch.
     */
    where?: UtilisateurWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Utilisateurs to fetch.
     */
    orderBy?: UtilisateurOrderByWithRelationInput | UtilisateurOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Utilisateurs.
     */
    cursor?: UtilisateurWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Utilisateurs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Utilisateurs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Utilisateurs.
     */
    distinct?: UtilisateurScalarFieldEnum | UtilisateurScalarFieldEnum[]
  }

  /**
   * Utilisateur findFirstOrThrow
   */
  export type UtilisateurFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Utilisateur
     */
    select?: UtilisateurSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Utilisateur
     */
    omit?: UtilisateurOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UtilisateurInclude<ExtArgs> | null
    /**
     * Filter, which Utilisateur to fetch.
     */
    where?: UtilisateurWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Utilisateurs to fetch.
     */
    orderBy?: UtilisateurOrderByWithRelationInput | UtilisateurOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Utilisateurs.
     */
    cursor?: UtilisateurWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Utilisateurs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Utilisateurs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Utilisateurs.
     */
    distinct?: UtilisateurScalarFieldEnum | UtilisateurScalarFieldEnum[]
  }

  /**
   * Utilisateur findMany
   */
  export type UtilisateurFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Utilisateur
     */
    select?: UtilisateurSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Utilisateur
     */
    omit?: UtilisateurOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UtilisateurInclude<ExtArgs> | null
    /**
     * Filter, which Utilisateurs to fetch.
     */
    where?: UtilisateurWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Utilisateurs to fetch.
     */
    orderBy?: UtilisateurOrderByWithRelationInput | UtilisateurOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Utilisateurs.
     */
    cursor?: UtilisateurWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Utilisateurs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Utilisateurs.
     */
    skip?: number
    distinct?: UtilisateurScalarFieldEnum | UtilisateurScalarFieldEnum[]
  }

  /**
   * Utilisateur create
   */
  export type UtilisateurCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Utilisateur
     */
    select?: UtilisateurSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Utilisateur
     */
    omit?: UtilisateurOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UtilisateurInclude<ExtArgs> | null
    /**
     * The data needed to create a Utilisateur.
     */
    data: XOR<UtilisateurCreateInput, UtilisateurUncheckedCreateInput>
  }

  /**
   * Utilisateur createMany
   */
  export type UtilisateurCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Utilisateurs.
     */
    data: UtilisateurCreateManyInput | UtilisateurCreateManyInput[]
  }

  /**
   * Utilisateur createManyAndReturn
   */
  export type UtilisateurCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Utilisateur
     */
    select?: UtilisateurSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Utilisateur
     */
    omit?: UtilisateurOmit<ExtArgs> | null
    /**
     * The data used to create many Utilisateurs.
     */
    data: UtilisateurCreateManyInput | UtilisateurCreateManyInput[]
  }

  /**
   * Utilisateur update
   */
  export type UtilisateurUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Utilisateur
     */
    select?: UtilisateurSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Utilisateur
     */
    omit?: UtilisateurOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UtilisateurInclude<ExtArgs> | null
    /**
     * The data needed to update a Utilisateur.
     */
    data: XOR<UtilisateurUpdateInput, UtilisateurUncheckedUpdateInput>
    /**
     * Choose, which Utilisateur to update.
     */
    where: UtilisateurWhereUniqueInput
  }

  /**
   * Utilisateur updateMany
   */
  export type UtilisateurUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Utilisateurs.
     */
    data: XOR<UtilisateurUpdateManyMutationInput, UtilisateurUncheckedUpdateManyInput>
    /**
     * Filter which Utilisateurs to update
     */
    where?: UtilisateurWhereInput
    /**
     * Limit how many Utilisateurs to update.
     */
    limit?: number
  }

  /**
   * Utilisateur updateManyAndReturn
   */
  export type UtilisateurUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Utilisateur
     */
    select?: UtilisateurSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Utilisateur
     */
    omit?: UtilisateurOmit<ExtArgs> | null
    /**
     * The data used to update Utilisateurs.
     */
    data: XOR<UtilisateurUpdateManyMutationInput, UtilisateurUncheckedUpdateManyInput>
    /**
     * Filter which Utilisateurs to update
     */
    where?: UtilisateurWhereInput
    /**
     * Limit how many Utilisateurs to update.
     */
    limit?: number
  }

  /**
   * Utilisateur upsert
   */
  export type UtilisateurUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Utilisateur
     */
    select?: UtilisateurSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Utilisateur
     */
    omit?: UtilisateurOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UtilisateurInclude<ExtArgs> | null
    /**
     * The filter to search for the Utilisateur to update in case it exists.
     */
    where: UtilisateurWhereUniqueInput
    /**
     * In case the Utilisateur found by the `where` argument doesn't exist, create a new Utilisateur with this data.
     */
    create: XOR<UtilisateurCreateInput, UtilisateurUncheckedCreateInput>
    /**
     * In case the Utilisateur was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UtilisateurUpdateInput, UtilisateurUncheckedUpdateInput>
  }

  /**
   * Utilisateur delete
   */
  export type UtilisateurDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Utilisateur
     */
    select?: UtilisateurSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Utilisateur
     */
    omit?: UtilisateurOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UtilisateurInclude<ExtArgs> | null
    /**
     * Filter which Utilisateur to delete.
     */
    where: UtilisateurWhereUniqueInput
  }

  /**
   * Utilisateur deleteMany
   */
  export type UtilisateurDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Utilisateurs to delete
     */
    where?: UtilisateurWhereInput
    /**
     * Limit how many Utilisateurs to delete.
     */
    limit?: number
  }

  /**
   * Utilisateur.projet
   */
  export type Utilisateur$projetArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Projet
     */
    select?: ProjetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Projet
     */
    omit?: ProjetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjetInclude<ExtArgs> | null
    where?: ProjetWhereInput
    orderBy?: ProjetOrderByWithRelationInput | ProjetOrderByWithRelationInput[]
    cursor?: ProjetWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProjetScalarFieldEnum | ProjetScalarFieldEnum[]
  }

  /**
   * Utilisateur.taches
   */
  export type Utilisateur$tachesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tache
     */
    select?: TacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tache
     */
    omit?: TacheOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TacheInclude<ExtArgs> | null
    where?: TacheWhereInput
    orderBy?: TacheOrderByWithRelationInput | TacheOrderByWithRelationInput[]
    cursor?: TacheWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TacheScalarFieldEnum | TacheScalarFieldEnum[]
  }

  /**
   * Utilisateur without action
   */
  export type UtilisateurDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Utilisateur
     */
    select?: UtilisateurSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Utilisateur
     */
    omit?: UtilisateurOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UtilisateurInclude<ExtArgs> | null
  }


  /**
   * Model Projet
   */

  export type AggregateProjet = {
    _count: ProjetCountAggregateOutputType | null
    _avg: ProjetAvgAggregateOutputType | null
    _sum: ProjetSumAggregateOutputType | null
    _min: ProjetMinAggregateOutputType | null
    _max: ProjetMaxAggregateOutputType | null
  }

  export type ProjetAvgAggregateOutputType = {
    id_projet: number | null
    id_utilisateur: number | null
  }

  export type ProjetSumAggregateOutputType = {
    id_projet: number | null
    id_utilisateur: number | null
  }

  export type ProjetMinAggregateOutputType = {
    id_projet: number | null
    nom: string | null
    id_utilisateur: number | null
  }

  export type ProjetMaxAggregateOutputType = {
    id_projet: number | null
    nom: string | null
    id_utilisateur: number | null
  }

  export type ProjetCountAggregateOutputType = {
    id_projet: number
    nom: number
    id_utilisateur: number
    _all: number
  }


  export type ProjetAvgAggregateInputType = {
    id_projet?: true
    id_utilisateur?: true
  }

  export type ProjetSumAggregateInputType = {
    id_projet?: true
    id_utilisateur?: true
  }

  export type ProjetMinAggregateInputType = {
    id_projet?: true
    nom?: true
    id_utilisateur?: true
  }

  export type ProjetMaxAggregateInputType = {
    id_projet?: true
    nom?: true
    id_utilisateur?: true
  }

  export type ProjetCountAggregateInputType = {
    id_projet?: true
    nom?: true
    id_utilisateur?: true
    _all?: true
  }

  export type ProjetAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Projet to aggregate.
     */
    where?: ProjetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projets to fetch.
     */
    orderBy?: ProjetOrderByWithRelationInput | ProjetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProjetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Projets
    **/
    _count?: true | ProjetCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProjetAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProjetSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProjetMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProjetMaxAggregateInputType
  }

  export type GetProjetAggregateType<T extends ProjetAggregateArgs> = {
        [P in keyof T & keyof AggregateProjet]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProjet[P]>
      : GetScalarType<T[P], AggregateProjet[P]>
  }




  export type ProjetGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjetWhereInput
    orderBy?: ProjetOrderByWithAggregationInput | ProjetOrderByWithAggregationInput[]
    by: ProjetScalarFieldEnum[] | ProjetScalarFieldEnum
    having?: ProjetScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProjetCountAggregateInputType | true
    _avg?: ProjetAvgAggregateInputType
    _sum?: ProjetSumAggregateInputType
    _min?: ProjetMinAggregateInputType
    _max?: ProjetMaxAggregateInputType
  }

  export type ProjetGroupByOutputType = {
    id_projet: number
    nom: string
    id_utilisateur: number
    _count: ProjetCountAggregateOutputType | null
    _avg: ProjetAvgAggregateOutputType | null
    _sum: ProjetSumAggregateOutputType | null
    _min: ProjetMinAggregateOutputType | null
    _max: ProjetMaxAggregateOutputType | null
  }

  type GetProjetGroupByPayload<T extends ProjetGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProjetGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProjetGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProjetGroupByOutputType[P]>
            : GetScalarType<T[P], ProjetGroupByOutputType[P]>
        }
      >
    >


  export type ProjetSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_projet?: boolean
    nom?: boolean
    id_utilisateur?: boolean
    utilisateur?: boolean | UtilisateurDefaultArgs<ExtArgs>
    categories?: boolean | Projet$categoriesArgs<ExtArgs>
    taches?: boolean | Projet$tachesArgs<ExtArgs>
    _count?: boolean | ProjetCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["projet"]>

  export type ProjetSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_projet?: boolean
    nom?: boolean
    id_utilisateur?: boolean
    utilisateur?: boolean | UtilisateurDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["projet"]>

  export type ProjetSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_projet?: boolean
    nom?: boolean
    id_utilisateur?: boolean
    utilisateur?: boolean | UtilisateurDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["projet"]>

  export type ProjetSelectScalar = {
    id_projet?: boolean
    nom?: boolean
    id_utilisateur?: boolean
  }

  export type ProjetOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id_projet" | "nom" | "id_utilisateur", ExtArgs["result"]["projet"]>
  export type ProjetInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    utilisateur?: boolean | UtilisateurDefaultArgs<ExtArgs>
    categories?: boolean | Projet$categoriesArgs<ExtArgs>
    taches?: boolean | Projet$tachesArgs<ExtArgs>
    _count?: boolean | ProjetCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProjetIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    utilisateur?: boolean | UtilisateurDefaultArgs<ExtArgs>
  }
  export type ProjetIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    utilisateur?: boolean | UtilisateurDefaultArgs<ExtArgs>
  }

  export type $ProjetPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Projet"
    objects: {
      utilisateur: Prisma.$UtilisateurPayload<ExtArgs>
      categories: Prisma.$CategoriePayload<ExtArgs>[]
      taches: Prisma.$TachePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id_projet: number
      nom: string
      id_utilisateur: number
    }, ExtArgs["result"]["projet"]>
    composites: {}
  }

  type ProjetGetPayload<S extends boolean | null | undefined | ProjetDefaultArgs> = $Result.GetResult<Prisma.$ProjetPayload, S>

  type ProjetCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProjetFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProjetCountAggregateInputType | true
    }

  export interface ProjetDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Projet'], meta: { name: 'Projet' } }
    /**
     * Find zero or one Projet that matches the filter.
     * @param {ProjetFindUniqueArgs} args - Arguments to find a Projet
     * @example
     * // Get one Projet
     * const projet = await prisma.projet.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProjetFindUniqueArgs>(args: SelectSubset<T, ProjetFindUniqueArgs<ExtArgs>>): Prisma__ProjetClient<$Result.GetResult<Prisma.$ProjetPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Projet that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProjetFindUniqueOrThrowArgs} args - Arguments to find a Projet
     * @example
     * // Get one Projet
     * const projet = await prisma.projet.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProjetFindUniqueOrThrowArgs>(args: SelectSubset<T, ProjetFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProjetClient<$Result.GetResult<Prisma.$ProjetPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Projet that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjetFindFirstArgs} args - Arguments to find a Projet
     * @example
     * // Get one Projet
     * const projet = await prisma.projet.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProjetFindFirstArgs>(args?: SelectSubset<T, ProjetFindFirstArgs<ExtArgs>>): Prisma__ProjetClient<$Result.GetResult<Prisma.$ProjetPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Projet that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjetFindFirstOrThrowArgs} args - Arguments to find a Projet
     * @example
     * // Get one Projet
     * const projet = await prisma.projet.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProjetFindFirstOrThrowArgs>(args?: SelectSubset<T, ProjetFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProjetClient<$Result.GetResult<Prisma.$ProjetPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Projets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjetFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Projets
     * const projets = await prisma.projet.findMany()
     * 
     * // Get first 10 Projets
     * const projets = await prisma.projet.findMany({ take: 10 })
     * 
     * // Only select the `id_projet`
     * const projetWithId_projetOnly = await prisma.projet.findMany({ select: { id_projet: true } })
     * 
     */
    findMany<T extends ProjetFindManyArgs>(args?: SelectSubset<T, ProjetFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjetPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Projet.
     * @param {ProjetCreateArgs} args - Arguments to create a Projet.
     * @example
     * // Create one Projet
     * const Projet = await prisma.projet.create({
     *   data: {
     *     // ... data to create a Projet
     *   }
     * })
     * 
     */
    create<T extends ProjetCreateArgs>(args: SelectSubset<T, ProjetCreateArgs<ExtArgs>>): Prisma__ProjetClient<$Result.GetResult<Prisma.$ProjetPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Projets.
     * @param {ProjetCreateManyArgs} args - Arguments to create many Projets.
     * @example
     * // Create many Projets
     * const projet = await prisma.projet.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProjetCreateManyArgs>(args?: SelectSubset<T, ProjetCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Projets and returns the data saved in the database.
     * @param {ProjetCreateManyAndReturnArgs} args - Arguments to create many Projets.
     * @example
     * // Create many Projets
     * const projet = await prisma.projet.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Projets and only return the `id_projet`
     * const projetWithId_projetOnly = await prisma.projet.createManyAndReturn({
     *   select: { id_projet: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProjetCreateManyAndReturnArgs>(args?: SelectSubset<T, ProjetCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjetPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Projet.
     * @param {ProjetDeleteArgs} args - Arguments to delete one Projet.
     * @example
     * // Delete one Projet
     * const Projet = await prisma.projet.delete({
     *   where: {
     *     // ... filter to delete one Projet
     *   }
     * })
     * 
     */
    delete<T extends ProjetDeleteArgs>(args: SelectSubset<T, ProjetDeleteArgs<ExtArgs>>): Prisma__ProjetClient<$Result.GetResult<Prisma.$ProjetPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Projet.
     * @param {ProjetUpdateArgs} args - Arguments to update one Projet.
     * @example
     * // Update one Projet
     * const projet = await prisma.projet.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProjetUpdateArgs>(args: SelectSubset<T, ProjetUpdateArgs<ExtArgs>>): Prisma__ProjetClient<$Result.GetResult<Prisma.$ProjetPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Projets.
     * @param {ProjetDeleteManyArgs} args - Arguments to filter Projets to delete.
     * @example
     * // Delete a few Projets
     * const { count } = await prisma.projet.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProjetDeleteManyArgs>(args?: SelectSubset<T, ProjetDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Projets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjetUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Projets
     * const projet = await prisma.projet.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProjetUpdateManyArgs>(args: SelectSubset<T, ProjetUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Projets and returns the data updated in the database.
     * @param {ProjetUpdateManyAndReturnArgs} args - Arguments to update many Projets.
     * @example
     * // Update many Projets
     * const projet = await prisma.projet.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Projets and only return the `id_projet`
     * const projetWithId_projetOnly = await prisma.projet.updateManyAndReturn({
     *   select: { id_projet: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProjetUpdateManyAndReturnArgs>(args: SelectSubset<T, ProjetUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjetPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Projet.
     * @param {ProjetUpsertArgs} args - Arguments to update or create a Projet.
     * @example
     * // Update or create a Projet
     * const projet = await prisma.projet.upsert({
     *   create: {
     *     // ... data to create a Projet
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Projet we want to update
     *   }
     * })
     */
    upsert<T extends ProjetUpsertArgs>(args: SelectSubset<T, ProjetUpsertArgs<ExtArgs>>): Prisma__ProjetClient<$Result.GetResult<Prisma.$ProjetPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Projets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjetCountArgs} args - Arguments to filter Projets to count.
     * @example
     * // Count the number of Projets
     * const count = await prisma.projet.count({
     *   where: {
     *     // ... the filter for the Projets we want to count
     *   }
     * })
    **/
    count<T extends ProjetCountArgs>(
      args?: Subset<T, ProjetCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProjetCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Projet.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjetAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProjetAggregateArgs>(args: Subset<T, ProjetAggregateArgs>): Prisma.PrismaPromise<GetProjetAggregateType<T>>

    /**
     * Group by Projet.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjetGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProjetGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProjetGroupByArgs['orderBy'] }
        : { orderBy?: ProjetGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProjetGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProjetGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Projet model
   */
  readonly fields: ProjetFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Projet.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProjetClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    utilisateur<T extends UtilisateurDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UtilisateurDefaultArgs<ExtArgs>>): Prisma__UtilisateurClient<$Result.GetResult<Prisma.$UtilisateurPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    categories<T extends Projet$categoriesArgs<ExtArgs> = {}>(args?: Subset<T, Projet$categoriesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoriePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    taches<T extends Projet$tachesArgs<ExtArgs> = {}>(args?: Subset<T, Projet$tachesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TachePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Projet model
   */
  interface ProjetFieldRefs {
    readonly id_projet: FieldRef<"Projet", 'Int'>
    readonly nom: FieldRef<"Projet", 'String'>
    readonly id_utilisateur: FieldRef<"Projet", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Projet findUnique
   */
  export type ProjetFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Projet
     */
    select?: ProjetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Projet
     */
    omit?: ProjetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjetInclude<ExtArgs> | null
    /**
     * Filter, which Projet to fetch.
     */
    where: ProjetWhereUniqueInput
  }

  /**
   * Projet findUniqueOrThrow
   */
  export type ProjetFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Projet
     */
    select?: ProjetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Projet
     */
    omit?: ProjetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjetInclude<ExtArgs> | null
    /**
     * Filter, which Projet to fetch.
     */
    where: ProjetWhereUniqueInput
  }

  /**
   * Projet findFirst
   */
  export type ProjetFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Projet
     */
    select?: ProjetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Projet
     */
    omit?: ProjetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjetInclude<ExtArgs> | null
    /**
     * Filter, which Projet to fetch.
     */
    where?: ProjetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projets to fetch.
     */
    orderBy?: ProjetOrderByWithRelationInput | ProjetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Projets.
     */
    cursor?: ProjetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Projets.
     */
    distinct?: ProjetScalarFieldEnum | ProjetScalarFieldEnum[]
  }

  /**
   * Projet findFirstOrThrow
   */
  export type ProjetFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Projet
     */
    select?: ProjetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Projet
     */
    omit?: ProjetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjetInclude<ExtArgs> | null
    /**
     * Filter, which Projet to fetch.
     */
    where?: ProjetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projets to fetch.
     */
    orderBy?: ProjetOrderByWithRelationInput | ProjetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Projets.
     */
    cursor?: ProjetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Projets.
     */
    distinct?: ProjetScalarFieldEnum | ProjetScalarFieldEnum[]
  }

  /**
   * Projet findMany
   */
  export type ProjetFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Projet
     */
    select?: ProjetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Projet
     */
    omit?: ProjetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjetInclude<ExtArgs> | null
    /**
     * Filter, which Projets to fetch.
     */
    where?: ProjetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projets to fetch.
     */
    orderBy?: ProjetOrderByWithRelationInput | ProjetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Projets.
     */
    cursor?: ProjetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projets.
     */
    skip?: number
    distinct?: ProjetScalarFieldEnum | ProjetScalarFieldEnum[]
  }

  /**
   * Projet create
   */
  export type ProjetCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Projet
     */
    select?: ProjetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Projet
     */
    omit?: ProjetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjetInclude<ExtArgs> | null
    /**
     * The data needed to create a Projet.
     */
    data: XOR<ProjetCreateInput, ProjetUncheckedCreateInput>
  }

  /**
   * Projet createMany
   */
  export type ProjetCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Projets.
     */
    data: ProjetCreateManyInput | ProjetCreateManyInput[]
  }

  /**
   * Projet createManyAndReturn
   */
  export type ProjetCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Projet
     */
    select?: ProjetSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Projet
     */
    omit?: ProjetOmit<ExtArgs> | null
    /**
     * The data used to create many Projets.
     */
    data: ProjetCreateManyInput | ProjetCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjetIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Projet update
   */
  export type ProjetUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Projet
     */
    select?: ProjetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Projet
     */
    omit?: ProjetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjetInclude<ExtArgs> | null
    /**
     * The data needed to update a Projet.
     */
    data: XOR<ProjetUpdateInput, ProjetUncheckedUpdateInput>
    /**
     * Choose, which Projet to update.
     */
    where: ProjetWhereUniqueInput
  }

  /**
   * Projet updateMany
   */
  export type ProjetUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Projets.
     */
    data: XOR<ProjetUpdateManyMutationInput, ProjetUncheckedUpdateManyInput>
    /**
     * Filter which Projets to update
     */
    where?: ProjetWhereInput
    /**
     * Limit how many Projets to update.
     */
    limit?: number
  }

  /**
   * Projet updateManyAndReturn
   */
  export type ProjetUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Projet
     */
    select?: ProjetSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Projet
     */
    omit?: ProjetOmit<ExtArgs> | null
    /**
     * The data used to update Projets.
     */
    data: XOR<ProjetUpdateManyMutationInput, ProjetUncheckedUpdateManyInput>
    /**
     * Filter which Projets to update
     */
    where?: ProjetWhereInput
    /**
     * Limit how many Projets to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjetIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Projet upsert
   */
  export type ProjetUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Projet
     */
    select?: ProjetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Projet
     */
    omit?: ProjetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjetInclude<ExtArgs> | null
    /**
     * The filter to search for the Projet to update in case it exists.
     */
    where: ProjetWhereUniqueInput
    /**
     * In case the Projet found by the `where` argument doesn't exist, create a new Projet with this data.
     */
    create: XOR<ProjetCreateInput, ProjetUncheckedCreateInput>
    /**
     * In case the Projet was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProjetUpdateInput, ProjetUncheckedUpdateInput>
  }

  /**
   * Projet delete
   */
  export type ProjetDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Projet
     */
    select?: ProjetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Projet
     */
    omit?: ProjetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjetInclude<ExtArgs> | null
    /**
     * Filter which Projet to delete.
     */
    where: ProjetWhereUniqueInput
  }

  /**
   * Projet deleteMany
   */
  export type ProjetDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Projets to delete
     */
    where?: ProjetWhereInput
    /**
     * Limit how many Projets to delete.
     */
    limit?: number
  }

  /**
   * Projet.categories
   */
  export type Projet$categoriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categorie
     */
    select?: CategorieSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Categorie
     */
    omit?: CategorieOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategorieInclude<ExtArgs> | null
    where?: CategorieWhereInput
    orderBy?: CategorieOrderByWithRelationInput | CategorieOrderByWithRelationInput[]
    cursor?: CategorieWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CategorieScalarFieldEnum | CategorieScalarFieldEnum[]
  }

  /**
   * Projet.taches
   */
  export type Projet$tachesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tache
     */
    select?: TacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tache
     */
    omit?: TacheOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TacheInclude<ExtArgs> | null
    where?: TacheWhereInput
    orderBy?: TacheOrderByWithRelationInput | TacheOrderByWithRelationInput[]
    cursor?: TacheWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TacheScalarFieldEnum | TacheScalarFieldEnum[]
  }

  /**
   * Projet without action
   */
  export type ProjetDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Projet
     */
    select?: ProjetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Projet
     */
    omit?: ProjetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjetInclude<ExtArgs> | null
  }


  /**
   * Model Categorie
   */

  export type AggregateCategorie = {
    _count: CategorieCountAggregateOutputType | null
    _avg: CategorieAvgAggregateOutputType | null
    _sum: CategorieSumAggregateOutputType | null
    _min: CategorieMinAggregateOutputType | null
    _max: CategorieMaxAggregateOutputType | null
  }

  export type CategorieAvgAggregateOutputType = {
    id_categorie: number | null
    id_projet: number | null
  }

  export type CategorieSumAggregateOutputType = {
    id_categorie: number | null
    id_projet: number | null
  }

  export type CategorieMinAggregateOutputType = {
    id_categorie: number | null
    nom: string | null
    id_projet: number | null
  }

  export type CategorieMaxAggregateOutputType = {
    id_categorie: number | null
    nom: string | null
    id_projet: number | null
  }

  export type CategorieCountAggregateOutputType = {
    id_categorie: number
    nom: number
    id_projet: number
    _all: number
  }


  export type CategorieAvgAggregateInputType = {
    id_categorie?: true
    id_projet?: true
  }

  export type CategorieSumAggregateInputType = {
    id_categorie?: true
    id_projet?: true
  }

  export type CategorieMinAggregateInputType = {
    id_categorie?: true
    nom?: true
    id_projet?: true
  }

  export type CategorieMaxAggregateInputType = {
    id_categorie?: true
    nom?: true
    id_projet?: true
  }

  export type CategorieCountAggregateInputType = {
    id_categorie?: true
    nom?: true
    id_projet?: true
    _all?: true
  }

  export type CategorieAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Categorie to aggregate.
     */
    where?: CategorieWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategorieOrderByWithRelationInput | CategorieOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CategorieWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Categories
    **/
    _count?: true | CategorieCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CategorieAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CategorieSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CategorieMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CategorieMaxAggregateInputType
  }

  export type GetCategorieAggregateType<T extends CategorieAggregateArgs> = {
        [P in keyof T & keyof AggregateCategorie]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCategorie[P]>
      : GetScalarType<T[P], AggregateCategorie[P]>
  }




  export type CategorieGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CategorieWhereInput
    orderBy?: CategorieOrderByWithAggregationInput | CategorieOrderByWithAggregationInput[]
    by: CategorieScalarFieldEnum[] | CategorieScalarFieldEnum
    having?: CategorieScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CategorieCountAggregateInputType | true
    _avg?: CategorieAvgAggregateInputType
    _sum?: CategorieSumAggregateInputType
    _min?: CategorieMinAggregateInputType
    _max?: CategorieMaxAggregateInputType
  }

  export type CategorieGroupByOutputType = {
    id_categorie: number
    nom: string
    id_projet: number
    _count: CategorieCountAggregateOutputType | null
    _avg: CategorieAvgAggregateOutputType | null
    _sum: CategorieSumAggregateOutputType | null
    _min: CategorieMinAggregateOutputType | null
    _max: CategorieMaxAggregateOutputType | null
  }

  type GetCategorieGroupByPayload<T extends CategorieGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CategorieGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CategorieGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CategorieGroupByOutputType[P]>
            : GetScalarType<T[P], CategorieGroupByOutputType[P]>
        }
      >
    >


  export type CategorieSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_categorie?: boolean
    nom?: boolean
    id_projet?: boolean
    projet?: boolean | ProjetDefaultArgs<ExtArgs>
    taches?: boolean | Categorie$tachesArgs<ExtArgs>
    _count?: boolean | CategorieCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["categorie"]>

  export type CategorieSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_categorie?: boolean
    nom?: boolean
    id_projet?: boolean
    projet?: boolean | ProjetDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["categorie"]>

  export type CategorieSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_categorie?: boolean
    nom?: boolean
    id_projet?: boolean
    projet?: boolean | ProjetDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["categorie"]>

  export type CategorieSelectScalar = {
    id_categorie?: boolean
    nom?: boolean
    id_projet?: boolean
  }

  export type CategorieOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id_categorie" | "nom" | "id_projet", ExtArgs["result"]["categorie"]>
  export type CategorieInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    projet?: boolean | ProjetDefaultArgs<ExtArgs>
    taches?: boolean | Categorie$tachesArgs<ExtArgs>
    _count?: boolean | CategorieCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CategorieIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    projet?: boolean | ProjetDefaultArgs<ExtArgs>
  }
  export type CategorieIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    projet?: boolean | ProjetDefaultArgs<ExtArgs>
  }

  export type $CategoriePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Categorie"
    objects: {
      projet: Prisma.$ProjetPayload<ExtArgs>
      taches: Prisma.$TachePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id_categorie: number
      nom: string
      id_projet: number
    }, ExtArgs["result"]["categorie"]>
    composites: {}
  }

  type CategorieGetPayload<S extends boolean | null | undefined | CategorieDefaultArgs> = $Result.GetResult<Prisma.$CategoriePayload, S>

  type CategorieCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CategorieFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CategorieCountAggregateInputType | true
    }

  export interface CategorieDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Categorie'], meta: { name: 'Categorie' } }
    /**
     * Find zero or one Categorie that matches the filter.
     * @param {CategorieFindUniqueArgs} args - Arguments to find a Categorie
     * @example
     * // Get one Categorie
     * const categorie = await prisma.categorie.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CategorieFindUniqueArgs>(args: SelectSubset<T, CategorieFindUniqueArgs<ExtArgs>>): Prisma__CategorieClient<$Result.GetResult<Prisma.$CategoriePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Categorie that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CategorieFindUniqueOrThrowArgs} args - Arguments to find a Categorie
     * @example
     * // Get one Categorie
     * const categorie = await prisma.categorie.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CategorieFindUniqueOrThrowArgs>(args: SelectSubset<T, CategorieFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CategorieClient<$Result.GetResult<Prisma.$CategoriePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Categorie that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategorieFindFirstArgs} args - Arguments to find a Categorie
     * @example
     * // Get one Categorie
     * const categorie = await prisma.categorie.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CategorieFindFirstArgs>(args?: SelectSubset<T, CategorieFindFirstArgs<ExtArgs>>): Prisma__CategorieClient<$Result.GetResult<Prisma.$CategoriePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Categorie that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategorieFindFirstOrThrowArgs} args - Arguments to find a Categorie
     * @example
     * // Get one Categorie
     * const categorie = await prisma.categorie.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CategorieFindFirstOrThrowArgs>(args?: SelectSubset<T, CategorieFindFirstOrThrowArgs<ExtArgs>>): Prisma__CategorieClient<$Result.GetResult<Prisma.$CategoriePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Categories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategorieFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Categories
     * const categories = await prisma.categorie.findMany()
     * 
     * // Get first 10 Categories
     * const categories = await prisma.categorie.findMany({ take: 10 })
     * 
     * // Only select the `id_categorie`
     * const categorieWithId_categorieOnly = await prisma.categorie.findMany({ select: { id_categorie: true } })
     * 
     */
    findMany<T extends CategorieFindManyArgs>(args?: SelectSubset<T, CategorieFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoriePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Categorie.
     * @param {CategorieCreateArgs} args - Arguments to create a Categorie.
     * @example
     * // Create one Categorie
     * const Categorie = await prisma.categorie.create({
     *   data: {
     *     // ... data to create a Categorie
     *   }
     * })
     * 
     */
    create<T extends CategorieCreateArgs>(args: SelectSubset<T, CategorieCreateArgs<ExtArgs>>): Prisma__CategorieClient<$Result.GetResult<Prisma.$CategoriePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Categories.
     * @param {CategorieCreateManyArgs} args - Arguments to create many Categories.
     * @example
     * // Create many Categories
     * const categorie = await prisma.categorie.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CategorieCreateManyArgs>(args?: SelectSubset<T, CategorieCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Categories and returns the data saved in the database.
     * @param {CategorieCreateManyAndReturnArgs} args - Arguments to create many Categories.
     * @example
     * // Create many Categories
     * const categorie = await prisma.categorie.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Categories and only return the `id_categorie`
     * const categorieWithId_categorieOnly = await prisma.categorie.createManyAndReturn({
     *   select: { id_categorie: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CategorieCreateManyAndReturnArgs>(args?: SelectSubset<T, CategorieCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoriePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Categorie.
     * @param {CategorieDeleteArgs} args - Arguments to delete one Categorie.
     * @example
     * // Delete one Categorie
     * const Categorie = await prisma.categorie.delete({
     *   where: {
     *     // ... filter to delete one Categorie
     *   }
     * })
     * 
     */
    delete<T extends CategorieDeleteArgs>(args: SelectSubset<T, CategorieDeleteArgs<ExtArgs>>): Prisma__CategorieClient<$Result.GetResult<Prisma.$CategoriePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Categorie.
     * @param {CategorieUpdateArgs} args - Arguments to update one Categorie.
     * @example
     * // Update one Categorie
     * const categorie = await prisma.categorie.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CategorieUpdateArgs>(args: SelectSubset<T, CategorieUpdateArgs<ExtArgs>>): Prisma__CategorieClient<$Result.GetResult<Prisma.$CategoriePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Categories.
     * @param {CategorieDeleteManyArgs} args - Arguments to filter Categories to delete.
     * @example
     * // Delete a few Categories
     * const { count } = await prisma.categorie.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CategorieDeleteManyArgs>(args?: SelectSubset<T, CategorieDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategorieUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Categories
     * const categorie = await prisma.categorie.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CategorieUpdateManyArgs>(args: SelectSubset<T, CategorieUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Categories and returns the data updated in the database.
     * @param {CategorieUpdateManyAndReturnArgs} args - Arguments to update many Categories.
     * @example
     * // Update many Categories
     * const categorie = await prisma.categorie.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Categories and only return the `id_categorie`
     * const categorieWithId_categorieOnly = await prisma.categorie.updateManyAndReturn({
     *   select: { id_categorie: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CategorieUpdateManyAndReturnArgs>(args: SelectSubset<T, CategorieUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoriePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Categorie.
     * @param {CategorieUpsertArgs} args - Arguments to update or create a Categorie.
     * @example
     * // Update or create a Categorie
     * const categorie = await prisma.categorie.upsert({
     *   create: {
     *     // ... data to create a Categorie
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Categorie we want to update
     *   }
     * })
     */
    upsert<T extends CategorieUpsertArgs>(args: SelectSubset<T, CategorieUpsertArgs<ExtArgs>>): Prisma__CategorieClient<$Result.GetResult<Prisma.$CategoriePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategorieCountArgs} args - Arguments to filter Categories to count.
     * @example
     * // Count the number of Categories
     * const count = await prisma.categorie.count({
     *   where: {
     *     // ... the filter for the Categories we want to count
     *   }
     * })
    **/
    count<T extends CategorieCountArgs>(
      args?: Subset<T, CategorieCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CategorieCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Categorie.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategorieAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CategorieAggregateArgs>(args: Subset<T, CategorieAggregateArgs>): Prisma.PrismaPromise<GetCategorieAggregateType<T>>

    /**
     * Group by Categorie.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategorieGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CategorieGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CategorieGroupByArgs['orderBy'] }
        : { orderBy?: CategorieGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CategorieGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCategorieGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Categorie model
   */
  readonly fields: CategorieFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Categorie.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CategorieClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    projet<T extends ProjetDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProjetDefaultArgs<ExtArgs>>): Prisma__ProjetClient<$Result.GetResult<Prisma.$ProjetPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    taches<T extends Categorie$tachesArgs<ExtArgs> = {}>(args?: Subset<T, Categorie$tachesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TachePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Categorie model
   */
  interface CategorieFieldRefs {
    readonly id_categorie: FieldRef<"Categorie", 'Int'>
    readonly nom: FieldRef<"Categorie", 'String'>
    readonly id_projet: FieldRef<"Categorie", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Categorie findUnique
   */
  export type CategorieFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categorie
     */
    select?: CategorieSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Categorie
     */
    omit?: CategorieOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategorieInclude<ExtArgs> | null
    /**
     * Filter, which Categorie to fetch.
     */
    where: CategorieWhereUniqueInput
  }

  /**
   * Categorie findUniqueOrThrow
   */
  export type CategorieFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categorie
     */
    select?: CategorieSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Categorie
     */
    omit?: CategorieOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategorieInclude<ExtArgs> | null
    /**
     * Filter, which Categorie to fetch.
     */
    where: CategorieWhereUniqueInput
  }

  /**
   * Categorie findFirst
   */
  export type CategorieFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categorie
     */
    select?: CategorieSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Categorie
     */
    omit?: CategorieOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategorieInclude<ExtArgs> | null
    /**
     * Filter, which Categorie to fetch.
     */
    where?: CategorieWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategorieOrderByWithRelationInput | CategorieOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Categories.
     */
    cursor?: CategorieWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categories.
     */
    distinct?: CategorieScalarFieldEnum | CategorieScalarFieldEnum[]
  }

  /**
   * Categorie findFirstOrThrow
   */
  export type CategorieFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categorie
     */
    select?: CategorieSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Categorie
     */
    omit?: CategorieOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategorieInclude<ExtArgs> | null
    /**
     * Filter, which Categorie to fetch.
     */
    where?: CategorieWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategorieOrderByWithRelationInput | CategorieOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Categories.
     */
    cursor?: CategorieWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categories.
     */
    distinct?: CategorieScalarFieldEnum | CategorieScalarFieldEnum[]
  }

  /**
   * Categorie findMany
   */
  export type CategorieFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categorie
     */
    select?: CategorieSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Categorie
     */
    omit?: CategorieOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategorieInclude<ExtArgs> | null
    /**
     * Filter, which Categories to fetch.
     */
    where?: CategorieWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategorieOrderByWithRelationInput | CategorieOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Categories.
     */
    cursor?: CategorieWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    distinct?: CategorieScalarFieldEnum | CategorieScalarFieldEnum[]
  }

  /**
   * Categorie create
   */
  export type CategorieCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categorie
     */
    select?: CategorieSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Categorie
     */
    omit?: CategorieOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategorieInclude<ExtArgs> | null
    /**
     * The data needed to create a Categorie.
     */
    data: XOR<CategorieCreateInput, CategorieUncheckedCreateInput>
  }

  /**
   * Categorie createMany
   */
  export type CategorieCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Categories.
     */
    data: CategorieCreateManyInput | CategorieCreateManyInput[]
  }

  /**
   * Categorie createManyAndReturn
   */
  export type CategorieCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categorie
     */
    select?: CategorieSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Categorie
     */
    omit?: CategorieOmit<ExtArgs> | null
    /**
     * The data used to create many Categories.
     */
    data: CategorieCreateManyInput | CategorieCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategorieIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Categorie update
   */
  export type CategorieUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categorie
     */
    select?: CategorieSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Categorie
     */
    omit?: CategorieOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategorieInclude<ExtArgs> | null
    /**
     * The data needed to update a Categorie.
     */
    data: XOR<CategorieUpdateInput, CategorieUncheckedUpdateInput>
    /**
     * Choose, which Categorie to update.
     */
    where: CategorieWhereUniqueInput
  }

  /**
   * Categorie updateMany
   */
  export type CategorieUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Categories.
     */
    data: XOR<CategorieUpdateManyMutationInput, CategorieUncheckedUpdateManyInput>
    /**
     * Filter which Categories to update
     */
    where?: CategorieWhereInput
    /**
     * Limit how many Categories to update.
     */
    limit?: number
  }

  /**
   * Categorie updateManyAndReturn
   */
  export type CategorieUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categorie
     */
    select?: CategorieSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Categorie
     */
    omit?: CategorieOmit<ExtArgs> | null
    /**
     * The data used to update Categories.
     */
    data: XOR<CategorieUpdateManyMutationInput, CategorieUncheckedUpdateManyInput>
    /**
     * Filter which Categories to update
     */
    where?: CategorieWhereInput
    /**
     * Limit how many Categories to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategorieIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Categorie upsert
   */
  export type CategorieUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categorie
     */
    select?: CategorieSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Categorie
     */
    omit?: CategorieOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategorieInclude<ExtArgs> | null
    /**
     * The filter to search for the Categorie to update in case it exists.
     */
    where: CategorieWhereUniqueInput
    /**
     * In case the Categorie found by the `where` argument doesn't exist, create a new Categorie with this data.
     */
    create: XOR<CategorieCreateInput, CategorieUncheckedCreateInput>
    /**
     * In case the Categorie was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CategorieUpdateInput, CategorieUncheckedUpdateInput>
  }

  /**
   * Categorie delete
   */
  export type CategorieDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categorie
     */
    select?: CategorieSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Categorie
     */
    omit?: CategorieOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategorieInclude<ExtArgs> | null
    /**
     * Filter which Categorie to delete.
     */
    where: CategorieWhereUniqueInput
  }

  /**
   * Categorie deleteMany
   */
  export type CategorieDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Categories to delete
     */
    where?: CategorieWhereInput
    /**
     * Limit how many Categories to delete.
     */
    limit?: number
  }

  /**
   * Categorie.taches
   */
  export type Categorie$tachesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tache
     */
    select?: TacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tache
     */
    omit?: TacheOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TacheInclude<ExtArgs> | null
    where?: TacheWhereInput
    orderBy?: TacheOrderByWithRelationInput | TacheOrderByWithRelationInput[]
    cursor?: TacheWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TacheScalarFieldEnum | TacheScalarFieldEnum[]
  }

  /**
   * Categorie without action
   */
  export type CategorieDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categorie
     */
    select?: CategorieSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Categorie
     */
    omit?: CategorieOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategorieInclude<ExtArgs> | null
  }


  /**
   * Model Tache
   */

  export type AggregateTache = {
    _count: TacheCountAggregateOutputType | null
    _avg: TacheAvgAggregateOutputType | null
    _sum: TacheSumAggregateOutputType | null
    _min: TacheMinAggregateOutputType | null
    _max: TacheMaxAggregateOutputType | null
  }

  export type TacheAvgAggregateOutputType = {
    id_tache: number | null
    id_categorie: number | null
    id_utilisateur: number | null
    id_projet: number | null
  }

  export type TacheSumAggregateOutputType = {
    id_tache: number | null
    id_categorie: number | null
    id_utilisateur: number | null
    id_projet: number | null
  }

  export type TacheMinAggregateOutputType = {
    id_tache: number | null
    titre: string | null
    description: string | null
    date_limite: Date | null
    priorite: $Enums.Priorite | null
    status: $Enums.Status | null
    id_categorie: number | null
    id_utilisateur: number | null
    id_projet: number | null
  }

  export type TacheMaxAggregateOutputType = {
    id_tache: number | null
    titre: string | null
    description: string | null
    date_limite: Date | null
    priorite: $Enums.Priorite | null
    status: $Enums.Status | null
    id_categorie: number | null
    id_utilisateur: number | null
    id_projet: number | null
  }

  export type TacheCountAggregateOutputType = {
    id_tache: number
    titre: number
    description: number
    date_limite: number
    priorite: number
    status: number
    id_categorie: number
    id_utilisateur: number
    id_projet: number
    _all: number
  }


  export type TacheAvgAggregateInputType = {
    id_tache?: true
    id_categorie?: true
    id_utilisateur?: true
    id_projet?: true
  }

  export type TacheSumAggregateInputType = {
    id_tache?: true
    id_categorie?: true
    id_utilisateur?: true
    id_projet?: true
  }

  export type TacheMinAggregateInputType = {
    id_tache?: true
    titre?: true
    description?: true
    date_limite?: true
    priorite?: true
    status?: true
    id_categorie?: true
    id_utilisateur?: true
    id_projet?: true
  }

  export type TacheMaxAggregateInputType = {
    id_tache?: true
    titre?: true
    description?: true
    date_limite?: true
    priorite?: true
    status?: true
    id_categorie?: true
    id_utilisateur?: true
    id_projet?: true
  }

  export type TacheCountAggregateInputType = {
    id_tache?: true
    titre?: true
    description?: true
    date_limite?: true
    priorite?: true
    status?: true
    id_categorie?: true
    id_utilisateur?: true
    id_projet?: true
    _all?: true
  }

  export type TacheAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tache to aggregate.
     */
    where?: TacheWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Taches to fetch.
     */
    orderBy?: TacheOrderByWithRelationInput | TacheOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TacheWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Taches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Taches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Taches
    **/
    _count?: true | TacheCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TacheAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TacheSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TacheMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TacheMaxAggregateInputType
  }

  export type GetTacheAggregateType<T extends TacheAggregateArgs> = {
        [P in keyof T & keyof AggregateTache]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTache[P]>
      : GetScalarType<T[P], AggregateTache[P]>
  }




  export type TacheGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TacheWhereInput
    orderBy?: TacheOrderByWithAggregationInput | TacheOrderByWithAggregationInput[]
    by: TacheScalarFieldEnum[] | TacheScalarFieldEnum
    having?: TacheScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TacheCountAggregateInputType | true
    _avg?: TacheAvgAggregateInputType
    _sum?: TacheSumAggregateInputType
    _min?: TacheMinAggregateInputType
    _max?: TacheMaxAggregateInputType
  }

  export type TacheGroupByOutputType = {
    id_tache: number
    titre: string
    description: string | null
    date_limite: Date | null
    priorite: $Enums.Priorite
    status: $Enums.Status
    id_categorie: number | null
    id_utilisateur: number
    id_projet: number
    _count: TacheCountAggregateOutputType | null
    _avg: TacheAvgAggregateOutputType | null
    _sum: TacheSumAggregateOutputType | null
    _min: TacheMinAggregateOutputType | null
    _max: TacheMaxAggregateOutputType | null
  }

  type GetTacheGroupByPayload<T extends TacheGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TacheGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TacheGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TacheGroupByOutputType[P]>
            : GetScalarType<T[P], TacheGroupByOutputType[P]>
        }
      >
    >


  export type TacheSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_tache?: boolean
    titre?: boolean
    description?: boolean
    date_limite?: boolean
    priorite?: boolean
    status?: boolean
    id_categorie?: boolean
    id_utilisateur?: boolean
    id_projet?: boolean
    categorie?: boolean | Tache$categorieArgs<ExtArgs>
    utilisateur?: boolean | UtilisateurDefaultArgs<ExtArgs>
    fichiers_joints?: boolean | Tache$fichiers_jointsArgs<ExtArgs>
    projet?: boolean | ProjetDefaultArgs<ExtArgs>
    _count?: boolean | TacheCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tache"]>

  export type TacheSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_tache?: boolean
    titre?: boolean
    description?: boolean
    date_limite?: boolean
    priorite?: boolean
    status?: boolean
    id_categorie?: boolean
    id_utilisateur?: boolean
    id_projet?: boolean
    categorie?: boolean | Tache$categorieArgs<ExtArgs>
    utilisateur?: boolean | UtilisateurDefaultArgs<ExtArgs>
    projet?: boolean | ProjetDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tache"]>

  export type TacheSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_tache?: boolean
    titre?: boolean
    description?: boolean
    date_limite?: boolean
    priorite?: boolean
    status?: boolean
    id_categorie?: boolean
    id_utilisateur?: boolean
    id_projet?: boolean
    categorie?: boolean | Tache$categorieArgs<ExtArgs>
    utilisateur?: boolean | UtilisateurDefaultArgs<ExtArgs>
    projet?: boolean | ProjetDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tache"]>

  export type TacheSelectScalar = {
    id_tache?: boolean
    titre?: boolean
    description?: boolean
    date_limite?: boolean
    priorite?: boolean
    status?: boolean
    id_categorie?: boolean
    id_utilisateur?: boolean
    id_projet?: boolean
  }

  export type TacheOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id_tache" | "titre" | "description" | "date_limite" | "priorite" | "status" | "id_categorie" | "id_utilisateur" | "id_projet", ExtArgs["result"]["tache"]>
  export type TacheInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    categorie?: boolean | Tache$categorieArgs<ExtArgs>
    utilisateur?: boolean | UtilisateurDefaultArgs<ExtArgs>
    fichiers_joints?: boolean | Tache$fichiers_jointsArgs<ExtArgs>
    projet?: boolean | ProjetDefaultArgs<ExtArgs>
    _count?: boolean | TacheCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TacheIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    categorie?: boolean | Tache$categorieArgs<ExtArgs>
    utilisateur?: boolean | UtilisateurDefaultArgs<ExtArgs>
    projet?: boolean | ProjetDefaultArgs<ExtArgs>
  }
  export type TacheIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    categorie?: boolean | Tache$categorieArgs<ExtArgs>
    utilisateur?: boolean | UtilisateurDefaultArgs<ExtArgs>
    projet?: boolean | ProjetDefaultArgs<ExtArgs>
  }

  export type $TachePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Tache"
    objects: {
      categorie: Prisma.$CategoriePayload<ExtArgs> | null
      utilisateur: Prisma.$UtilisateurPayload<ExtArgs>
      fichiers_joints: Prisma.$FicherJointPayload<ExtArgs>[]
      projet: Prisma.$ProjetPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id_tache: number
      titre: string
      description: string | null
      date_limite: Date | null
      priorite: $Enums.Priorite
      status: $Enums.Status
      id_categorie: number | null
      id_utilisateur: number
      id_projet: number
    }, ExtArgs["result"]["tache"]>
    composites: {}
  }

  type TacheGetPayload<S extends boolean | null | undefined | TacheDefaultArgs> = $Result.GetResult<Prisma.$TachePayload, S>

  type TacheCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TacheFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TacheCountAggregateInputType | true
    }

  export interface TacheDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Tache'], meta: { name: 'Tache' } }
    /**
     * Find zero or one Tache that matches the filter.
     * @param {TacheFindUniqueArgs} args - Arguments to find a Tache
     * @example
     * // Get one Tache
     * const tache = await prisma.tache.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TacheFindUniqueArgs>(args: SelectSubset<T, TacheFindUniqueArgs<ExtArgs>>): Prisma__TacheClient<$Result.GetResult<Prisma.$TachePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Tache that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TacheFindUniqueOrThrowArgs} args - Arguments to find a Tache
     * @example
     * // Get one Tache
     * const tache = await prisma.tache.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TacheFindUniqueOrThrowArgs>(args: SelectSubset<T, TacheFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TacheClient<$Result.GetResult<Prisma.$TachePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tache that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TacheFindFirstArgs} args - Arguments to find a Tache
     * @example
     * // Get one Tache
     * const tache = await prisma.tache.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TacheFindFirstArgs>(args?: SelectSubset<T, TacheFindFirstArgs<ExtArgs>>): Prisma__TacheClient<$Result.GetResult<Prisma.$TachePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tache that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TacheFindFirstOrThrowArgs} args - Arguments to find a Tache
     * @example
     * // Get one Tache
     * const tache = await prisma.tache.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TacheFindFirstOrThrowArgs>(args?: SelectSubset<T, TacheFindFirstOrThrowArgs<ExtArgs>>): Prisma__TacheClient<$Result.GetResult<Prisma.$TachePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Taches that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TacheFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Taches
     * const taches = await prisma.tache.findMany()
     * 
     * // Get first 10 Taches
     * const taches = await prisma.tache.findMany({ take: 10 })
     * 
     * // Only select the `id_tache`
     * const tacheWithId_tacheOnly = await prisma.tache.findMany({ select: { id_tache: true } })
     * 
     */
    findMany<T extends TacheFindManyArgs>(args?: SelectSubset<T, TacheFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TachePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Tache.
     * @param {TacheCreateArgs} args - Arguments to create a Tache.
     * @example
     * // Create one Tache
     * const Tache = await prisma.tache.create({
     *   data: {
     *     // ... data to create a Tache
     *   }
     * })
     * 
     */
    create<T extends TacheCreateArgs>(args: SelectSubset<T, TacheCreateArgs<ExtArgs>>): Prisma__TacheClient<$Result.GetResult<Prisma.$TachePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Taches.
     * @param {TacheCreateManyArgs} args - Arguments to create many Taches.
     * @example
     * // Create many Taches
     * const tache = await prisma.tache.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TacheCreateManyArgs>(args?: SelectSubset<T, TacheCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Taches and returns the data saved in the database.
     * @param {TacheCreateManyAndReturnArgs} args - Arguments to create many Taches.
     * @example
     * // Create many Taches
     * const tache = await prisma.tache.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Taches and only return the `id_tache`
     * const tacheWithId_tacheOnly = await prisma.tache.createManyAndReturn({
     *   select: { id_tache: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TacheCreateManyAndReturnArgs>(args?: SelectSubset<T, TacheCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TachePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Tache.
     * @param {TacheDeleteArgs} args - Arguments to delete one Tache.
     * @example
     * // Delete one Tache
     * const Tache = await prisma.tache.delete({
     *   where: {
     *     // ... filter to delete one Tache
     *   }
     * })
     * 
     */
    delete<T extends TacheDeleteArgs>(args: SelectSubset<T, TacheDeleteArgs<ExtArgs>>): Prisma__TacheClient<$Result.GetResult<Prisma.$TachePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Tache.
     * @param {TacheUpdateArgs} args - Arguments to update one Tache.
     * @example
     * // Update one Tache
     * const tache = await prisma.tache.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TacheUpdateArgs>(args: SelectSubset<T, TacheUpdateArgs<ExtArgs>>): Prisma__TacheClient<$Result.GetResult<Prisma.$TachePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Taches.
     * @param {TacheDeleteManyArgs} args - Arguments to filter Taches to delete.
     * @example
     * // Delete a few Taches
     * const { count } = await prisma.tache.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TacheDeleteManyArgs>(args?: SelectSubset<T, TacheDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Taches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TacheUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Taches
     * const tache = await prisma.tache.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TacheUpdateManyArgs>(args: SelectSubset<T, TacheUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Taches and returns the data updated in the database.
     * @param {TacheUpdateManyAndReturnArgs} args - Arguments to update many Taches.
     * @example
     * // Update many Taches
     * const tache = await prisma.tache.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Taches and only return the `id_tache`
     * const tacheWithId_tacheOnly = await prisma.tache.updateManyAndReturn({
     *   select: { id_tache: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TacheUpdateManyAndReturnArgs>(args: SelectSubset<T, TacheUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TachePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Tache.
     * @param {TacheUpsertArgs} args - Arguments to update or create a Tache.
     * @example
     * // Update or create a Tache
     * const tache = await prisma.tache.upsert({
     *   create: {
     *     // ... data to create a Tache
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Tache we want to update
     *   }
     * })
     */
    upsert<T extends TacheUpsertArgs>(args: SelectSubset<T, TacheUpsertArgs<ExtArgs>>): Prisma__TacheClient<$Result.GetResult<Prisma.$TachePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Taches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TacheCountArgs} args - Arguments to filter Taches to count.
     * @example
     * // Count the number of Taches
     * const count = await prisma.tache.count({
     *   where: {
     *     // ... the filter for the Taches we want to count
     *   }
     * })
    **/
    count<T extends TacheCountArgs>(
      args?: Subset<T, TacheCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TacheCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Tache.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TacheAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TacheAggregateArgs>(args: Subset<T, TacheAggregateArgs>): Prisma.PrismaPromise<GetTacheAggregateType<T>>

    /**
     * Group by Tache.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TacheGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TacheGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TacheGroupByArgs['orderBy'] }
        : { orderBy?: TacheGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TacheGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTacheGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Tache model
   */
  readonly fields: TacheFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Tache.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TacheClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    categorie<T extends Tache$categorieArgs<ExtArgs> = {}>(args?: Subset<T, Tache$categorieArgs<ExtArgs>>): Prisma__CategorieClient<$Result.GetResult<Prisma.$CategoriePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    utilisateur<T extends UtilisateurDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UtilisateurDefaultArgs<ExtArgs>>): Prisma__UtilisateurClient<$Result.GetResult<Prisma.$UtilisateurPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    fichiers_joints<T extends Tache$fichiers_jointsArgs<ExtArgs> = {}>(args?: Subset<T, Tache$fichiers_jointsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FicherJointPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    projet<T extends ProjetDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProjetDefaultArgs<ExtArgs>>): Prisma__ProjetClient<$Result.GetResult<Prisma.$ProjetPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Tache model
   */
  interface TacheFieldRefs {
    readonly id_tache: FieldRef<"Tache", 'Int'>
    readonly titre: FieldRef<"Tache", 'String'>
    readonly description: FieldRef<"Tache", 'String'>
    readonly date_limite: FieldRef<"Tache", 'DateTime'>
    readonly priorite: FieldRef<"Tache", 'Priorite'>
    readonly status: FieldRef<"Tache", 'Status'>
    readonly id_categorie: FieldRef<"Tache", 'Int'>
    readonly id_utilisateur: FieldRef<"Tache", 'Int'>
    readonly id_projet: FieldRef<"Tache", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Tache findUnique
   */
  export type TacheFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tache
     */
    select?: TacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tache
     */
    omit?: TacheOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TacheInclude<ExtArgs> | null
    /**
     * Filter, which Tache to fetch.
     */
    where: TacheWhereUniqueInput
  }

  /**
   * Tache findUniqueOrThrow
   */
  export type TacheFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tache
     */
    select?: TacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tache
     */
    omit?: TacheOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TacheInclude<ExtArgs> | null
    /**
     * Filter, which Tache to fetch.
     */
    where: TacheWhereUniqueInput
  }

  /**
   * Tache findFirst
   */
  export type TacheFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tache
     */
    select?: TacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tache
     */
    omit?: TacheOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TacheInclude<ExtArgs> | null
    /**
     * Filter, which Tache to fetch.
     */
    where?: TacheWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Taches to fetch.
     */
    orderBy?: TacheOrderByWithRelationInput | TacheOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Taches.
     */
    cursor?: TacheWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Taches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Taches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Taches.
     */
    distinct?: TacheScalarFieldEnum | TacheScalarFieldEnum[]
  }

  /**
   * Tache findFirstOrThrow
   */
  export type TacheFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tache
     */
    select?: TacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tache
     */
    omit?: TacheOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TacheInclude<ExtArgs> | null
    /**
     * Filter, which Tache to fetch.
     */
    where?: TacheWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Taches to fetch.
     */
    orderBy?: TacheOrderByWithRelationInput | TacheOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Taches.
     */
    cursor?: TacheWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Taches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Taches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Taches.
     */
    distinct?: TacheScalarFieldEnum | TacheScalarFieldEnum[]
  }

  /**
   * Tache findMany
   */
  export type TacheFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tache
     */
    select?: TacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tache
     */
    omit?: TacheOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TacheInclude<ExtArgs> | null
    /**
     * Filter, which Taches to fetch.
     */
    where?: TacheWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Taches to fetch.
     */
    orderBy?: TacheOrderByWithRelationInput | TacheOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Taches.
     */
    cursor?: TacheWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Taches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Taches.
     */
    skip?: number
    distinct?: TacheScalarFieldEnum | TacheScalarFieldEnum[]
  }

  /**
   * Tache create
   */
  export type TacheCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tache
     */
    select?: TacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tache
     */
    omit?: TacheOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TacheInclude<ExtArgs> | null
    /**
     * The data needed to create a Tache.
     */
    data: XOR<TacheCreateInput, TacheUncheckedCreateInput>
  }

  /**
   * Tache createMany
   */
  export type TacheCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Taches.
     */
    data: TacheCreateManyInput | TacheCreateManyInput[]
  }

  /**
   * Tache createManyAndReturn
   */
  export type TacheCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tache
     */
    select?: TacheSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Tache
     */
    omit?: TacheOmit<ExtArgs> | null
    /**
     * The data used to create many Taches.
     */
    data: TacheCreateManyInput | TacheCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TacheIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Tache update
   */
  export type TacheUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tache
     */
    select?: TacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tache
     */
    omit?: TacheOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TacheInclude<ExtArgs> | null
    /**
     * The data needed to update a Tache.
     */
    data: XOR<TacheUpdateInput, TacheUncheckedUpdateInput>
    /**
     * Choose, which Tache to update.
     */
    where: TacheWhereUniqueInput
  }

  /**
   * Tache updateMany
   */
  export type TacheUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Taches.
     */
    data: XOR<TacheUpdateManyMutationInput, TacheUncheckedUpdateManyInput>
    /**
     * Filter which Taches to update
     */
    where?: TacheWhereInput
    /**
     * Limit how many Taches to update.
     */
    limit?: number
  }

  /**
   * Tache updateManyAndReturn
   */
  export type TacheUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tache
     */
    select?: TacheSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Tache
     */
    omit?: TacheOmit<ExtArgs> | null
    /**
     * The data used to update Taches.
     */
    data: XOR<TacheUpdateManyMutationInput, TacheUncheckedUpdateManyInput>
    /**
     * Filter which Taches to update
     */
    where?: TacheWhereInput
    /**
     * Limit how many Taches to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TacheIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Tache upsert
   */
  export type TacheUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tache
     */
    select?: TacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tache
     */
    omit?: TacheOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TacheInclude<ExtArgs> | null
    /**
     * The filter to search for the Tache to update in case it exists.
     */
    where: TacheWhereUniqueInput
    /**
     * In case the Tache found by the `where` argument doesn't exist, create a new Tache with this data.
     */
    create: XOR<TacheCreateInput, TacheUncheckedCreateInput>
    /**
     * In case the Tache was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TacheUpdateInput, TacheUncheckedUpdateInput>
  }

  /**
   * Tache delete
   */
  export type TacheDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tache
     */
    select?: TacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tache
     */
    omit?: TacheOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TacheInclude<ExtArgs> | null
    /**
     * Filter which Tache to delete.
     */
    where: TacheWhereUniqueInput
  }

  /**
   * Tache deleteMany
   */
  export type TacheDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Taches to delete
     */
    where?: TacheWhereInput
    /**
     * Limit how many Taches to delete.
     */
    limit?: number
  }

  /**
   * Tache.categorie
   */
  export type Tache$categorieArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categorie
     */
    select?: CategorieSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Categorie
     */
    omit?: CategorieOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategorieInclude<ExtArgs> | null
    where?: CategorieWhereInput
  }

  /**
   * Tache.fichiers_joints
   */
  export type Tache$fichiers_jointsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FicherJoint
     */
    select?: FicherJointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FicherJoint
     */
    omit?: FicherJointOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FicherJointInclude<ExtArgs> | null
    where?: FicherJointWhereInput
    orderBy?: FicherJointOrderByWithRelationInput | FicherJointOrderByWithRelationInput[]
    cursor?: FicherJointWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FicherJointScalarFieldEnum | FicherJointScalarFieldEnum[]
  }

  /**
   * Tache without action
   */
  export type TacheDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tache
     */
    select?: TacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tache
     */
    omit?: TacheOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TacheInclude<ExtArgs> | null
  }


  /**
   * Model FicherJoint
   */

  export type AggregateFicherJoint = {
    _count: FicherJointCountAggregateOutputType | null
    _avg: FicherJointAvgAggregateOutputType | null
    _sum: FicherJointSumAggregateOutputType | null
    _min: FicherJointMinAggregateOutputType | null
    _max: FicherJointMaxAggregateOutputType | null
  }

  export type FicherJointAvgAggregateOutputType = {
    id_ficher: number | null
    id_tache: number | null
  }

  export type FicherJointSumAggregateOutputType = {
    id_ficher: number | null
    id_tache: number | null
  }

  export type FicherJointMinAggregateOutputType = {
    id_ficher: number | null
    url: string | null
    nom: string | null
    id_tache: number | null
  }

  export type FicherJointMaxAggregateOutputType = {
    id_ficher: number | null
    url: string | null
    nom: string | null
    id_tache: number | null
  }

  export type FicherJointCountAggregateOutputType = {
    id_ficher: number
    url: number
    nom: number
    id_tache: number
    _all: number
  }


  export type FicherJointAvgAggregateInputType = {
    id_ficher?: true
    id_tache?: true
  }

  export type FicherJointSumAggregateInputType = {
    id_ficher?: true
    id_tache?: true
  }

  export type FicherJointMinAggregateInputType = {
    id_ficher?: true
    url?: true
    nom?: true
    id_tache?: true
  }

  export type FicherJointMaxAggregateInputType = {
    id_ficher?: true
    url?: true
    nom?: true
    id_tache?: true
  }

  export type FicherJointCountAggregateInputType = {
    id_ficher?: true
    url?: true
    nom?: true
    id_tache?: true
    _all?: true
  }

  export type FicherJointAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FicherJoint to aggregate.
     */
    where?: FicherJointWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FicherJoints to fetch.
     */
    orderBy?: FicherJointOrderByWithRelationInput | FicherJointOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FicherJointWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FicherJoints from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FicherJoints.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned FicherJoints
    **/
    _count?: true | FicherJointCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FicherJointAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FicherJointSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FicherJointMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FicherJointMaxAggregateInputType
  }

  export type GetFicherJointAggregateType<T extends FicherJointAggregateArgs> = {
        [P in keyof T & keyof AggregateFicherJoint]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFicherJoint[P]>
      : GetScalarType<T[P], AggregateFicherJoint[P]>
  }




  export type FicherJointGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FicherJointWhereInput
    orderBy?: FicherJointOrderByWithAggregationInput | FicherJointOrderByWithAggregationInput[]
    by: FicherJointScalarFieldEnum[] | FicherJointScalarFieldEnum
    having?: FicherJointScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FicherJointCountAggregateInputType | true
    _avg?: FicherJointAvgAggregateInputType
    _sum?: FicherJointSumAggregateInputType
    _min?: FicherJointMinAggregateInputType
    _max?: FicherJointMaxAggregateInputType
  }

  export type FicherJointGroupByOutputType = {
    id_ficher: number
    url: string
    nom: string
    id_tache: number
    _count: FicherJointCountAggregateOutputType | null
    _avg: FicherJointAvgAggregateOutputType | null
    _sum: FicherJointSumAggregateOutputType | null
    _min: FicherJointMinAggregateOutputType | null
    _max: FicherJointMaxAggregateOutputType | null
  }

  type GetFicherJointGroupByPayload<T extends FicherJointGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FicherJointGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FicherJointGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FicherJointGroupByOutputType[P]>
            : GetScalarType<T[P], FicherJointGroupByOutputType[P]>
        }
      >
    >


  export type FicherJointSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_ficher?: boolean
    url?: boolean
    nom?: boolean
    id_tache?: boolean
    tache?: boolean | TacheDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["ficherJoint"]>

  export type FicherJointSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_ficher?: boolean
    url?: boolean
    nom?: boolean
    id_tache?: boolean
    tache?: boolean | TacheDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["ficherJoint"]>

  export type FicherJointSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_ficher?: boolean
    url?: boolean
    nom?: boolean
    id_tache?: boolean
    tache?: boolean | TacheDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["ficherJoint"]>

  export type FicherJointSelectScalar = {
    id_ficher?: boolean
    url?: boolean
    nom?: boolean
    id_tache?: boolean
  }

  export type FicherJointOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id_ficher" | "url" | "nom" | "id_tache", ExtArgs["result"]["ficherJoint"]>
  export type FicherJointInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tache?: boolean | TacheDefaultArgs<ExtArgs>
  }
  export type FicherJointIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tache?: boolean | TacheDefaultArgs<ExtArgs>
  }
  export type FicherJointIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tache?: boolean | TacheDefaultArgs<ExtArgs>
  }

  export type $FicherJointPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "FicherJoint"
    objects: {
      tache: Prisma.$TachePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id_ficher: number
      url: string
      nom: string
      id_tache: number
    }, ExtArgs["result"]["ficherJoint"]>
    composites: {}
  }

  type FicherJointGetPayload<S extends boolean | null | undefined | FicherJointDefaultArgs> = $Result.GetResult<Prisma.$FicherJointPayload, S>

  type FicherJointCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FicherJointFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FicherJointCountAggregateInputType | true
    }

  export interface FicherJointDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['FicherJoint'], meta: { name: 'FicherJoint' } }
    /**
     * Find zero or one FicherJoint that matches the filter.
     * @param {FicherJointFindUniqueArgs} args - Arguments to find a FicherJoint
     * @example
     * // Get one FicherJoint
     * const ficherJoint = await prisma.ficherJoint.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FicherJointFindUniqueArgs>(args: SelectSubset<T, FicherJointFindUniqueArgs<ExtArgs>>): Prisma__FicherJointClient<$Result.GetResult<Prisma.$FicherJointPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one FicherJoint that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FicherJointFindUniqueOrThrowArgs} args - Arguments to find a FicherJoint
     * @example
     * // Get one FicherJoint
     * const ficherJoint = await prisma.ficherJoint.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FicherJointFindUniqueOrThrowArgs>(args: SelectSubset<T, FicherJointFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FicherJointClient<$Result.GetResult<Prisma.$FicherJointPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FicherJoint that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FicherJointFindFirstArgs} args - Arguments to find a FicherJoint
     * @example
     * // Get one FicherJoint
     * const ficherJoint = await prisma.ficherJoint.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FicherJointFindFirstArgs>(args?: SelectSubset<T, FicherJointFindFirstArgs<ExtArgs>>): Prisma__FicherJointClient<$Result.GetResult<Prisma.$FicherJointPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FicherJoint that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FicherJointFindFirstOrThrowArgs} args - Arguments to find a FicherJoint
     * @example
     * // Get one FicherJoint
     * const ficherJoint = await prisma.ficherJoint.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FicherJointFindFirstOrThrowArgs>(args?: SelectSubset<T, FicherJointFindFirstOrThrowArgs<ExtArgs>>): Prisma__FicherJointClient<$Result.GetResult<Prisma.$FicherJointPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more FicherJoints that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FicherJointFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FicherJoints
     * const ficherJoints = await prisma.ficherJoint.findMany()
     * 
     * // Get first 10 FicherJoints
     * const ficherJoints = await prisma.ficherJoint.findMany({ take: 10 })
     * 
     * // Only select the `id_ficher`
     * const ficherJointWithId_ficherOnly = await prisma.ficherJoint.findMany({ select: { id_ficher: true } })
     * 
     */
    findMany<T extends FicherJointFindManyArgs>(args?: SelectSubset<T, FicherJointFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FicherJointPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a FicherJoint.
     * @param {FicherJointCreateArgs} args - Arguments to create a FicherJoint.
     * @example
     * // Create one FicherJoint
     * const FicherJoint = await prisma.ficherJoint.create({
     *   data: {
     *     // ... data to create a FicherJoint
     *   }
     * })
     * 
     */
    create<T extends FicherJointCreateArgs>(args: SelectSubset<T, FicherJointCreateArgs<ExtArgs>>): Prisma__FicherJointClient<$Result.GetResult<Prisma.$FicherJointPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many FicherJoints.
     * @param {FicherJointCreateManyArgs} args - Arguments to create many FicherJoints.
     * @example
     * // Create many FicherJoints
     * const ficherJoint = await prisma.ficherJoint.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FicherJointCreateManyArgs>(args?: SelectSubset<T, FicherJointCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many FicherJoints and returns the data saved in the database.
     * @param {FicherJointCreateManyAndReturnArgs} args - Arguments to create many FicherJoints.
     * @example
     * // Create many FicherJoints
     * const ficherJoint = await prisma.ficherJoint.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many FicherJoints and only return the `id_ficher`
     * const ficherJointWithId_ficherOnly = await prisma.ficherJoint.createManyAndReturn({
     *   select: { id_ficher: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FicherJointCreateManyAndReturnArgs>(args?: SelectSubset<T, FicherJointCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FicherJointPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a FicherJoint.
     * @param {FicherJointDeleteArgs} args - Arguments to delete one FicherJoint.
     * @example
     * // Delete one FicherJoint
     * const FicherJoint = await prisma.ficherJoint.delete({
     *   where: {
     *     // ... filter to delete one FicherJoint
     *   }
     * })
     * 
     */
    delete<T extends FicherJointDeleteArgs>(args: SelectSubset<T, FicherJointDeleteArgs<ExtArgs>>): Prisma__FicherJointClient<$Result.GetResult<Prisma.$FicherJointPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one FicherJoint.
     * @param {FicherJointUpdateArgs} args - Arguments to update one FicherJoint.
     * @example
     * // Update one FicherJoint
     * const ficherJoint = await prisma.ficherJoint.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FicherJointUpdateArgs>(args: SelectSubset<T, FicherJointUpdateArgs<ExtArgs>>): Prisma__FicherJointClient<$Result.GetResult<Prisma.$FicherJointPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more FicherJoints.
     * @param {FicherJointDeleteManyArgs} args - Arguments to filter FicherJoints to delete.
     * @example
     * // Delete a few FicherJoints
     * const { count } = await prisma.ficherJoint.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FicherJointDeleteManyArgs>(args?: SelectSubset<T, FicherJointDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FicherJoints.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FicherJointUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FicherJoints
     * const ficherJoint = await prisma.ficherJoint.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FicherJointUpdateManyArgs>(args: SelectSubset<T, FicherJointUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FicherJoints and returns the data updated in the database.
     * @param {FicherJointUpdateManyAndReturnArgs} args - Arguments to update many FicherJoints.
     * @example
     * // Update many FicherJoints
     * const ficherJoint = await prisma.ficherJoint.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more FicherJoints and only return the `id_ficher`
     * const ficherJointWithId_ficherOnly = await prisma.ficherJoint.updateManyAndReturn({
     *   select: { id_ficher: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends FicherJointUpdateManyAndReturnArgs>(args: SelectSubset<T, FicherJointUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FicherJointPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one FicherJoint.
     * @param {FicherJointUpsertArgs} args - Arguments to update or create a FicherJoint.
     * @example
     * // Update or create a FicherJoint
     * const ficherJoint = await prisma.ficherJoint.upsert({
     *   create: {
     *     // ... data to create a FicherJoint
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FicherJoint we want to update
     *   }
     * })
     */
    upsert<T extends FicherJointUpsertArgs>(args: SelectSubset<T, FicherJointUpsertArgs<ExtArgs>>): Prisma__FicherJointClient<$Result.GetResult<Prisma.$FicherJointPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of FicherJoints.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FicherJointCountArgs} args - Arguments to filter FicherJoints to count.
     * @example
     * // Count the number of FicherJoints
     * const count = await prisma.ficherJoint.count({
     *   where: {
     *     // ... the filter for the FicherJoints we want to count
     *   }
     * })
    **/
    count<T extends FicherJointCountArgs>(
      args?: Subset<T, FicherJointCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FicherJointCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a FicherJoint.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FicherJointAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FicherJointAggregateArgs>(args: Subset<T, FicherJointAggregateArgs>): Prisma.PrismaPromise<GetFicherJointAggregateType<T>>

    /**
     * Group by FicherJoint.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FicherJointGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FicherJointGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FicherJointGroupByArgs['orderBy'] }
        : { orderBy?: FicherJointGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FicherJointGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFicherJointGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the FicherJoint model
   */
  readonly fields: FicherJointFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for FicherJoint.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FicherJointClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    tache<T extends TacheDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TacheDefaultArgs<ExtArgs>>): Prisma__TacheClient<$Result.GetResult<Prisma.$TachePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the FicherJoint model
   */
  interface FicherJointFieldRefs {
    readonly id_ficher: FieldRef<"FicherJoint", 'Int'>
    readonly url: FieldRef<"FicherJoint", 'String'>
    readonly nom: FieldRef<"FicherJoint", 'String'>
    readonly id_tache: FieldRef<"FicherJoint", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * FicherJoint findUnique
   */
  export type FicherJointFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FicherJoint
     */
    select?: FicherJointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FicherJoint
     */
    omit?: FicherJointOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FicherJointInclude<ExtArgs> | null
    /**
     * Filter, which FicherJoint to fetch.
     */
    where: FicherJointWhereUniqueInput
  }

  /**
   * FicherJoint findUniqueOrThrow
   */
  export type FicherJointFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FicherJoint
     */
    select?: FicherJointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FicherJoint
     */
    omit?: FicherJointOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FicherJointInclude<ExtArgs> | null
    /**
     * Filter, which FicherJoint to fetch.
     */
    where: FicherJointWhereUniqueInput
  }

  /**
   * FicherJoint findFirst
   */
  export type FicherJointFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FicherJoint
     */
    select?: FicherJointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FicherJoint
     */
    omit?: FicherJointOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FicherJointInclude<ExtArgs> | null
    /**
     * Filter, which FicherJoint to fetch.
     */
    where?: FicherJointWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FicherJoints to fetch.
     */
    orderBy?: FicherJointOrderByWithRelationInput | FicherJointOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FicherJoints.
     */
    cursor?: FicherJointWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FicherJoints from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FicherJoints.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FicherJoints.
     */
    distinct?: FicherJointScalarFieldEnum | FicherJointScalarFieldEnum[]
  }

  /**
   * FicherJoint findFirstOrThrow
   */
  export type FicherJointFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FicherJoint
     */
    select?: FicherJointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FicherJoint
     */
    omit?: FicherJointOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FicherJointInclude<ExtArgs> | null
    /**
     * Filter, which FicherJoint to fetch.
     */
    where?: FicherJointWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FicherJoints to fetch.
     */
    orderBy?: FicherJointOrderByWithRelationInput | FicherJointOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FicherJoints.
     */
    cursor?: FicherJointWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FicherJoints from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FicherJoints.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FicherJoints.
     */
    distinct?: FicherJointScalarFieldEnum | FicherJointScalarFieldEnum[]
  }

  /**
   * FicherJoint findMany
   */
  export type FicherJointFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FicherJoint
     */
    select?: FicherJointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FicherJoint
     */
    omit?: FicherJointOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FicherJointInclude<ExtArgs> | null
    /**
     * Filter, which FicherJoints to fetch.
     */
    where?: FicherJointWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FicherJoints to fetch.
     */
    orderBy?: FicherJointOrderByWithRelationInput | FicherJointOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing FicherJoints.
     */
    cursor?: FicherJointWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FicherJoints from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FicherJoints.
     */
    skip?: number
    distinct?: FicherJointScalarFieldEnum | FicherJointScalarFieldEnum[]
  }

  /**
   * FicherJoint create
   */
  export type FicherJointCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FicherJoint
     */
    select?: FicherJointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FicherJoint
     */
    omit?: FicherJointOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FicherJointInclude<ExtArgs> | null
    /**
     * The data needed to create a FicherJoint.
     */
    data: XOR<FicherJointCreateInput, FicherJointUncheckedCreateInput>
  }

  /**
   * FicherJoint createMany
   */
  export type FicherJointCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many FicherJoints.
     */
    data: FicherJointCreateManyInput | FicherJointCreateManyInput[]
  }

  /**
   * FicherJoint createManyAndReturn
   */
  export type FicherJointCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FicherJoint
     */
    select?: FicherJointSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FicherJoint
     */
    omit?: FicherJointOmit<ExtArgs> | null
    /**
     * The data used to create many FicherJoints.
     */
    data: FicherJointCreateManyInput | FicherJointCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FicherJointIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * FicherJoint update
   */
  export type FicherJointUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FicherJoint
     */
    select?: FicherJointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FicherJoint
     */
    omit?: FicherJointOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FicherJointInclude<ExtArgs> | null
    /**
     * The data needed to update a FicherJoint.
     */
    data: XOR<FicherJointUpdateInput, FicherJointUncheckedUpdateInput>
    /**
     * Choose, which FicherJoint to update.
     */
    where: FicherJointWhereUniqueInput
  }

  /**
   * FicherJoint updateMany
   */
  export type FicherJointUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update FicherJoints.
     */
    data: XOR<FicherJointUpdateManyMutationInput, FicherJointUncheckedUpdateManyInput>
    /**
     * Filter which FicherJoints to update
     */
    where?: FicherJointWhereInput
    /**
     * Limit how many FicherJoints to update.
     */
    limit?: number
  }

  /**
   * FicherJoint updateManyAndReturn
   */
  export type FicherJointUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FicherJoint
     */
    select?: FicherJointSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FicherJoint
     */
    omit?: FicherJointOmit<ExtArgs> | null
    /**
     * The data used to update FicherJoints.
     */
    data: XOR<FicherJointUpdateManyMutationInput, FicherJointUncheckedUpdateManyInput>
    /**
     * Filter which FicherJoints to update
     */
    where?: FicherJointWhereInput
    /**
     * Limit how many FicherJoints to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FicherJointIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * FicherJoint upsert
   */
  export type FicherJointUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FicherJoint
     */
    select?: FicherJointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FicherJoint
     */
    omit?: FicherJointOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FicherJointInclude<ExtArgs> | null
    /**
     * The filter to search for the FicherJoint to update in case it exists.
     */
    where: FicherJointWhereUniqueInput
    /**
     * In case the FicherJoint found by the `where` argument doesn't exist, create a new FicherJoint with this data.
     */
    create: XOR<FicherJointCreateInput, FicherJointUncheckedCreateInput>
    /**
     * In case the FicherJoint was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FicherJointUpdateInput, FicherJointUncheckedUpdateInput>
  }

  /**
   * FicherJoint delete
   */
  export type FicherJointDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FicherJoint
     */
    select?: FicherJointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FicherJoint
     */
    omit?: FicherJointOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FicherJointInclude<ExtArgs> | null
    /**
     * Filter which FicherJoint to delete.
     */
    where: FicherJointWhereUniqueInput
  }

  /**
   * FicherJoint deleteMany
   */
  export type FicherJointDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FicherJoints to delete
     */
    where?: FicherJointWhereInput
    /**
     * Limit how many FicherJoints to delete.
     */
    limit?: number
  }

  /**
   * FicherJoint without action
   */
  export type FicherJointDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FicherJoint
     */
    select?: FicherJointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FicherJoint
     */
    omit?: FicherJointOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FicherJointInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UtilisateurScalarFieldEnum: {
    id_utilisateur: 'id_utilisateur',
    email: 'email',
    password: 'password'
  };

  export type UtilisateurScalarFieldEnum = (typeof UtilisateurScalarFieldEnum)[keyof typeof UtilisateurScalarFieldEnum]


  export const ProjetScalarFieldEnum: {
    id_projet: 'id_projet',
    nom: 'nom',
    id_utilisateur: 'id_utilisateur'
  };

  export type ProjetScalarFieldEnum = (typeof ProjetScalarFieldEnum)[keyof typeof ProjetScalarFieldEnum]


  export const CategorieScalarFieldEnum: {
    id_categorie: 'id_categorie',
    nom: 'nom',
    id_projet: 'id_projet'
  };

  export type CategorieScalarFieldEnum = (typeof CategorieScalarFieldEnum)[keyof typeof CategorieScalarFieldEnum]


  export const TacheScalarFieldEnum: {
    id_tache: 'id_tache',
    titre: 'titre',
    description: 'description',
    date_limite: 'date_limite',
    priorite: 'priorite',
    status: 'status',
    id_categorie: 'id_categorie',
    id_utilisateur: 'id_utilisateur',
    id_projet: 'id_projet'
  };

  export type TacheScalarFieldEnum = (typeof TacheScalarFieldEnum)[keyof typeof TacheScalarFieldEnum]


  export const FicherJointScalarFieldEnum: {
    id_ficher: 'id_ficher',
    url: 'url',
    nom: 'nom',
    id_tache: 'id_tache'
  };

  export type FicherJointScalarFieldEnum = (typeof FicherJointScalarFieldEnum)[keyof typeof FicherJointScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Priorite'
   */
  export type EnumPrioriteFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Priorite'>
    


  /**
   * Reference to a field of type 'Status'
   */
  export type EnumStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Status'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type UtilisateurWhereInput = {
    AND?: UtilisateurWhereInput | UtilisateurWhereInput[]
    OR?: UtilisateurWhereInput[]
    NOT?: UtilisateurWhereInput | UtilisateurWhereInput[]
    id_utilisateur?: IntFilter<"Utilisateur"> | number
    email?: StringFilter<"Utilisateur"> | string
    password?: StringFilter<"Utilisateur"> | string
    projet?: ProjetListRelationFilter
    taches?: TacheListRelationFilter
  }

  export type UtilisateurOrderByWithRelationInput = {
    id_utilisateur?: SortOrder
    email?: SortOrder
    password?: SortOrder
    projet?: ProjetOrderByRelationAggregateInput
    taches?: TacheOrderByRelationAggregateInput
  }

  export type UtilisateurWhereUniqueInput = Prisma.AtLeast<{
    id_utilisateur?: number
    email?: string
    AND?: UtilisateurWhereInput | UtilisateurWhereInput[]
    OR?: UtilisateurWhereInput[]
    NOT?: UtilisateurWhereInput | UtilisateurWhereInput[]
    password?: StringFilter<"Utilisateur"> | string
    projet?: ProjetListRelationFilter
    taches?: TacheListRelationFilter
  }, "id_utilisateur" | "email">

  export type UtilisateurOrderByWithAggregationInput = {
    id_utilisateur?: SortOrder
    email?: SortOrder
    password?: SortOrder
    _count?: UtilisateurCountOrderByAggregateInput
    _avg?: UtilisateurAvgOrderByAggregateInput
    _max?: UtilisateurMaxOrderByAggregateInput
    _min?: UtilisateurMinOrderByAggregateInput
    _sum?: UtilisateurSumOrderByAggregateInput
  }

  export type UtilisateurScalarWhereWithAggregatesInput = {
    AND?: UtilisateurScalarWhereWithAggregatesInput | UtilisateurScalarWhereWithAggregatesInput[]
    OR?: UtilisateurScalarWhereWithAggregatesInput[]
    NOT?: UtilisateurScalarWhereWithAggregatesInput | UtilisateurScalarWhereWithAggregatesInput[]
    id_utilisateur?: IntWithAggregatesFilter<"Utilisateur"> | number
    email?: StringWithAggregatesFilter<"Utilisateur"> | string
    password?: StringWithAggregatesFilter<"Utilisateur"> | string
  }

  export type ProjetWhereInput = {
    AND?: ProjetWhereInput | ProjetWhereInput[]
    OR?: ProjetWhereInput[]
    NOT?: ProjetWhereInput | ProjetWhereInput[]
    id_projet?: IntFilter<"Projet"> | number
    nom?: StringFilter<"Projet"> | string
    id_utilisateur?: IntFilter<"Projet"> | number
    utilisateur?: XOR<UtilisateurScalarRelationFilter, UtilisateurWhereInput>
    categories?: CategorieListRelationFilter
    taches?: TacheListRelationFilter
  }

  export type ProjetOrderByWithRelationInput = {
    id_projet?: SortOrder
    nom?: SortOrder
    id_utilisateur?: SortOrder
    utilisateur?: UtilisateurOrderByWithRelationInput
    categories?: CategorieOrderByRelationAggregateInput
    taches?: TacheOrderByRelationAggregateInput
  }

  export type ProjetWhereUniqueInput = Prisma.AtLeast<{
    id_projet?: number
    AND?: ProjetWhereInput | ProjetWhereInput[]
    OR?: ProjetWhereInput[]
    NOT?: ProjetWhereInput | ProjetWhereInput[]
    nom?: StringFilter<"Projet"> | string
    id_utilisateur?: IntFilter<"Projet"> | number
    utilisateur?: XOR<UtilisateurScalarRelationFilter, UtilisateurWhereInput>
    categories?: CategorieListRelationFilter
    taches?: TacheListRelationFilter
  }, "id_projet">

  export type ProjetOrderByWithAggregationInput = {
    id_projet?: SortOrder
    nom?: SortOrder
    id_utilisateur?: SortOrder
    _count?: ProjetCountOrderByAggregateInput
    _avg?: ProjetAvgOrderByAggregateInput
    _max?: ProjetMaxOrderByAggregateInput
    _min?: ProjetMinOrderByAggregateInput
    _sum?: ProjetSumOrderByAggregateInput
  }

  export type ProjetScalarWhereWithAggregatesInput = {
    AND?: ProjetScalarWhereWithAggregatesInput | ProjetScalarWhereWithAggregatesInput[]
    OR?: ProjetScalarWhereWithAggregatesInput[]
    NOT?: ProjetScalarWhereWithAggregatesInput | ProjetScalarWhereWithAggregatesInput[]
    id_projet?: IntWithAggregatesFilter<"Projet"> | number
    nom?: StringWithAggregatesFilter<"Projet"> | string
    id_utilisateur?: IntWithAggregatesFilter<"Projet"> | number
  }

  export type CategorieWhereInput = {
    AND?: CategorieWhereInput | CategorieWhereInput[]
    OR?: CategorieWhereInput[]
    NOT?: CategorieWhereInput | CategorieWhereInput[]
    id_categorie?: IntFilter<"Categorie"> | number
    nom?: StringFilter<"Categorie"> | string
    id_projet?: IntFilter<"Categorie"> | number
    projet?: XOR<ProjetScalarRelationFilter, ProjetWhereInput>
    taches?: TacheListRelationFilter
  }

  export type CategorieOrderByWithRelationInput = {
    id_categorie?: SortOrder
    nom?: SortOrder
    id_projet?: SortOrder
    projet?: ProjetOrderByWithRelationInput
    taches?: TacheOrderByRelationAggregateInput
  }

  export type CategorieWhereUniqueInput = Prisma.AtLeast<{
    id_categorie?: number
    AND?: CategorieWhereInput | CategorieWhereInput[]
    OR?: CategorieWhereInput[]
    NOT?: CategorieWhereInput | CategorieWhereInput[]
    nom?: StringFilter<"Categorie"> | string
    id_projet?: IntFilter<"Categorie"> | number
    projet?: XOR<ProjetScalarRelationFilter, ProjetWhereInput>
    taches?: TacheListRelationFilter
  }, "id_categorie">

  export type CategorieOrderByWithAggregationInput = {
    id_categorie?: SortOrder
    nom?: SortOrder
    id_projet?: SortOrder
    _count?: CategorieCountOrderByAggregateInput
    _avg?: CategorieAvgOrderByAggregateInput
    _max?: CategorieMaxOrderByAggregateInput
    _min?: CategorieMinOrderByAggregateInput
    _sum?: CategorieSumOrderByAggregateInput
  }

  export type CategorieScalarWhereWithAggregatesInput = {
    AND?: CategorieScalarWhereWithAggregatesInput | CategorieScalarWhereWithAggregatesInput[]
    OR?: CategorieScalarWhereWithAggregatesInput[]
    NOT?: CategorieScalarWhereWithAggregatesInput | CategorieScalarWhereWithAggregatesInput[]
    id_categorie?: IntWithAggregatesFilter<"Categorie"> | number
    nom?: StringWithAggregatesFilter<"Categorie"> | string
    id_projet?: IntWithAggregatesFilter<"Categorie"> | number
  }

  export type TacheWhereInput = {
    AND?: TacheWhereInput | TacheWhereInput[]
    OR?: TacheWhereInput[]
    NOT?: TacheWhereInput | TacheWhereInput[]
    id_tache?: IntFilter<"Tache"> | number
    titre?: StringFilter<"Tache"> | string
    description?: StringNullableFilter<"Tache"> | string | null
    date_limite?: DateTimeNullableFilter<"Tache"> | Date | string | null
    priorite?: EnumPrioriteFilter<"Tache"> | $Enums.Priorite
    status?: EnumStatusFilter<"Tache"> | $Enums.Status
    id_categorie?: IntNullableFilter<"Tache"> | number | null
    id_utilisateur?: IntFilter<"Tache"> | number
    id_projet?: IntFilter<"Tache"> | number
    categorie?: XOR<CategorieNullableScalarRelationFilter, CategorieWhereInput> | null
    utilisateur?: XOR<UtilisateurScalarRelationFilter, UtilisateurWhereInput>
    fichiers_joints?: FicherJointListRelationFilter
    projet?: XOR<ProjetScalarRelationFilter, ProjetWhereInput>
  }

  export type TacheOrderByWithRelationInput = {
    id_tache?: SortOrder
    titre?: SortOrder
    description?: SortOrderInput | SortOrder
    date_limite?: SortOrderInput | SortOrder
    priorite?: SortOrder
    status?: SortOrder
    id_categorie?: SortOrderInput | SortOrder
    id_utilisateur?: SortOrder
    id_projet?: SortOrder
    categorie?: CategorieOrderByWithRelationInput
    utilisateur?: UtilisateurOrderByWithRelationInput
    fichiers_joints?: FicherJointOrderByRelationAggregateInput
    projet?: ProjetOrderByWithRelationInput
  }

  export type TacheWhereUniqueInput = Prisma.AtLeast<{
    id_tache?: number
    AND?: TacheWhereInput | TacheWhereInput[]
    OR?: TacheWhereInput[]
    NOT?: TacheWhereInput | TacheWhereInput[]
    titre?: StringFilter<"Tache"> | string
    description?: StringNullableFilter<"Tache"> | string | null
    date_limite?: DateTimeNullableFilter<"Tache"> | Date | string | null
    priorite?: EnumPrioriteFilter<"Tache"> | $Enums.Priorite
    status?: EnumStatusFilter<"Tache"> | $Enums.Status
    id_categorie?: IntNullableFilter<"Tache"> | number | null
    id_utilisateur?: IntFilter<"Tache"> | number
    id_projet?: IntFilter<"Tache"> | number
    categorie?: XOR<CategorieNullableScalarRelationFilter, CategorieWhereInput> | null
    utilisateur?: XOR<UtilisateurScalarRelationFilter, UtilisateurWhereInput>
    fichiers_joints?: FicherJointListRelationFilter
    projet?: XOR<ProjetScalarRelationFilter, ProjetWhereInput>
  }, "id_tache">

  export type TacheOrderByWithAggregationInput = {
    id_tache?: SortOrder
    titre?: SortOrder
    description?: SortOrderInput | SortOrder
    date_limite?: SortOrderInput | SortOrder
    priorite?: SortOrder
    status?: SortOrder
    id_categorie?: SortOrderInput | SortOrder
    id_utilisateur?: SortOrder
    id_projet?: SortOrder
    _count?: TacheCountOrderByAggregateInput
    _avg?: TacheAvgOrderByAggregateInput
    _max?: TacheMaxOrderByAggregateInput
    _min?: TacheMinOrderByAggregateInput
    _sum?: TacheSumOrderByAggregateInput
  }

  export type TacheScalarWhereWithAggregatesInput = {
    AND?: TacheScalarWhereWithAggregatesInput | TacheScalarWhereWithAggregatesInput[]
    OR?: TacheScalarWhereWithAggregatesInput[]
    NOT?: TacheScalarWhereWithAggregatesInput | TacheScalarWhereWithAggregatesInput[]
    id_tache?: IntWithAggregatesFilter<"Tache"> | number
    titre?: StringWithAggregatesFilter<"Tache"> | string
    description?: StringNullableWithAggregatesFilter<"Tache"> | string | null
    date_limite?: DateTimeNullableWithAggregatesFilter<"Tache"> | Date | string | null
    priorite?: EnumPrioriteWithAggregatesFilter<"Tache"> | $Enums.Priorite
    status?: EnumStatusWithAggregatesFilter<"Tache"> | $Enums.Status
    id_categorie?: IntNullableWithAggregatesFilter<"Tache"> | number | null
    id_utilisateur?: IntWithAggregatesFilter<"Tache"> | number
    id_projet?: IntWithAggregatesFilter<"Tache"> | number
  }

  export type FicherJointWhereInput = {
    AND?: FicherJointWhereInput | FicherJointWhereInput[]
    OR?: FicherJointWhereInput[]
    NOT?: FicherJointWhereInput | FicherJointWhereInput[]
    id_ficher?: IntFilter<"FicherJoint"> | number
    url?: StringFilter<"FicherJoint"> | string
    nom?: StringFilter<"FicherJoint"> | string
    id_tache?: IntFilter<"FicherJoint"> | number
    tache?: XOR<TacheScalarRelationFilter, TacheWhereInput>
  }

  export type FicherJointOrderByWithRelationInput = {
    id_ficher?: SortOrder
    url?: SortOrder
    nom?: SortOrder
    id_tache?: SortOrder
    tache?: TacheOrderByWithRelationInput
  }

  export type FicherJointWhereUniqueInput = Prisma.AtLeast<{
    id_ficher?: number
    AND?: FicherJointWhereInput | FicherJointWhereInput[]
    OR?: FicherJointWhereInput[]
    NOT?: FicherJointWhereInput | FicherJointWhereInput[]
    url?: StringFilter<"FicherJoint"> | string
    nom?: StringFilter<"FicherJoint"> | string
    id_tache?: IntFilter<"FicherJoint"> | number
    tache?: XOR<TacheScalarRelationFilter, TacheWhereInput>
  }, "id_ficher">

  export type FicherJointOrderByWithAggregationInput = {
    id_ficher?: SortOrder
    url?: SortOrder
    nom?: SortOrder
    id_tache?: SortOrder
    _count?: FicherJointCountOrderByAggregateInput
    _avg?: FicherJointAvgOrderByAggregateInput
    _max?: FicherJointMaxOrderByAggregateInput
    _min?: FicherJointMinOrderByAggregateInput
    _sum?: FicherJointSumOrderByAggregateInput
  }

  export type FicherJointScalarWhereWithAggregatesInput = {
    AND?: FicherJointScalarWhereWithAggregatesInput | FicherJointScalarWhereWithAggregatesInput[]
    OR?: FicherJointScalarWhereWithAggregatesInput[]
    NOT?: FicherJointScalarWhereWithAggregatesInput | FicherJointScalarWhereWithAggregatesInput[]
    id_ficher?: IntWithAggregatesFilter<"FicherJoint"> | number
    url?: StringWithAggregatesFilter<"FicherJoint"> | string
    nom?: StringWithAggregatesFilter<"FicherJoint"> | string
    id_tache?: IntWithAggregatesFilter<"FicherJoint"> | number
  }

  export type UtilisateurCreateInput = {
    email: string
    password: string
    projet?: ProjetCreateNestedManyWithoutUtilisateurInput
    taches?: TacheCreateNestedManyWithoutUtilisateurInput
  }

  export type UtilisateurUncheckedCreateInput = {
    id_utilisateur?: number
    email: string
    password: string
    projet?: ProjetUncheckedCreateNestedManyWithoutUtilisateurInput
    taches?: TacheUncheckedCreateNestedManyWithoutUtilisateurInput
  }

  export type UtilisateurUpdateInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    projet?: ProjetUpdateManyWithoutUtilisateurNestedInput
    taches?: TacheUpdateManyWithoutUtilisateurNestedInput
  }

  export type UtilisateurUncheckedUpdateInput = {
    id_utilisateur?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    projet?: ProjetUncheckedUpdateManyWithoutUtilisateurNestedInput
    taches?: TacheUncheckedUpdateManyWithoutUtilisateurNestedInput
  }

  export type UtilisateurCreateManyInput = {
    id_utilisateur?: number
    email: string
    password: string
  }

  export type UtilisateurUpdateManyMutationInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
  }

  export type UtilisateurUncheckedUpdateManyInput = {
    id_utilisateur?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
  }

  export type ProjetCreateInput = {
    nom: string
    utilisateur: UtilisateurCreateNestedOneWithoutProjetInput
    categories?: CategorieCreateNestedManyWithoutProjetInput
    taches?: TacheCreateNestedManyWithoutProjetInput
  }

  export type ProjetUncheckedCreateInput = {
    id_projet?: number
    nom: string
    id_utilisateur: number
    categories?: CategorieUncheckedCreateNestedManyWithoutProjetInput
    taches?: TacheUncheckedCreateNestedManyWithoutProjetInput
  }

  export type ProjetUpdateInput = {
    nom?: StringFieldUpdateOperationsInput | string
    utilisateur?: UtilisateurUpdateOneRequiredWithoutProjetNestedInput
    categories?: CategorieUpdateManyWithoutProjetNestedInput
    taches?: TacheUpdateManyWithoutProjetNestedInput
  }

  export type ProjetUncheckedUpdateInput = {
    id_projet?: IntFieldUpdateOperationsInput | number
    nom?: StringFieldUpdateOperationsInput | string
    id_utilisateur?: IntFieldUpdateOperationsInput | number
    categories?: CategorieUncheckedUpdateManyWithoutProjetNestedInput
    taches?: TacheUncheckedUpdateManyWithoutProjetNestedInput
  }

  export type ProjetCreateManyInput = {
    id_projet?: number
    nom: string
    id_utilisateur: number
  }

  export type ProjetUpdateManyMutationInput = {
    nom?: StringFieldUpdateOperationsInput | string
  }

  export type ProjetUncheckedUpdateManyInput = {
    id_projet?: IntFieldUpdateOperationsInput | number
    nom?: StringFieldUpdateOperationsInput | string
    id_utilisateur?: IntFieldUpdateOperationsInput | number
  }

  export type CategorieCreateInput = {
    nom: string
    projet: ProjetCreateNestedOneWithoutCategoriesInput
    taches?: TacheCreateNestedManyWithoutCategorieInput
  }

  export type CategorieUncheckedCreateInput = {
    id_categorie?: number
    nom: string
    id_projet: number
    taches?: TacheUncheckedCreateNestedManyWithoutCategorieInput
  }

  export type CategorieUpdateInput = {
    nom?: StringFieldUpdateOperationsInput | string
    projet?: ProjetUpdateOneRequiredWithoutCategoriesNestedInput
    taches?: TacheUpdateManyWithoutCategorieNestedInput
  }

  export type CategorieUncheckedUpdateInput = {
    id_categorie?: IntFieldUpdateOperationsInput | number
    nom?: StringFieldUpdateOperationsInput | string
    id_projet?: IntFieldUpdateOperationsInput | number
    taches?: TacheUncheckedUpdateManyWithoutCategorieNestedInput
  }

  export type CategorieCreateManyInput = {
    id_categorie?: number
    nom: string
    id_projet: number
  }

  export type CategorieUpdateManyMutationInput = {
    nom?: StringFieldUpdateOperationsInput | string
  }

  export type CategorieUncheckedUpdateManyInput = {
    id_categorie?: IntFieldUpdateOperationsInput | number
    nom?: StringFieldUpdateOperationsInput | string
    id_projet?: IntFieldUpdateOperationsInput | number
  }

  export type TacheCreateInput = {
    titre: string
    description?: string | null
    date_limite?: Date | string | null
    priorite: $Enums.Priorite
    status?: $Enums.Status
    categorie?: CategorieCreateNestedOneWithoutTachesInput
    utilisateur: UtilisateurCreateNestedOneWithoutTachesInput
    fichiers_joints?: FicherJointCreateNestedManyWithoutTacheInput
    projet: ProjetCreateNestedOneWithoutTachesInput
  }

  export type TacheUncheckedCreateInput = {
    id_tache?: number
    titre: string
    description?: string | null
    date_limite?: Date | string | null
    priorite: $Enums.Priorite
    status?: $Enums.Status
    id_categorie?: number | null
    id_utilisateur: number
    id_projet: number
    fichiers_joints?: FicherJointUncheckedCreateNestedManyWithoutTacheInput
  }

  export type TacheUpdateInput = {
    titre?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    date_limite?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    priorite?: EnumPrioriteFieldUpdateOperationsInput | $Enums.Priorite
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    categorie?: CategorieUpdateOneWithoutTachesNestedInput
    utilisateur?: UtilisateurUpdateOneRequiredWithoutTachesNestedInput
    fichiers_joints?: FicherJointUpdateManyWithoutTacheNestedInput
    projet?: ProjetUpdateOneRequiredWithoutTachesNestedInput
  }

  export type TacheUncheckedUpdateInput = {
    id_tache?: IntFieldUpdateOperationsInput | number
    titre?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    date_limite?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    priorite?: EnumPrioriteFieldUpdateOperationsInput | $Enums.Priorite
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    id_categorie?: NullableIntFieldUpdateOperationsInput | number | null
    id_utilisateur?: IntFieldUpdateOperationsInput | number
    id_projet?: IntFieldUpdateOperationsInput | number
    fichiers_joints?: FicherJointUncheckedUpdateManyWithoutTacheNestedInput
  }

  export type TacheCreateManyInput = {
    id_tache?: number
    titre: string
    description?: string | null
    date_limite?: Date | string | null
    priorite: $Enums.Priorite
    status?: $Enums.Status
    id_categorie?: number | null
    id_utilisateur: number
    id_projet: number
  }

  export type TacheUpdateManyMutationInput = {
    titre?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    date_limite?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    priorite?: EnumPrioriteFieldUpdateOperationsInput | $Enums.Priorite
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
  }

  export type TacheUncheckedUpdateManyInput = {
    id_tache?: IntFieldUpdateOperationsInput | number
    titre?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    date_limite?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    priorite?: EnumPrioriteFieldUpdateOperationsInput | $Enums.Priorite
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    id_categorie?: NullableIntFieldUpdateOperationsInput | number | null
    id_utilisateur?: IntFieldUpdateOperationsInput | number
    id_projet?: IntFieldUpdateOperationsInput | number
  }

  export type FicherJointCreateInput = {
    url: string
    nom: string
    tache: TacheCreateNestedOneWithoutFichiers_jointsInput
  }

  export type FicherJointUncheckedCreateInput = {
    id_ficher?: number
    url: string
    nom: string
    id_tache: number
  }

  export type FicherJointUpdateInput = {
    url?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    tache?: TacheUpdateOneRequiredWithoutFichiers_jointsNestedInput
  }

  export type FicherJointUncheckedUpdateInput = {
    id_ficher?: IntFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    id_tache?: IntFieldUpdateOperationsInput | number
  }

  export type FicherJointCreateManyInput = {
    id_ficher?: number
    url: string
    nom: string
    id_tache: number
  }

  export type FicherJointUpdateManyMutationInput = {
    url?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
  }

  export type FicherJointUncheckedUpdateManyInput = {
    id_ficher?: IntFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    id_tache?: IntFieldUpdateOperationsInput | number
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type ProjetListRelationFilter = {
    every?: ProjetWhereInput
    some?: ProjetWhereInput
    none?: ProjetWhereInput
  }

  export type TacheListRelationFilter = {
    every?: TacheWhereInput
    some?: TacheWhereInput
    none?: TacheWhereInput
  }

  export type ProjetOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TacheOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UtilisateurCountOrderByAggregateInput = {
    id_utilisateur?: SortOrder
    email?: SortOrder
    password?: SortOrder
  }

  export type UtilisateurAvgOrderByAggregateInput = {
    id_utilisateur?: SortOrder
  }

  export type UtilisateurMaxOrderByAggregateInput = {
    id_utilisateur?: SortOrder
    email?: SortOrder
    password?: SortOrder
  }

  export type UtilisateurMinOrderByAggregateInput = {
    id_utilisateur?: SortOrder
    email?: SortOrder
    password?: SortOrder
  }

  export type UtilisateurSumOrderByAggregateInput = {
    id_utilisateur?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type UtilisateurScalarRelationFilter = {
    is?: UtilisateurWhereInput
    isNot?: UtilisateurWhereInput
  }

  export type CategorieListRelationFilter = {
    every?: CategorieWhereInput
    some?: CategorieWhereInput
    none?: CategorieWhereInput
  }

  export type CategorieOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProjetCountOrderByAggregateInput = {
    id_projet?: SortOrder
    nom?: SortOrder
    id_utilisateur?: SortOrder
  }

  export type ProjetAvgOrderByAggregateInput = {
    id_projet?: SortOrder
    id_utilisateur?: SortOrder
  }

  export type ProjetMaxOrderByAggregateInput = {
    id_projet?: SortOrder
    nom?: SortOrder
    id_utilisateur?: SortOrder
  }

  export type ProjetMinOrderByAggregateInput = {
    id_projet?: SortOrder
    nom?: SortOrder
    id_utilisateur?: SortOrder
  }

  export type ProjetSumOrderByAggregateInput = {
    id_projet?: SortOrder
    id_utilisateur?: SortOrder
  }

  export type ProjetScalarRelationFilter = {
    is?: ProjetWhereInput
    isNot?: ProjetWhereInput
  }

  export type CategorieCountOrderByAggregateInput = {
    id_categorie?: SortOrder
    nom?: SortOrder
    id_projet?: SortOrder
  }

  export type CategorieAvgOrderByAggregateInput = {
    id_categorie?: SortOrder
    id_projet?: SortOrder
  }

  export type CategorieMaxOrderByAggregateInput = {
    id_categorie?: SortOrder
    nom?: SortOrder
    id_projet?: SortOrder
  }

  export type CategorieMinOrderByAggregateInput = {
    id_categorie?: SortOrder
    nom?: SortOrder
    id_projet?: SortOrder
  }

  export type CategorieSumOrderByAggregateInput = {
    id_categorie?: SortOrder
    id_projet?: SortOrder
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type EnumPrioriteFilter<$PrismaModel = never> = {
    equals?: $Enums.Priorite | EnumPrioriteFieldRefInput<$PrismaModel>
    in?: $Enums.Priorite[]
    notIn?: $Enums.Priorite[]
    not?: NestedEnumPrioriteFilter<$PrismaModel> | $Enums.Priorite
  }

  export type EnumStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.Status | EnumStatusFieldRefInput<$PrismaModel>
    in?: $Enums.Status[]
    notIn?: $Enums.Status[]
    not?: NestedEnumStatusFilter<$PrismaModel> | $Enums.Status
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type CategorieNullableScalarRelationFilter = {
    is?: CategorieWhereInput | null
    isNot?: CategorieWhereInput | null
  }

  export type FicherJointListRelationFilter = {
    every?: FicherJointWhereInput
    some?: FicherJointWhereInput
    none?: FicherJointWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type FicherJointOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TacheCountOrderByAggregateInput = {
    id_tache?: SortOrder
    titre?: SortOrder
    description?: SortOrder
    date_limite?: SortOrder
    priorite?: SortOrder
    status?: SortOrder
    id_categorie?: SortOrder
    id_utilisateur?: SortOrder
    id_projet?: SortOrder
  }

  export type TacheAvgOrderByAggregateInput = {
    id_tache?: SortOrder
    id_categorie?: SortOrder
    id_utilisateur?: SortOrder
    id_projet?: SortOrder
  }

  export type TacheMaxOrderByAggregateInput = {
    id_tache?: SortOrder
    titre?: SortOrder
    description?: SortOrder
    date_limite?: SortOrder
    priorite?: SortOrder
    status?: SortOrder
    id_categorie?: SortOrder
    id_utilisateur?: SortOrder
    id_projet?: SortOrder
  }

  export type TacheMinOrderByAggregateInput = {
    id_tache?: SortOrder
    titre?: SortOrder
    description?: SortOrder
    date_limite?: SortOrder
    priorite?: SortOrder
    status?: SortOrder
    id_categorie?: SortOrder
    id_utilisateur?: SortOrder
    id_projet?: SortOrder
  }

  export type TacheSumOrderByAggregateInput = {
    id_tache?: SortOrder
    id_categorie?: SortOrder
    id_utilisateur?: SortOrder
    id_projet?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type EnumPrioriteWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Priorite | EnumPrioriteFieldRefInput<$PrismaModel>
    in?: $Enums.Priorite[]
    notIn?: $Enums.Priorite[]
    not?: NestedEnumPrioriteWithAggregatesFilter<$PrismaModel> | $Enums.Priorite
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPrioriteFilter<$PrismaModel>
    _max?: NestedEnumPrioriteFilter<$PrismaModel>
  }

  export type EnumStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Status | EnumStatusFieldRefInput<$PrismaModel>
    in?: $Enums.Status[]
    notIn?: $Enums.Status[]
    not?: NestedEnumStatusWithAggregatesFilter<$PrismaModel> | $Enums.Status
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStatusFilter<$PrismaModel>
    _max?: NestedEnumStatusFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type TacheScalarRelationFilter = {
    is?: TacheWhereInput
    isNot?: TacheWhereInput
  }

  export type FicherJointCountOrderByAggregateInput = {
    id_ficher?: SortOrder
    url?: SortOrder
    nom?: SortOrder
    id_tache?: SortOrder
  }

  export type FicherJointAvgOrderByAggregateInput = {
    id_ficher?: SortOrder
    id_tache?: SortOrder
  }

  export type FicherJointMaxOrderByAggregateInput = {
    id_ficher?: SortOrder
    url?: SortOrder
    nom?: SortOrder
    id_tache?: SortOrder
  }

  export type FicherJointMinOrderByAggregateInput = {
    id_ficher?: SortOrder
    url?: SortOrder
    nom?: SortOrder
    id_tache?: SortOrder
  }

  export type FicherJointSumOrderByAggregateInput = {
    id_ficher?: SortOrder
    id_tache?: SortOrder
  }

  export type ProjetCreateNestedManyWithoutUtilisateurInput = {
    create?: XOR<ProjetCreateWithoutUtilisateurInput, ProjetUncheckedCreateWithoutUtilisateurInput> | ProjetCreateWithoutUtilisateurInput[] | ProjetUncheckedCreateWithoutUtilisateurInput[]
    connectOrCreate?: ProjetCreateOrConnectWithoutUtilisateurInput | ProjetCreateOrConnectWithoutUtilisateurInput[]
    createMany?: ProjetCreateManyUtilisateurInputEnvelope
    connect?: ProjetWhereUniqueInput | ProjetWhereUniqueInput[]
  }

  export type TacheCreateNestedManyWithoutUtilisateurInput = {
    create?: XOR<TacheCreateWithoutUtilisateurInput, TacheUncheckedCreateWithoutUtilisateurInput> | TacheCreateWithoutUtilisateurInput[] | TacheUncheckedCreateWithoutUtilisateurInput[]
    connectOrCreate?: TacheCreateOrConnectWithoutUtilisateurInput | TacheCreateOrConnectWithoutUtilisateurInput[]
    createMany?: TacheCreateManyUtilisateurInputEnvelope
    connect?: TacheWhereUniqueInput | TacheWhereUniqueInput[]
  }

  export type ProjetUncheckedCreateNestedManyWithoutUtilisateurInput = {
    create?: XOR<ProjetCreateWithoutUtilisateurInput, ProjetUncheckedCreateWithoutUtilisateurInput> | ProjetCreateWithoutUtilisateurInput[] | ProjetUncheckedCreateWithoutUtilisateurInput[]
    connectOrCreate?: ProjetCreateOrConnectWithoutUtilisateurInput | ProjetCreateOrConnectWithoutUtilisateurInput[]
    createMany?: ProjetCreateManyUtilisateurInputEnvelope
    connect?: ProjetWhereUniqueInput | ProjetWhereUniqueInput[]
  }

  export type TacheUncheckedCreateNestedManyWithoutUtilisateurInput = {
    create?: XOR<TacheCreateWithoutUtilisateurInput, TacheUncheckedCreateWithoutUtilisateurInput> | TacheCreateWithoutUtilisateurInput[] | TacheUncheckedCreateWithoutUtilisateurInput[]
    connectOrCreate?: TacheCreateOrConnectWithoutUtilisateurInput | TacheCreateOrConnectWithoutUtilisateurInput[]
    createMany?: TacheCreateManyUtilisateurInputEnvelope
    connect?: TacheWhereUniqueInput | TacheWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type ProjetUpdateManyWithoutUtilisateurNestedInput = {
    create?: XOR<ProjetCreateWithoutUtilisateurInput, ProjetUncheckedCreateWithoutUtilisateurInput> | ProjetCreateWithoutUtilisateurInput[] | ProjetUncheckedCreateWithoutUtilisateurInput[]
    connectOrCreate?: ProjetCreateOrConnectWithoutUtilisateurInput | ProjetCreateOrConnectWithoutUtilisateurInput[]
    upsert?: ProjetUpsertWithWhereUniqueWithoutUtilisateurInput | ProjetUpsertWithWhereUniqueWithoutUtilisateurInput[]
    createMany?: ProjetCreateManyUtilisateurInputEnvelope
    set?: ProjetWhereUniqueInput | ProjetWhereUniqueInput[]
    disconnect?: ProjetWhereUniqueInput | ProjetWhereUniqueInput[]
    delete?: ProjetWhereUniqueInput | ProjetWhereUniqueInput[]
    connect?: ProjetWhereUniqueInput | ProjetWhereUniqueInput[]
    update?: ProjetUpdateWithWhereUniqueWithoutUtilisateurInput | ProjetUpdateWithWhereUniqueWithoutUtilisateurInput[]
    updateMany?: ProjetUpdateManyWithWhereWithoutUtilisateurInput | ProjetUpdateManyWithWhereWithoutUtilisateurInput[]
    deleteMany?: ProjetScalarWhereInput | ProjetScalarWhereInput[]
  }

  export type TacheUpdateManyWithoutUtilisateurNestedInput = {
    create?: XOR<TacheCreateWithoutUtilisateurInput, TacheUncheckedCreateWithoutUtilisateurInput> | TacheCreateWithoutUtilisateurInput[] | TacheUncheckedCreateWithoutUtilisateurInput[]
    connectOrCreate?: TacheCreateOrConnectWithoutUtilisateurInput | TacheCreateOrConnectWithoutUtilisateurInput[]
    upsert?: TacheUpsertWithWhereUniqueWithoutUtilisateurInput | TacheUpsertWithWhereUniqueWithoutUtilisateurInput[]
    createMany?: TacheCreateManyUtilisateurInputEnvelope
    set?: TacheWhereUniqueInput | TacheWhereUniqueInput[]
    disconnect?: TacheWhereUniqueInput | TacheWhereUniqueInput[]
    delete?: TacheWhereUniqueInput | TacheWhereUniqueInput[]
    connect?: TacheWhereUniqueInput | TacheWhereUniqueInput[]
    update?: TacheUpdateWithWhereUniqueWithoutUtilisateurInput | TacheUpdateWithWhereUniqueWithoutUtilisateurInput[]
    updateMany?: TacheUpdateManyWithWhereWithoutUtilisateurInput | TacheUpdateManyWithWhereWithoutUtilisateurInput[]
    deleteMany?: TacheScalarWhereInput | TacheScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ProjetUncheckedUpdateManyWithoutUtilisateurNestedInput = {
    create?: XOR<ProjetCreateWithoutUtilisateurInput, ProjetUncheckedCreateWithoutUtilisateurInput> | ProjetCreateWithoutUtilisateurInput[] | ProjetUncheckedCreateWithoutUtilisateurInput[]
    connectOrCreate?: ProjetCreateOrConnectWithoutUtilisateurInput | ProjetCreateOrConnectWithoutUtilisateurInput[]
    upsert?: ProjetUpsertWithWhereUniqueWithoutUtilisateurInput | ProjetUpsertWithWhereUniqueWithoutUtilisateurInput[]
    createMany?: ProjetCreateManyUtilisateurInputEnvelope
    set?: ProjetWhereUniqueInput | ProjetWhereUniqueInput[]
    disconnect?: ProjetWhereUniqueInput | ProjetWhereUniqueInput[]
    delete?: ProjetWhereUniqueInput | ProjetWhereUniqueInput[]
    connect?: ProjetWhereUniqueInput | ProjetWhereUniqueInput[]
    update?: ProjetUpdateWithWhereUniqueWithoutUtilisateurInput | ProjetUpdateWithWhereUniqueWithoutUtilisateurInput[]
    updateMany?: ProjetUpdateManyWithWhereWithoutUtilisateurInput | ProjetUpdateManyWithWhereWithoutUtilisateurInput[]
    deleteMany?: ProjetScalarWhereInput | ProjetScalarWhereInput[]
  }

  export type TacheUncheckedUpdateManyWithoutUtilisateurNestedInput = {
    create?: XOR<TacheCreateWithoutUtilisateurInput, TacheUncheckedCreateWithoutUtilisateurInput> | TacheCreateWithoutUtilisateurInput[] | TacheUncheckedCreateWithoutUtilisateurInput[]
    connectOrCreate?: TacheCreateOrConnectWithoutUtilisateurInput | TacheCreateOrConnectWithoutUtilisateurInput[]
    upsert?: TacheUpsertWithWhereUniqueWithoutUtilisateurInput | TacheUpsertWithWhereUniqueWithoutUtilisateurInput[]
    createMany?: TacheCreateManyUtilisateurInputEnvelope
    set?: TacheWhereUniqueInput | TacheWhereUniqueInput[]
    disconnect?: TacheWhereUniqueInput | TacheWhereUniqueInput[]
    delete?: TacheWhereUniqueInput | TacheWhereUniqueInput[]
    connect?: TacheWhereUniqueInput | TacheWhereUniqueInput[]
    update?: TacheUpdateWithWhereUniqueWithoutUtilisateurInput | TacheUpdateWithWhereUniqueWithoutUtilisateurInput[]
    updateMany?: TacheUpdateManyWithWhereWithoutUtilisateurInput | TacheUpdateManyWithWhereWithoutUtilisateurInput[]
    deleteMany?: TacheScalarWhereInput | TacheScalarWhereInput[]
  }

  export type UtilisateurCreateNestedOneWithoutProjetInput = {
    create?: XOR<UtilisateurCreateWithoutProjetInput, UtilisateurUncheckedCreateWithoutProjetInput>
    connectOrCreate?: UtilisateurCreateOrConnectWithoutProjetInput
    connect?: UtilisateurWhereUniqueInput
  }

  export type CategorieCreateNestedManyWithoutProjetInput = {
    create?: XOR<CategorieCreateWithoutProjetInput, CategorieUncheckedCreateWithoutProjetInput> | CategorieCreateWithoutProjetInput[] | CategorieUncheckedCreateWithoutProjetInput[]
    connectOrCreate?: CategorieCreateOrConnectWithoutProjetInput | CategorieCreateOrConnectWithoutProjetInput[]
    createMany?: CategorieCreateManyProjetInputEnvelope
    connect?: CategorieWhereUniqueInput | CategorieWhereUniqueInput[]
  }

  export type TacheCreateNestedManyWithoutProjetInput = {
    create?: XOR<TacheCreateWithoutProjetInput, TacheUncheckedCreateWithoutProjetInput> | TacheCreateWithoutProjetInput[] | TacheUncheckedCreateWithoutProjetInput[]
    connectOrCreate?: TacheCreateOrConnectWithoutProjetInput | TacheCreateOrConnectWithoutProjetInput[]
    createMany?: TacheCreateManyProjetInputEnvelope
    connect?: TacheWhereUniqueInput | TacheWhereUniqueInput[]
  }

  export type CategorieUncheckedCreateNestedManyWithoutProjetInput = {
    create?: XOR<CategorieCreateWithoutProjetInput, CategorieUncheckedCreateWithoutProjetInput> | CategorieCreateWithoutProjetInput[] | CategorieUncheckedCreateWithoutProjetInput[]
    connectOrCreate?: CategorieCreateOrConnectWithoutProjetInput | CategorieCreateOrConnectWithoutProjetInput[]
    createMany?: CategorieCreateManyProjetInputEnvelope
    connect?: CategorieWhereUniqueInput | CategorieWhereUniqueInput[]
  }

  export type TacheUncheckedCreateNestedManyWithoutProjetInput = {
    create?: XOR<TacheCreateWithoutProjetInput, TacheUncheckedCreateWithoutProjetInput> | TacheCreateWithoutProjetInput[] | TacheUncheckedCreateWithoutProjetInput[]
    connectOrCreate?: TacheCreateOrConnectWithoutProjetInput | TacheCreateOrConnectWithoutProjetInput[]
    createMany?: TacheCreateManyProjetInputEnvelope
    connect?: TacheWhereUniqueInput | TacheWhereUniqueInput[]
  }

  export type UtilisateurUpdateOneRequiredWithoutProjetNestedInput = {
    create?: XOR<UtilisateurCreateWithoutProjetInput, UtilisateurUncheckedCreateWithoutProjetInput>
    connectOrCreate?: UtilisateurCreateOrConnectWithoutProjetInput
    upsert?: UtilisateurUpsertWithoutProjetInput
    connect?: UtilisateurWhereUniqueInput
    update?: XOR<XOR<UtilisateurUpdateToOneWithWhereWithoutProjetInput, UtilisateurUpdateWithoutProjetInput>, UtilisateurUncheckedUpdateWithoutProjetInput>
  }

  export type CategorieUpdateManyWithoutProjetNestedInput = {
    create?: XOR<CategorieCreateWithoutProjetInput, CategorieUncheckedCreateWithoutProjetInput> | CategorieCreateWithoutProjetInput[] | CategorieUncheckedCreateWithoutProjetInput[]
    connectOrCreate?: CategorieCreateOrConnectWithoutProjetInput | CategorieCreateOrConnectWithoutProjetInput[]
    upsert?: CategorieUpsertWithWhereUniqueWithoutProjetInput | CategorieUpsertWithWhereUniqueWithoutProjetInput[]
    createMany?: CategorieCreateManyProjetInputEnvelope
    set?: CategorieWhereUniqueInput | CategorieWhereUniqueInput[]
    disconnect?: CategorieWhereUniqueInput | CategorieWhereUniqueInput[]
    delete?: CategorieWhereUniqueInput | CategorieWhereUniqueInput[]
    connect?: CategorieWhereUniqueInput | CategorieWhereUniqueInput[]
    update?: CategorieUpdateWithWhereUniqueWithoutProjetInput | CategorieUpdateWithWhereUniqueWithoutProjetInput[]
    updateMany?: CategorieUpdateManyWithWhereWithoutProjetInput | CategorieUpdateManyWithWhereWithoutProjetInput[]
    deleteMany?: CategorieScalarWhereInput | CategorieScalarWhereInput[]
  }

  export type TacheUpdateManyWithoutProjetNestedInput = {
    create?: XOR<TacheCreateWithoutProjetInput, TacheUncheckedCreateWithoutProjetInput> | TacheCreateWithoutProjetInput[] | TacheUncheckedCreateWithoutProjetInput[]
    connectOrCreate?: TacheCreateOrConnectWithoutProjetInput | TacheCreateOrConnectWithoutProjetInput[]
    upsert?: TacheUpsertWithWhereUniqueWithoutProjetInput | TacheUpsertWithWhereUniqueWithoutProjetInput[]
    createMany?: TacheCreateManyProjetInputEnvelope
    set?: TacheWhereUniqueInput | TacheWhereUniqueInput[]
    disconnect?: TacheWhereUniqueInput | TacheWhereUniqueInput[]
    delete?: TacheWhereUniqueInput | TacheWhereUniqueInput[]
    connect?: TacheWhereUniqueInput | TacheWhereUniqueInput[]
    update?: TacheUpdateWithWhereUniqueWithoutProjetInput | TacheUpdateWithWhereUniqueWithoutProjetInput[]
    updateMany?: TacheUpdateManyWithWhereWithoutProjetInput | TacheUpdateManyWithWhereWithoutProjetInput[]
    deleteMany?: TacheScalarWhereInput | TacheScalarWhereInput[]
  }

  export type CategorieUncheckedUpdateManyWithoutProjetNestedInput = {
    create?: XOR<CategorieCreateWithoutProjetInput, CategorieUncheckedCreateWithoutProjetInput> | CategorieCreateWithoutProjetInput[] | CategorieUncheckedCreateWithoutProjetInput[]
    connectOrCreate?: CategorieCreateOrConnectWithoutProjetInput | CategorieCreateOrConnectWithoutProjetInput[]
    upsert?: CategorieUpsertWithWhereUniqueWithoutProjetInput | CategorieUpsertWithWhereUniqueWithoutProjetInput[]
    createMany?: CategorieCreateManyProjetInputEnvelope
    set?: CategorieWhereUniqueInput | CategorieWhereUniqueInput[]
    disconnect?: CategorieWhereUniqueInput | CategorieWhereUniqueInput[]
    delete?: CategorieWhereUniqueInput | CategorieWhereUniqueInput[]
    connect?: CategorieWhereUniqueInput | CategorieWhereUniqueInput[]
    update?: CategorieUpdateWithWhereUniqueWithoutProjetInput | CategorieUpdateWithWhereUniqueWithoutProjetInput[]
    updateMany?: CategorieUpdateManyWithWhereWithoutProjetInput | CategorieUpdateManyWithWhereWithoutProjetInput[]
    deleteMany?: CategorieScalarWhereInput | CategorieScalarWhereInput[]
  }

  export type TacheUncheckedUpdateManyWithoutProjetNestedInput = {
    create?: XOR<TacheCreateWithoutProjetInput, TacheUncheckedCreateWithoutProjetInput> | TacheCreateWithoutProjetInput[] | TacheUncheckedCreateWithoutProjetInput[]
    connectOrCreate?: TacheCreateOrConnectWithoutProjetInput | TacheCreateOrConnectWithoutProjetInput[]
    upsert?: TacheUpsertWithWhereUniqueWithoutProjetInput | TacheUpsertWithWhereUniqueWithoutProjetInput[]
    createMany?: TacheCreateManyProjetInputEnvelope
    set?: TacheWhereUniqueInput | TacheWhereUniqueInput[]
    disconnect?: TacheWhereUniqueInput | TacheWhereUniqueInput[]
    delete?: TacheWhereUniqueInput | TacheWhereUniqueInput[]
    connect?: TacheWhereUniqueInput | TacheWhereUniqueInput[]
    update?: TacheUpdateWithWhereUniqueWithoutProjetInput | TacheUpdateWithWhereUniqueWithoutProjetInput[]
    updateMany?: TacheUpdateManyWithWhereWithoutProjetInput | TacheUpdateManyWithWhereWithoutProjetInput[]
    deleteMany?: TacheScalarWhereInput | TacheScalarWhereInput[]
  }

  export type ProjetCreateNestedOneWithoutCategoriesInput = {
    create?: XOR<ProjetCreateWithoutCategoriesInput, ProjetUncheckedCreateWithoutCategoriesInput>
    connectOrCreate?: ProjetCreateOrConnectWithoutCategoriesInput
    connect?: ProjetWhereUniqueInput
  }

  export type TacheCreateNestedManyWithoutCategorieInput = {
    create?: XOR<TacheCreateWithoutCategorieInput, TacheUncheckedCreateWithoutCategorieInput> | TacheCreateWithoutCategorieInput[] | TacheUncheckedCreateWithoutCategorieInput[]
    connectOrCreate?: TacheCreateOrConnectWithoutCategorieInput | TacheCreateOrConnectWithoutCategorieInput[]
    createMany?: TacheCreateManyCategorieInputEnvelope
    connect?: TacheWhereUniqueInput | TacheWhereUniqueInput[]
  }

  export type TacheUncheckedCreateNestedManyWithoutCategorieInput = {
    create?: XOR<TacheCreateWithoutCategorieInput, TacheUncheckedCreateWithoutCategorieInput> | TacheCreateWithoutCategorieInput[] | TacheUncheckedCreateWithoutCategorieInput[]
    connectOrCreate?: TacheCreateOrConnectWithoutCategorieInput | TacheCreateOrConnectWithoutCategorieInput[]
    createMany?: TacheCreateManyCategorieInputEnvelope
    connect?: TacheWhereUniqueInput | TacheWhereUniqueInput[]
  }

  export type ProjetUpdateOneRequiredWithoutCategoriesNestedInput = {
    create?: XOR<ProjetCreateWithoutCategoriesInput, ProjetUncheckedCreateWithoutCategoriesInput>
    connectOrCreate?: ProjetCreateOrConnectWithoutCategoriesInput
    upsert?: ProjetUpsertWithoutCategoriesInput
    connect?: ProjetWhereUniqueInput
    update?: XOR<XOR<ProjetUpdateToOneWithWhereWithoutCategoriesInput, ProjetUpdateWithoutCategoriesInput>, ProjetUncheckedUpdateWithoutCategoriesInput>
  }

  export type TacheUpdateManyWithoutCategorieNestedInput = {
    create?: XOR<TacheCreateWithoutCategorieInput, TacheUncheckedCreateWithoutCategorieInput> | TacheCreateWithoutCategorieInput[] | TacheUncheckedCreateWithoutCategorieInput[]
    connectOrCreate?: TacheCreateOrConnectWithoutCategorieInput | TacheCreateOrConnectWithoutCategorieInput[]
    upsert?: TacheUpsertWithWhereUniqueWithoutCategorieInput | TacheUpsertWithWhereUniqueWithoutCategorieInput[]
    createMany?: TacheCreateManyCategorieInputEnvelope
    set?: TacheWhereUniqueInput | TacheWhereUniqueInput[]
    disconnect?: TacheWhereUniqueInput | TacheWhereUniqueInput[]
    delete?: TacheWhereUniqueInput | TacheWhereUniqueInput[]
    connect?: TacheWhereUniqueInput | TacheWhereUniqueInput[]
    update?: TacheUpdateWithWhereUniqueWithoutCategorieInput | TacheUpdateWithWhereUniqueWithoutCategorieInput[]
    updateMany?: TacheUpdateManyWithWhereWithoutCategorieInput | TacheUpdateManyWithWhereWithoutCategorieInput[]
    deleteMany?: TacheScalarWhereInput | TacheScalarWhereInput[]
  }

  export type TacheUncheckedUpdateManyWithoutCategorieNestedInput = {
    create?: XOR<TacheCreateWithoutCategorieInput, TacheUncheckedCreateWithoutCategorieInput> | TacheCreateWithoutCategorieInput[] | TacheUncheckedCreateWithoutCategorieInput[]
    connectOrCreate?: TacheCreateOrConnectWithoutCategorieInput | TacheCreateOrConnectWithoutCategorieInput[]
    upsert?: TacheUpsertWithWhereUniqueWithoutCategorieInput | TacheUpsertWithWhereUniqueWithoutCategorieInput[]
    createMany?: TacheCreateManyCategorieInputEnvelope
    set?: TacheWhereUniqueInput | TacheWhereUniqueInput[]
    disconnect?: TacheWhereUniqueInput | TacheWhereUniqueInput[]
    delete?: TacheWhereUniqueInput | TacheWhereUniqueInput[]
    connect?: TacheWhereUniqueInput | TacheWhereUniqueInput[]
    update?: TacheUpdateWithWhereUniqueWithoutCategorieInput | TacheUpdateWithWhereUniqueWithoutCategorieInput[]
    updateMany?: TacheUpdateManyWithWhereWithoutCategorieInput | TacheUpdateManyWithWhereWithoutCategorieInput[]
    deleteMany?: TacheScalarWhereInput | TacheScalarWhereInput[]
  }

  export type CategorieCreateNestedOneWithoutTachesInput = {
    create?: XOR<CategorieCreateWithoutTachesInput, CategorieUncheckedCreateWithoutTachesInput>
    connectOrCreate?: CategorieCreateOrConnectWithoutTachesInput
    connect?: CategorieWhereUniqueInput
  }

  export type UtilisateurCreateNestedOneWithoutTachesInput = {
    create?: XOR<UtilisateurCreateWithoutTachesInput, UtilisateurUncheckedCreateWithoutTachesInput>
    connectOrCreate?: UtilisateurCreateOrConnectWithoutTachesInput
    connect?: UtilisateurWhereUniqueInput
  }

  export type FicherJointCreateNestedManyWithoutTacheInput = {
    create?: XOR<FicherJointCreateWithoutTacheInput, FicherJointUncheckedCreateWithoutTacheInput> | FicherJointCreateWithoutTacheInput[] | FicherJointUncheckedCreateWithoutTacheInput[]
    connectOrCreate?: FicherJointCreateOrConnectWithoutTacheInput | FicherJointCreateOrConnectWithoutTacheInput[]
    createMany?: FicherJointCreateManyTacheInputEnvelope
    connect?: FicherJointWhereUniqueInput | FicherJointWhereUniqueInput[]
  }

  export type ProjetCreateNestedOneWithoutTachesInput = {
    create?: XOR<ProjetCreateWithoutTachesInput, ProjetUncheckedCreateWithoutTachesInput>
    connectOrCreate?: ProjetCreateOrConnectWithoutTachesInput
    connect?: ProjetWhereUniqueInput
  }

  export type FicherJointUncheckedCreateNestedManyWithoutTacheInput = {
    create?: XOR<FicherJointCreateWithoutTacheInput, FicherJointUncheckedCreateWithoutTacheInput> | FicherJointCreateWithoutTacheInput[] | FicherJointUncheckedCreateWithoutTacheInput[]
    connectOrCreate?: FicherJointCreateOrConnectWithoutTacheInput | FicherJointCreateOrConnectWithoutTacheInput[]
    createMany?: FicherJointCreateManyTacheInputEnvelope
    connect?: FicherJointWhereUniqueInput | FicherJointWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type EnumPrioriteFieldUpdateOperationsInput = {
    set?: $Enums.Priorite
  }

  export type EnumStatusFieldUpdateOperationsInput = {
    set?: $Enums.Status
  }

  export type CategorieUpdateOneWithoutTachesNestedInput = {
    create?: XOR<CategorieCreateWithoutTachesInput, CategorieUncheckedCreateWithoutTachesInput>
    connectOrCreate?: CategorieCreateOrConnectWithoutTachesInput
    upsert?: CategorieUpsertWithoutTachesInput
    disconnect?: CategorieWhereInput | boolean
    delete?: CategorieWhereInput | boolean
    connect?: CategorieWhereUniqueInput
    update?: XOR<XOR<CategorieUpdateToOneWithWhereWithoutTachesInput, CategorieUpdateWithoutTachesInput>, CategorieUncheckedUpdateWithoutTachesInput>
  }

  export type UtilisateurUpdateOneRequiredWithoutTachesNestedInput = {
    create?: XOR<UtilisateurCreateWithoutTachesInput, UtilisateurUncheckedCreateWithoutTachesInput>
    connectOrCreate?: UtilisateurCreateOrConnectWithoutTachesInput
    upsert?: UtilisateurUpsertWithoutTachesInput
    connect?: UtilisateurWhereUniqueInput
    update?: XOR<XOR<UtilisateurUpdateToOneWithWhereWithoutTachesInput, UtilisateurUpdateWithoutTachesInput>, UtilisateurUncheckedUpdateWithoutTachesInput>
  }

  export type FicherJointUpdateManyWithoutTacheNestedInput = {
    create?: XOR<FicherJointCreateWithoutTacheInput, FicherJointUncheckedCreateWithoutTacheInput> | FicherJointCreateWithoutTacheInput[] | FicherJointUncheckedCreateWithoutTacheInput[]
    connectOrCreate?: FicherJointCreateOrConnectWithoutTacheInput | FicherJointCreateOrConnectWithoutTacheInput[]
    upsert?: FicherJointUpsertWithWhereUniqueWithoutTacheInput | FicherJointUpsertWithWhereUniqueWithoutTacheInput[]
    createMany?: FicherJointCreateManyTacheInputEnvelope
    set?: FicherJointWhereUniqueInput | FicherJointWhereUniqueInput[]
    disconnect?: FicherJointWhereUniqueInput | FicherJointWhereUniqueInput[]
    delete?: FicherJointWhereUniqueInput | FicherJointWhereUniqueInput[]
    connect?: FicherJointWhereUniqueInput | FicherJointWhereUniqueInput[]
    update?: FicherJointUpdateWithWhereUniqueWithoutTacheInput | FicherJointUpdateWithWhereUniqueWithoutTacheInput[]
    updateMany?: FicherJointUpdateManyWithWhereWithoutTacheInput | FicherJointUpdateManyWithWhereWithoutTacheInput[]
    deleteMany?: FicherJointScalarWhereInput | FicherJointScalarWhereInput[]
  }

  export type ProjetUpdateOneRequiredWithoutTachesNestedInput = {
    create?: XOR<ProjetCreateWithoutTachesInput, ProjetUncheckedCreateWithoutTachesInput>
    connectOrCreate?: ProjetCreateOrConnectWithoutTachesInput
    upsert?: ProjetUpsertWithoutTachesInput
    connect?: ProjetWhereUniqueInput
    update?: XOR<XOR<ProjetUpdateToOneWithWhereWithoutTachesInput, ProjetUpdateWithoutTachesInput>, ProjetUncheckedUpdateWithoutTachesInput>
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type FicherJointUncheckedUpdateManyWithoutTacheNestedInput = {
    create?: XOR<FicherJointCreateWithoutTacheInput, FicherJointUncheckedCreateWithoutTacheInput> | FicherJointCreateWithoutTacheInput[] | FicherJointUncheckedCreateWithoutTacheInput[]
    connectOrCreate?: FicherJointCreateOrConnectWithoutTacheInput | FicherJointCreateOrConnectWithoutTacheInput[]
    upsert?: FicherJointUpsertWithWhereUniqueWithoutTacheInput | FicherJointUpsertWithWhereUniqueWithoutTacheInput[]
    createMany?: FicherJointCreateManyTacheInputEnvelope
    set?: FicherJointWhereUniqueInput | FicherJointWhereUniqueInput[]
    disconnect?: FicherJointWhereUniqueInput | FicherJointWhereUniqueInput[]
    delete?: FicherJointWhereUniqueInput | FicherJointWhereUniqueInput[]
    connect?: FicherJointWhereUniqueInput | FicherJointWhereUniqueInput[]
    update?: FicherJointUpdateWithWhereUniqueWithoutTacheInput | FicherJointUpdateWithWhereUniqueWithoutTacheInput[]
    updateMany?: FicherJointUpdateManyWithWhereWithoutTacheInput | FicherJointUpdateManyWithWhereWithoutTacheInput[]
    deleteMany?: FicherJointScalarWhereInput | FicherJointScalarWhereInput[]
  }

  export type TacheCreateNestedOneWithoutFichiers_jointsInput = {
    create?: XOR<TacheCreateWithoutFichiers_jointsInput, TacheUncheckedCreateWithoutFichiers_jointsInput>
    connectOrCreate?: TacheCreateOrConnectWithoutFichiers_jointsInput
    connect?: TacheWhereUniqueInput
  }

  export type TacheUpdateOneRequiredWithoutFichiers_jointsNestedInput = {
    create?: XOR<TacheCreateWithoutFichiers_jointsInput, TacheUncheckedCreateWithoutFichiers_jointsInput>
    connectOrCreate?: TacheCreateOrConnectWithoutFichiers_jointsInput
    upsert?: TacheUpsertWithoutFichiers_jointsInput
    connect?: TacheWhereUniqueInput
    update?: XOR<XOR<TacheUpdateToOneWithWhereWithoutFichiers_jointsInput, TacheUpdateWithoutFichiers_jointsInput>, TacheUncheckedUpdateWithoutFichiers_jointsInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedEnumPrioriteFilter<$PrismaModel = never> = {
    equals?: $Enums.Priorite | EnumPrioriteFieldRefInput<$PrismaModel>
    in?: $Enums.Priorite[]
    notIn?: $Enums.Priorite[]
    not?: NestedEnumPrioriteFilter<$PrismaModel> | $Enums.Priorite
  }

  export type NestedEnumStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.Status | EnumStatusFieldRefInput<$PrismaModel>
    in?: $Enums.Status[]
    notIn?: $Enums.Status[]
    not?: NestedEnumStatusFilter<$PrismaModel> | $Enums.Status
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumPrioriteWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Priorite | EnumPrioriteFieldRefInput<$PrismaModel>
    in?: $Enums.Priorite[]
    notIn?: $Enums.Priorite[]
    not?: NestedEnumPrioriteWithAggregatesFilter<$PrismaModel> | $Enums.Priorite
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPrioriteFilter<$PrismaModel>
    _max?: NestedEnumPrioriteFilter<$PrismaModel>
  }

  export type NestedEnumStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Status | EnumStatusFieldRefInput<$PrismaModel>
    in?: $Enums.Status[]
    notIn?: $Enums.Status[]
    not?: NestedEnumStatusWithAggregatesFilter<$PrismaModel> | $Enums.Status
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStatusFilter<$PrismaModel>
    _max?: NestedEnumStatusFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type ProjetCreateWithoutUtilisateurInput = {
    nom: string
    categories?: CategorieCreateNestedManyWithoutProjetInput
    taches?: TacheCreateNestedManyWithoutProjetInput
  }

  export type ProjetUncheckedCreateWithoutUtilisateurInput = {
    id_projet?: number
    nom: string
    categories?: CategorieUncheckedCreateNestedManyWithoutProjetInput
    taches?: TacheUncheckedCreateNestedManyWithoutProjetInput
  }

  export type ProjetCreateOrConnectWithoutUtilisateurInput = {
    where: ProjetWhereUniqueInput
    create: XOR<ProjetCreateWithoutUtilisateurInput, ProjetUncheckedCreateWithoutUtilisateurInput>
  }

  export type ProjetCreateManyUtilisateurInputEnvelope = {
    data: ProjetCreateManyUtilisateurInput | ProjetCreateManyUtilisateurInput[]
  }

  export type TacheCreateWithoutUtilisateurInput = {
    titre: string
    description?: string | null
    date_limite?: Date | string | null
    priorite: $Enums.Priorite
    status?: $Enums.Status
    categorie?: CategorieCreateNestedOneWithoutTachesInput
    fichiers_joints?: FicherJointCreateNestedManyWithoutTacheInput
    projet: ProjetCreateNestedOneWithoutTachesInput
  }

  export type TacheUncheckedCreateWithoutUtilisateurInput = {
    id_tache?: number
    titre: string
    description?: string | null
    date_limite?: Date | string | null
    priorite: $Enums.Priorite
    status?: $Enums.Status
    id_categorie?: number | null
    id_projet: number
    fichiers_joints?: FicherJointUncheckedCreateNestedManyWithoutTacheInput
  }

  export type TacheCreateOrConnectWithoutUtilisateurInput = {
    where: TacheWhereUniqueInput
    create: XOR<TacheCreateWithoutUtilisateurInput, TacheUncheckedCreateWithoutUtilisateurInput>
  }

  export type TacheCreateManyUtilisateurInputEnvelope = {
    data: TacheCreateManyUtilisateurInput | TacheCreateManyUtilisateurInput[]
  }

  export type ProjetUpsertWithWhereUniqueWithoutUtilisateurInput = {
    where: ProjetWhereUniqueInput
    update: XOR<ProjetUpdateWithoutUtilisateurInput, ProjetUncheckedUpdateWithoutUtilisateurInput>
    create: XOR<ProjetCreateWithoutUtilisateurInput, ProjetUncheckedCreateWithoutUtilisateurInput>
  }

  export type ProjetUpdateWithWhereUniqueWithoutUtilisateurInput = {
    where: ProjetWhereUniqueInput
    data: XOR<ProjetUpdateWithoutUtilisateurInput, ProjetUncheckedUpdateWithoutUtilisateurInput>
  }

  export type ProjetUpdateManyWithWhereWithoutUtilisateurInput = {
    where: ProjetScalarWhereInput
    data: XOR<ProjetUpdateManyMutationInput, ProjetUncheckedUpdateManyWithoutUtilisateurInput>
  }

  export type ProjetScalarWhereInput = {
    AND?: ProjetScalarWhereInput | ProjetScalarWhereInput[]
    OR?: ProjetScalarWhereInput[]
    NOT?: ProjetScalarWhereInput | ProjetScalarWhereInput[]
    id_projet?: IntFilter<"Projet"> | number
    nom?: StringFilter<"Projet"> | string
    id_utilisateur?: IntFilter<"Projet"> | number
  }

  export type TacheUpsertWithWhereUniqueWithoutUtilisateurInput = {
    where: TacheWhereUniqueInput
    update: XOR<TacheUpdateWithoutUtilisateurInput, TacheUncheckedUpdateWithoutUtilisateurInput>
    create: XOR<TacheCreateWithoutUtilisateurInput, TacheUncheckedCreateWithoutUtilisateurInput>
  }

  export type TacheUpdateWithWhereUniqueWithoutUtilisateurInput = {
    where: TacheWhereUniqueInput
    data: XOR<TacheUpdateWithoutUtilisateurInput, TacheUncheckedUpdateWithoutUtilisateurInput>
  }

  export type TacheUpdateManyWithWhereWithoutUtilisateurInput = {
    where: TacheScalarWhereInput
    data: XOR<TacheUpdateManyMutationInput, TacheUncheckedUpdateManyWithoutUtilisateurInput>
  }

  export type TacheScalarWhereInput = {
    AND?: TacheScalarWhereInput | TacheScalarWhereInput[]
    OR?: TacheScalarWhereInput[]
    NOT?: TacheScalarWhereInput | TacheScalarWhereInput[]
    id_tache?: IntFilter<"Tache"> | number
    titre?: StringFilter<"Tache"> | string
    description?: StringNullableFilter<"Tache"> | string | null
    date_limite?: DateTimeNullableFilter<"Tache"> | Date | string | null
    priorite?: EnumPrioriteFilter<"Tache"> | $Enums.Priorite
    status?: EnumStatusFilter<"Tache"> | $Enums.Status
    id_categorie?: IntNullableFilter<"Tache"> | number | null
    id_utilisateur?: IntFilter<"Tache"> | number
    id_projet?: IntFilter<"Tache"> | number
  }

  export type UtilisateurCreateWithoutProjetInput = {
    email: string
    password: string
    taches?: TacheCreateNestedManyWithoutUtilisateurInput
  }

  export type UtilisateurUncheckedCreateWithoutProjetInput = {
    id_utilisateur?: number
    email: string
    password: string
    taches?: TacheUncheckedCreateNestedManyWithoutUtilisateurInput
  }

  export type UtilisateurCreateOrConnectWithoutProjetInput = {
    where: UtilisateurWhereUniqueInput
    create: XOR<UtilisateurCreateWithoutProjetInput, UtilisateurUncheckedCreateWithoutProjetInput>
  }

  export type CategorieCreateWithoutProjetInput = {
    nom: string
    taches?: TacheCreateNestedManyWithoutCategorieInput
  }

  export type CategorieUncheckedCreateWithoutProjetInput = {
    id_categorie?: number
    nom: string
    taches?: TacheUncheckedCreateNestedManyWithoutCategorieInput
  }

  export type CategorieCreateOrConnectWithoutProjetInput = {
    where: CategorieWhereUniqueInput
    create: XOR<CategorieCreateWithoutProjetInput, CategorieUncheckedCreateWithoutProjetInput>
  }

  export type CategorieCreateManyProjetInputEnvelope = {
    data: CategorieCreateManyProjetInput | CategorieCreateManyProjetInput[]
  }

  export type TacheCreateWithoutProjetInput = {
    titre: string
    description?: string | null
    date_limite?: Date | string | null
    priorite: $Enums.Priorite
    status?: $Enums.Status
    categorie?: CategorieCreateNestedOneWithoutTachesInput
    utilisateur: UtilisateurCreateNestedOneWithoutTachesInput
    fichiers_joints?: FicherJointCreateNestedManyWithoutTacheInput
  }

  export type TacheUncheckedCreateWithoutProjetInput = {
    id_tache?: number
    titre: string
    description?: string | null
    date_limite?: Date | string | null
    priorite: $Enums.Priorite
    status?: $Enums.Status
    id_categorie?: number | null
    id_utilisateur: number
    fichiers_joints?: FicherJointUncheckedCreateNestedManyWithoutTacheInput
  }

  export type TacheCreateOrConnectWithoutProjetInput = {
    where: TacheWhereUniqueInput
    create: XOR<TacheCreateWithoutProjetInput, TacheUncheckedCreateWithoutProjetInput>
  }

  export type TacheCreateManyProjetInputEnvelope = {
    data: TacheCreateManyProjetInput | TacheCreateManyProjetInput[]
  }

  export type UtilisateurUpsertWithoutProjetInput = {
    update: XOR<UtilisateurUpdateWithoutProjetInput, UtilisateurUncheckedUpdateWithoutProjetInput>
    create: XOR<UtilisateurCreateWithoutProjetInput, UtilisateurUncheckedCreateWithoutProjetInput>
    where?: UtilisateurWhereInput
  }

  export type UtilisateurUpdateToOneWithWhereWithoutProjetInput = {
    where?: UtilisateurWhereInput
    data: XOR<UtilisateurUpdateWithoutProjetInput, UtilisateurUncheckedUpdateWithoutProjetInput>
  }

  export type UtilisateurUpdateWithoutProjetInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    taches?: TacheUpdateManyWithoutUtilisateurNestedInput
  }

  export type UtilisateurUncheckedUpdateWithoutProjetInput = {
    id_utilisateur?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    taches?: TacheUncheckedUpdateManyWithoutUtilisateurNestedInput
  }

  export type CategorieUpsertWithWhereUniqueWithoutProjetInput = {
    where: CategorieWhereUniqueInput
    update: XOR<CategorieUpdateWithoutProjetInput, CategorieUncheckedUpdateWithoutProjetInput>
    create: XOR<CategorieCreateWithoutProjetInput, CategorieUncheckedCreateWithoutProjetInput>
  }

  export type CategorieUpdateWithWhereUniqueWithoutProjetInput = {
    where: CategorieWhereUniqueInput
    data: XOR<CategorieUpdateWithoutProjetInput, CategorieUncheckedUpdateWithoutProjetInput>
  }

  export type CategorieUpdateManyWithWhereWithoutProjetInput = {
    where: CategorieScalarWhereInput
    data: XOR<CategorieUpdateManyMutationInput, CategorieUncheckedUpdateManyWithoutProjetInput>
  }

  export type CategorieScalarWhereInput = {
    AND?: CategorieScalarWhereInput | CategorieScalarWhereInput[]
    OR?: CategorieScalarWhereInput[]
    NOT?: CategorieScalarWhereInput | CategorieScalarWhereInput[]
    id_categorie?: IntFilter<"Categorie"> | number
    nom?: StringFilter<"Categorie"> | string
    id_projet?: IntFilter<"Categorie"> | number
  }

  export type TacheUpsertWithWhereUniqueWithoutProjetInput = {
    where: TacheWhereUniqueInput
    update: XOR<TacheUpdateWithoutProjetInput, TacheUncheckedUpdateWithoutProjetInput>
    create: XOR<TacheCreateWithoutProjetInput, TacheUncheckedCreateWithoutProjetInput>
  }

  export type TacheUpdateWithWhereUniqueWithoutProjetInput = {
    where: TacheWhereUniqueInput
    data: XOR<TacheUpdateWithoutProjetInput, TacheUncheckedUpdateWithoutProjetInput>
  }

  export type TacheUpdateManyWithWhereWithoutProjetInput = {
    where: TacheScalarWhereInput
    data: XOR<TacheUpdateManyMutationInput, TacheUncheckedUpdateManyWithoutProjetInput>
  }

  export type ProjetCreateWithoutCategoriesInput = {
    nom: string
    utilisateur: UtilisateurCreateNestedOneWithoutProjetInput
    taches?: TacheCreateNestedManyWithoutProjetInput
  }

  export type ProjetUncheckedCreateWithoutCategoriesInput = {
    id_projet?: number
    nom: string
    id_utilisateur: number
    taches?: TacheUncheckedCreateNestedManyWithoutProjetInput
  }

  export type ProjetCreateOrConnectWithoutCategoriesInput = {
    where: ProjetWhereUniqueInput
    create: XOR<ProjetCreateWithoutCategoriesInput, ProjetUncheckedCreateWithoutCategoriesInput>
  }

  export type TacheCreateWithoutCategorieInput = {
    titre: string
    description?: string | null
    date_limite?: Date | string | null
    priorite: $Enums.Priorite
    status?: $Enums.Status
    utilisateur: UtilisateurCreateNestedOneWithoutTachesInput
    fichiers_joints?: FicherJointCreateNestedManyWithoutTacheInput
    projet: ProjetCreateNestedOneWithoutTachesInput
  }

  export type TacheUncheckedCreateWithoutCategorieInput = {
    id_tache?: number
    titre: string
    description?: string | null
    date_limite?: Date | string | null
    priorite: $Enums.Priorite
    status?: $Enums.Status
    id_utilisateur: number
    id_projet: number
    fichiers_joints?: FicherJointUncheckedCreateNestedManyWithoutTacheInput
  }

  export type TacheCreateOrConnectWithoutCategorieInput = {
    where: TacheWhereUniqueInput
    create: XOR<TacheCreateWithoutCategorieInput, TacheUncheckedCreateWithoutCategorieInput>
  }

  export type TacheCreateManyCategorieInputEnvelope = {
    data: TacheCreateManyCategorieInput | TacheCreateManyCategorieInput[]
  }

  export type ProjetUpsertWithoutCategoriesInput = {
    update: XOR<ProjetUpdateWithoutCategoriesInput, ProjetUncheckedUpdateWithoutCategoriesInput>
    create: XOR<ProjetCreateWithoutCategoriesInput, ProjetUncheckedCreateWithoutCategoriesInput>
    where?: ProjetWhereInput
  }

  export type ProjetUpdateToOneWithWhereWithoutCategoriesInput = {
    where?: ProjetWhereInput
    data: XOR<ProjetUpdateWithoutCategoriesInput, ProjetUncheckedUpdateWithoutCategoriesInput>
  }

  export type ProjetUpdateWithoutCategoriesInput = {
    nom?: StringFieldUpdateOperationsInput | string
    utilisateur?: UtilisateurUpdateOneRequiredWithoutProjetNestedInput
    taches?: TacheUpdateManyWithoutProjetNestedInput
  }

  export type ProjetUncheckedUpdateWithoutCategoriesInput = {
    id_projet?: IntFieldUpdateOperationsInput | number
    nom?: StringFieldUpdateOperationsInput | string
    id_utilisateur?: IntFieldUpdateOperationsInput | number
    taches?: TacheUncheckedUpdateManyWithoutProjetNestedInput
  }

  export type TacheUpsertWithWhereUniqueWithoutCategorieInput = {
    where: TacheWhereUniqueInput
    update: XOR<TacheUpdateWithoutCategorieInput, TacheUncheckedUpdateWithoutCategorieInput>
    create: XOR<TacheCreateWithoutCategorieInput, TacheUncheckedCreateWithoutCategorieInput>
  }

  export type TacheUpdateWithWhereUniqueWithoutCategorieInput = {
    where: TacheWhereUniqueInput
    data: XOR<TacheUpdateWithoutCategorieInput, TacheUncheckedUpdateWithoutCategorieInput>
  }

  export type TacheUpdateManyWithWhereWithoutCategorieInput = {
    where: TacheScalarWhereInput
    data: XOR<TacheUpdateManyMutationInput, TacheUncheckedUpdateManyWithoutCategorieInput>
  }

  export type CategorieCreateWithoutTachesInput = {
    nom: string
    projet: ProjetCreateNestedOneWithoutCategoriesInput
  }

  export type CategorieUncheckedCreateWithoutTachesInput = {
    id_categorie?: number
    nom: string
    id_projet: number
  }

  export type CategorieCreateOrConnectWithoutTachesInput = {
    where: CategorieWhereUniqueInput
    create: XOR<CategorieCreateWithoutTachesInput, CategorieUncheckedCreateWithoutTachesInput>
  }

  export type UtilisateurCreateWithoutTachesInput = {
    email: string
    password: string
    projet?: ProjetCreateNestedManyWithoutUtilisateurInput
  }

  export type UtilisateurUncheckedCreateWithoutTachesInput = {
    id_utilisateur?: number
    email: string
    password: string
    projet?: ProjetUncheckedCreateNestedManyWithoutUtilisateurInput
  }

  export type UtilisateurCreateOrConnectWithoutTachesInput = {
    where: UtilisateurWhereUniqueInput
    create: XOR<UtilisateurCreateWithoutTachesInput, UtilisateurUncheckedCreateWithoutTachesInput>
  }

  export type FicherJointCreateWithoutTacheInput = {
    url: string
    nom: string
  }

  export type FicherJointUncheckedCreateWithoutTacheInput = {
    id_ficher?: number
    url: string
    nom: string
  }

  export type FicherJointCreateOrConnectWithoutTacheInput = {
    where: FicherJointWhereUniqueInput
    create: XOR<FicherJointCreateWithoutTacheInput, FicherJointUncheckedCreateWithoutTacheInput>
  }

  export type FicherJointCreateManyTacheInputEnvelope = {
    data: FicherJointCreateManyTacheInput | FicherJointCreateManyTacheInput[]
  }

  export type ProjetCreateWithoutTachesInput = {
    nom: string
    utilisateur: UtilisateurCreateNestedOneWithoutProjetInput
    categories?: CategorieCreateNestedManyWithoutProjetInput
  }

  export type ProjetUncheckedCreateWithoutTachesInput = {
    id_projet?: number
    nom: string
    id_utilisateur: number
    categories?: CategorieUncheckedCreateNestedManyWithoutProjetInput
  }

  export type ProjetCreateOrConnectWithoutTachesInput = {
    where: ProjetWhereUniqueInput
    create: XOR<ProjetCreateWithoutTachesInput, ProjetUncheckedCreateWithoutTachesInput>
  }

  export type CategorieUpsertWithoutTachesInput = {
    update: XOR<CategorieUpdateWithoutTachesInput, CategorieUncheckedUpdateWithoutTachesInput>
    create: XOR<CategorieCreateWithoutTachesInput, CategorieUncheckedCreateWithoutTachesInput>
    where?: CategorieWhereInput
  }

  export type CategorieUpdateToOneWithWhereWithoutTachesInput = {
    where?: CategorieWhereInput
    data: XOR<CategorieUpdateWithoutTachesInput, CategorieUncheckedUpdateWithoutTachesInput>
  }

  export type CategorieUpdateWithoutTachesInput = {
    nom?: StringFieldUpdateOperationsInput | string
    projet?: ProjetUpdateOneRequiredWithoutCategoriesNestedInput
  }

  export type CategorieUncheckedUpdateWithoutTachesInput = {
    id_categorie?: IntFieldUpdateOperationsInput | number
    nom?: StringFieldUpdateOperationsInput | string
    id_projet?: IntFieldUpdateOperationsInput | number
  }

  export type UtilisateurUpsertWithoutTachesInput = {
    update: XOR<UtilisateurUpdateWithoutTachesInput, UtilisateurUncheckedUpdateWithoutTachesInput>
    create: XOR<UtilisateurCreateWithoutTachesInput, UtilisateurUncheckedCreateWithoutTachesInput>
    where?: UtilisateurWhereInput
  }

  export type UtilisateurUpdateToOneWithWhereWithoutTachesInput = {
    where?: UtilisateurWhereInput
    data: XOR<UtilisateurUpdateWithoutTachesInput, UtilisateurUncheckedUpdateWithoutTachesInput>
  }

  export type UtilisateurUpdateWithoutTachesInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    projet?: ProjetUpdateManyWithoutUtilisateurNestedInput
  }

  export type UtilisateurUncheckedUpdateWithoutTachesInput = {
    id_utilisateur?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    projet?: ProjetUncheckedUpdateManyWithoutUtilisateurNestedInput
  }

  export type FicherJointUpsertWithWhereUniqueWithoutTacheInput = {
    where: FicherJointWhereUniqueInput
    update: XOR<FicherJointUpdateWithoutTacheInput, FicherJointUncheckedUpdateWithoutTacheInput>
    create: XOR<FicherJointCreateWithoutTacheInput, FicherJointUncheckedCreateWithoutTacheInput>
  }

  export type FicherJointUpdateWithWhereUniqueWithoutTacheInput = {
    where: FicherJointWhereUniqueInput
    data: XOR<FicherJointUpdateWithoutTacheInput, FicherJointUncheckedUpdateWithoutTacheInput>
  }

  export type FicherJointUpdateManyWithWhereWithoutTacheInput = {
    where: FicherJointScalarWhereInput
    data: XOR<FicherJointUpdateManyMutationInput, FicherJointUncheckedUpdateManyWithoutTacheInput>
  }

  export type FicherJointScalarWhereInput = {
    AND?: FicherJointScalarWhereInput | FicherJointScalarWhereInput[]
    OR?: FicherJointScalarWhereInput[]
    NOT?: FicherJointScalarWhereInput | FicherJointScalarWhereInput[]
    id_ficher?: IntFilter<"FicherJoint"> | number
    url?: StringFilter<"FicherJoint"> | string
    nom?: StringFilter<"FicherJoint"> | string
    id_tache?: IntFilter<"FicherJoint"> | number
  }

  export type ProjetUpsertWithoutTachesInput = {
    update: XOR<ProjetUpdateWithoutTachesInput, ProjetUncheckedUpdateWithoutTachesInput>
    create: XOR<ProjetCreateWithoutTachesInput, ProjetUncheckedCreateWithoutTachesInput>
    where?: ProjetWhereInput
  }

  export type ProjetUpdateToOneWithWhereWithoutTachesInput = {
    where?: ProjetWhereInput
    data: XOR<ProjetUpdateWithoutTachesInput, ProjetUncheckedUpdateWithoutTachesInput>
  }

  export type ProjetUpdateWithoutTachesInput = {
    nom?: StringFieldUpdateOperationsInput | string
    utilisateur?: UtilisateurUpdateOneRequiredWithoutProjetNestedInput
    categories?: CategorieUpdateManyWithoutProjetNestedInput
  }

  export type ProjetUncheckedUpdateWithoutTachesInput = {
    id_projet?: IntFieldUpdateOperationsInput | number
    nom?: StringFieldUpdateOperationsInput | string
    id_utilisateur?: IntFieldUpdateOperationsInput | number
    categories?: CategorieUncheckedUpdateManyWithoutProjetNestedInput
  }

  export type TacheCreateWithoutFichiers_jointsInput = {
    titre: string
    description?: string | null
    date_limite?: Date | string | null
    priorite: $Enums.Priorite
    status?: $Enums.Status
    categorie?: CategorieCreateNestedOneWithoutTachesInput
    utilisateur: UtilisateurCreateNestedOneWithoutTachesInput
    projet: ProjetCreateNestedOneWithoutTachesInput
  }

  export type TacheUncheckedCreateWithoutFichiers_jointsInput = {
    id_tache?: number
    titre: string
    description?: string | null
    date_limite?: Date | string | null
    priorite: $Enums.Priorite
    status?: $Enums.Status
    id_categorie?: number | null
    id_utilisateur: number
    id_projet: number
  }

  export type TacheCreateOrConnectWithoutFichiers_jointsInput = {
    where: TacheWhereUniqueInput
    create: XOR<TacheCreateWithoutFichiers_jointsInput, TacheUncheckedCreateWithoutFichiers_jointsInput>
  }

  export type TacheUpsertWithoutFichiers_jointsInput = {
    update: XOR<TacheUpdateWithoutFichiers_jointsInput, TacheUncheckedUpdateWithoutFichiers_jointsInput>
    create: XOR<TacheCreateWithoutFichiers_jointsInput, TacheUncheckedCreateWithoutFichiers_jointsInput>
    where?: TacheWhereInput
  }

  export type TacheUpdateToOneWithWhereWithoutFichiers_jointsInput = {
    where?: TacheWhereInput
    data: XOR<TacheUpdateWithoutFichiers_jointsInput, TacheUncheckedUpdateWithoutFichiers_jointsInput>
  }

  export type TacheUpdateWithoutFichiers_jointsInput = {
    titre?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    date_limite?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    priorite?: EnumPrioriteFieldUpdateOperationsInput | $Enums.Priorite
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    categorie?: CategorieUpdateOneWithoutTachesNestedInput
    utilisateur?: UtilisateurUpdateOneRequiredWithoutTachesNestedInput
    projet?: ProjetUpdateOneRequiredWithoutTachesNestedInput
  }

  export type TacheUncheckedUpdateWithoutFichiers_jointsInput = {
    id_tache?: IntFieldUpdateOperationsInput | number
    titre?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    date_limite?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    priorite?: EnumPrioriteFieldUpdateOperationsInput | $Enums.Priorite
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    id_categorie?: NullableIntFieldUpdateOperationsInput | number | null
    id_utilisateur?: IntFieldUpdateOperationsInput | number
    id_projet?: IntFieldUpdateOperationsInput | number
  }

  export type ProjetCreateManyUtilisateurInput = {
    id_projet?: number
    nom: string
  }

  export type TacheCreateManyUtilisateurInput = {
    id_tache?: number
    titre: string
    description?: string | null
    date_limite?: Date | string | null
    priorite: $Enums.Priorite
    status?: $Enums.Status
    id_categorie?: number | null
    id_projet: number
  }

  export type ProjetUpdateWithoutUtilisateurInput = {
    nom?: StringFieldUpdateOperationsInput | string
    categories?: CategorieUpdateManyWithoutProjetNestedInput
    taches?: TacheUpdateManyWithoutProjetNestedInput
  }

  export type ProjetUncheckedUpdateWithoutUtilisateurInput = {
    id_projet?: IntFieldUpdateOperationsInput | number
    nom?: StringFieldUpdateOperationsInput | string
    categories?: CategorieUncheckedUpdateManyWithoutProjetNestedInput
    taches?: TacheUncheckedUpdateManyWithoutProjetNestedInput
  }

  export type ProjetUncheckedUpdateManyWithoutUtilisateurInput = {
    id_projet?: IntFieldUpdateOperationsInput | number
    nom?: StringFieldUpdateOperationsInput | string
  }

  export type TacheUpdateWithoutUtilisateurInput = {
    titre?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    date_limite?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    priorite?: EnumPrioriteFieldUpdateOperationsInput | $Enums.Priorite
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    categorie?: CategorieUpdateOneWithoutTachesNestedInput
    fichiers_joints?: FicherJointUpdateManyWithoutTacheNestedInput
    projet?: ProjetUpdateOneRequiredWithoutTachesNestedInput
  }

  export type TacheUncheckedUpdateWithoutUtilisateurInput = {
    id_tache?: IntFieldUpdateOperationsInput | number
    titre?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    date_limite?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    priorite?: EnumPrioriteFieldUpdateOperationsInput | $Enums.Priorite
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    id_categorie?: NullableIntFieldUpdateOperationsInput | number | null
    id_projet?: IntFieldUpdateOperationsInput | number
    fichiers_joints?: FicherJointUncheckedUpdateManyWithoutTacheNestedInput
  }

  export type TacheUncheckedUpdateManyWithoutUtilisateurInput = {
    id_tache?: IntFieldUpdateOperationsInput | number
    titre?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    date_limite?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    priorite?: EnumPrioriteFieldUpdateOperationsInput | $Enums.Priorite
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    id_categorie?: NullableIntFieldUpdateOperationsInput | number | null
    id_projet?: IntFieldUpdateOperationsInput | number
  }

  export type CategorieCreateManyProjetInput = {
    id_categorie?: number
    nom: string
  }

  export type TacheCreateManyProjetInput = {
    id_tache?: number
    titre: string
    description?: string | null
    date_limite?: Date | string | null
    priorite: $Enums.Priorite
    status?: $Enums.Status
    id_categorie?: number | null
    id_utilisateur: number
  }

  export type CategorieUpdateWithoutProjetInput = {
    nom?: StringFieldUpdateOperationsInput | string
    taches?: TacheUpdateManyWithoutCategorieNestedInput
  }

  export type CategorieUncheckedUpdateWithoutProjetInput = {
    id_categorie?: IntFieldUpdateOperationsInput | number
    nom?: StringFieldUpdateOperationsInput | string
    taches?: TacheUncheckedUpdateManyWithoutCategorieNestedInput
  }

  export type CategorieUncheckedUpdateManyWithoutProjetInput = {
    id_categorie?: IntFieldUpdateOperationsInput | number
    nom?: StringFieldUpdateOperationsInput | string
  }

  export type TacheUpdateWithoutProjetInput = {
    titre?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    date_limite?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    priorite?: EnumPrioriteFieldUpdateOperationsInput | $Enums.Priorite
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    categorie?: CategorieUpdateOneWithoutTachesNestedInput
    utilisateur?: UtilisateurUpdateOneRequiredWithoutTachesNestedInput
    fichiers_joints?: FicherJointUpdateManyWithoutTacheNestedInput
  }

  export type TacheUncheckedUpdateWithoutProjetInput = {
    id_tache?: IntFieldUpdateOperationsInput | number
    titre?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    date_limite?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    priorite?: EnumPrioriteFieldUpdateOperationsInput | $Enums.Priorite
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    id_categorie?: NullableIntFieldUpdateOperationsInput | number | null
    id_utilisateur?: IntFieldUpdateOperationsInput | number
    fichiers_joints?: FicherJointUncheckedUpdateManyWithoutTacheNestedInput
  }

  export type TacheUncheckedUpdateManyWithoutProjetInput = {
    id_tache?: IntFieldUpdateOperationsInput | number
    titre?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    date_limite?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    priorite?: EnumPrioriteFieldUpdateOperationsInput | $Enums.Priorite
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    id_categorie?: NullableIntFieldUpdateOperationsInput | number | null
    id_utilisateur?: IntFieldUpdateOperationsInput | number
  }

  export type TacheCreateManyCategorieInput = {
    id_tache?: number
    titre: string
    description?: string | null
    date_limite?: Date | string | null
    priorite: $Enums.Priorite
    status?: $Enums.Status
    id_utilisateur: number
    id_projet: number
  }

  export type TacheUpdateWithoutCategorieInput = {
    titre?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    date_limite?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    priorite?: EnumPrioriteFieldUpdateOperationsInput | $Enums.Priorite
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    utilisateur?: UtilisateurUpdateOneRequiredWithoutTachesNestedInput
    fichiers_joints?: FicherJointUpdateManyWithoutTacheNestedInput
    projet?: ProjetUpdateOneRequiredWithoutTachesNestedInput
  }

  export type TacheUncheckedUpdateWithoutCategorieInput = {
    id_tache?: IntFieldUpdateOperationsInput | number
    titre?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    date_limite?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    priorite?: EnumPrioriteFieldUpdateOperationsInput | $Enums.Priorite
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    id_utilisateur?: IntFieldUpdateOperationsInput | number
    id_projet?: IntFieldUpdateOperationsInput | number
    fichiers_joints?: FicherJointUncheckedUpdateManyWithoutTacheNestedInput
  }

  export type TacheUncheckedUpdateManyWithoutCategorieInput = {
    id_tache?: IntFieldUpdateOperationsInput | number
    titre?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    date_limite?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    priorite?: EnumPrioriteFieldUpdateOperationsInput | $Enums.Priorite
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    id_utilisateur?: IntFieldUpdateOperationsInput | number
    id_projet?: IntFieldUpdateOperationsInput | number
  }

  export type FicherJointCreateManyTacheInput = {
    id_ficher?: number
    url: string
    nom: string
  }

  export type FicherJointUpdateWithoutTacheInput = {
    url?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
  }

  export type FicherJointUncheckedUpdateWithoutTacheInput = {
    id_ficher?: IntFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
  }

  export type FicherJointUncheckedUpdateManyWithoutTacheInput = {
    id_ficher?: IntFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}