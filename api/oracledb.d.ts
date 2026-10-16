// Declaração mínima do oracledb (o pacote não traz tipos).
declare module 'oracledb' {
  export interface Result<T> {
    rows?: T[];
    outBinds?: Record<string, unknown>;
  }
  export interface Connection {
    execute<T = Record<string, unknown>>(
      sql: string,
      binds?: Record<string, unknown>,
      options?: Record<string, unknown>,
    ): Promise<Result<T>>;
    commit(): Promise<void>;
    close(): Promise<void>;
  }
  export interface Pool {
    getConnection(): Promise<Connection>;
    close(drainTime?: number): Promise<void>;
  }
  const oracledb: {
    OUT_FORMAT_OBJECT: number;
    BIND_OUT: number;
    NUMBER: number;
    createPool(config: {
      user: string;
      password: string;
      connectString: string;
      poolMin?: number;
      poolMax?: number;
    }): Promise<Pool>;
  };
  export default oracledb;
}
