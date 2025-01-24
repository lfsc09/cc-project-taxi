import pgPromise from 'pg-promise';
import pg from 'pg-promise/typescript/pg-subset';
import DatabaseConnection from './DatabaseConnection';

export default class PgPromiseAdapter implements DatabaseConnection {
    private connection: pgPromise.IDatabase<{}, pg.IClient>;

    constructor(host: string | undefined, port: string | undefined, password: string | undefined, db: string | undefined) {
        try {
            if (!host) throw new Error('No host informed to connect in PostgreSQL.');
            if (!port) throw new Error('No port informed to connect in PostgreSQL.');
            if (!password) throw new Error('No password informed to connect in PostgreSQL.');
            if (!db) throw new Error('No db informed to connect in PostgreSQL.');
            this.connection = pgPromise()(`postgres://postgres:${password}@${host}:${port}/${db}`);
            console.log(`Connected to postgres://postgres:${password}@${host}:${port}/${db}`);
        } catch (error) {
            throw new Error('Unable to connect to PostgreSQL.');
        }
    }

    query(queryString: string, params: any): Promise<any> {
        return this.connection?.query(queryString, params);
    }

    each(queryString: string, params: any, callback: (row: any, index: number, data: any[]) => void): Promise<any> {
        return this.connection?.each(queryString, params, callback);
    }

    async end(): Promise<void> {
        await this.connection?.$pool.end();
    }
}
