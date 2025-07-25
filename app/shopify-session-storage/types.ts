import {Session} from '~/shopify-api/lib';

/**
 * Defines the strategy to be used to store sessions for the Shopify App.
 */
export interface SessionStorage {
  /**
   * Creates or updates the given session in storage.
   *
   * @param session Session to store
   */
  storeSession(session: Session): Promise<boolean>;

  /**
   * Loads a session from storage.
   *
   * @param id Id of the session to load
   */
  loadSession(id: string): Promise<Session | undefined>;

  /**
   * Deletes a session from storage.
   *
   * @param id Id of the session to delete
   */
  deleteSession(id: string): Promise<boolean>;

  /**
   * Deletes an array of sessions from storage.
   *
   * @param ids Array of session id's to delete
   */
  deleteSessions(ids: string[]): Promise<boolean>;

  /**
   * Return an array of sessions for a given shop (or [] if none found).
   *
   * @param shop shop of the session(s) to return
   */
  findSessionsByShop(shop: string): Promise<Session[]>;
}

/**
 * define the option required to instantiate an RDBMS session storage implementation
 */
export interface RdbmsSessionStorageOptions {
  sessionTableName: string;
  migratorOptions?: RdbmsSessionStorageMigratorOptions;
}

/**
 * Define a common way for migrator to execute query on the underlying persistence layer
 */
export interface DBConnection {
  /** the table used to store sessions */
  sessionStorageIdentifier: string;

  /**
   * Initiate the actual connection to the underlying database
   */
  connect(): Promise<void>;

  /**
   * Disconnect from the underlying database
   */
  disconnect(): Promise<void>;
}

/**
 * This is for the use cases of the RDBMS database where
 */
export interface RdbmsConnection extends DBConnection {
  /**
   * Make a query to the underlying DB
   * @param query - the query to execute
   * @param params - the parameters required by the query
   */
  query(query: string, params: any[]): Promise<any[]>;

  /**
   * Determine if a table exist
   * @param tablename - the table to search
   */
  hasTable(tablename: string): Promise<boolean>;

  /**
   * Based on the the #sqlArgumentPlaceholder value and the underlying engine, return the place holder for a given position in a list of sql argument
   * @param position the position of the given sql argument
   */
  getArgumentPlaceholder(position?: number): string;
}

/**
 * Each migration 'migration_name' will be define the following way.
 * Via a function that receive the engine in parameter.
 */
export type MigrationFunction = (engine: DBConnection) => Promise<void>;

/**
 * Defines what is needed for a migration to be execute
 */
export class MigrationOperation {
  /** Name of the migration that will be used to uniquely identity it among all other migration */
  migrationName: string;

  /** The actual migration function that will modify the perisitence storage */
  migrationFunction: MigrationFunction;

  constructor(migrationName: string, migrationFunction: MigrationFunction) {
    this.migrationName = migrationName;
    this.migrationFunction = migrationFunction;
  }
}

/**
 * Defines how database migration will be handled.
 */
export interface SessionStorageMigrator {
  /**
   * Should ensure that the persistence 'table' is created if it does not exist yet.
   */
  initMigrationPersistence(): Promise<void>;

  /**
   * Returns true if the migrationName as already been applied and
   * therefore the migrator should not apply it. if false,
   * the migrator will run the associated migration
   * @param migrationName the unique version name to look for in the migration table
   */
  hasMigrationBeenApplied(migrationName: string): Promise<boolean>;

  /**
   * Will persist that this migrationName has been applied in the migration table
   * @param migrationName the version to persisited as applied
   */
  saveAppliedMigration(migrationName: string): Promise<void>;

  /**
   * Return a list MigrationOperation that needs to be executed
   */
  getMigrationList(): MigrationOperation[];

  /**
   * Will iterate over the map returned by #getmigrationList,
   * for each entry call #hasMigrationBeenApplied, if it returns false
   * it will execute execute the function and then call #saveAppliedMigration
   * @param databaseReady - so that the migrator can wait for the database to fully up and running
   * before starting its execution.
   */
  applyMigrations(databaseReady: Promise<void>): Promise<void>;
}

/**
 * Use to initialise session storage migrators
 */
export interface SessionStorageMigratorOptions {
  migrationDBIdentifier: string;
}

export const defaultSessionStorageMigratorOptions: SessionStorageMigratorOptions =
  {
    migrationDBIdentifier: 'shopify_sessions_migrations',
  };

export interface RdbmsSessionStorageMigratorOptions
  extends SessionStorageMigratorOptions {
  migrationNameColumnName: string;
}

export const defaultRdbmsSessionStorageMigratorOptions: RdbmsSessionStorageMigratorOptions =
  {
    migrationDBIdentifier: 'shopify_sessions_migrations',
    migrationNameColumnName: 'migration_name',
  };
