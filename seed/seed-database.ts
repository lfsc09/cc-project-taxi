import pgPromise from 'pg-promise';
import pg from 'pg-promise/typescript/pg-subset';

class Seed {
    private connection: pgPromise.IDatabase<{}, pg.IClient>;

    constructor(host: string | undefined, port: string | undefined, password: string | undefined, db: string | undefined) {
        if (!host) throw new Error('[SEEDING] No host informed to connect in PostgreSQL.');
        if (!port) throw new Error('[SEEDING] No port informed to connect in PostgreSQL.');
        if (!password) throw new Error('[SEEDING] No password informed to connect in PostgreSQL.');
        if (!db) throw new Error('[SEEDING] No db informed to connect in PostgreSQL.');

        try {
            this.connection = pgPromise()(`postgres://postgres:${password}@${host}:${port}/${db}`);
            console.log(`[SEEDING] Connected to postgres://postgres:${password}@${host}:${port}/${db}`);
        } catch (error: any) {
            throw new Error('[SEEDING] Unable to connect to PostgreSQL.');
        }
    }

    async clearDB(): Promise<void> {
        try {
            console.log('[SEEDING] Clearing DB...');
            await this.connection.query(
                `
                    TRUNCATE account, ride, position;
                `,
            );
            console.log('[SEEDING] DB Cleared');
        } catch (error: any) {
            throw new Error('[SEEDING] Failed to clear DB.');
        }
    }

    async seedAccounts(): Promise<void> {
        try {
            console.log('[SEEDING] Start [Account] seeding...');
            const seedValues = [
                {
                    account_id: '87549960-5557-443e-86c7-3021b3cf9e04',
                    name: 'Jonas Prosta',
                    email: 'jonas@gmail.com',
                    cpf: '97456321558',
                    car_plate: null,
                    is_passenger: true,
                    is_driver: false,
                    password: '123456',
                },
                {
                    account_id: '61fa0396-d73a-487c-abf9-83a64bfc7dd4',
                    name: 'Jonas Kaban',
                    email: 'jkab@gmail.com',
                    cpf: '97456321558',
                    car_plate: 'ZZZ0000',
                    is_passenger: false,
                    is_driver: true,
                    password: '123456',
                },
            ];
            await this.connection.tx((t) => {
                let queries = seedValues.map((sV) => {
                    return t.none(
                        `
                            INSERT INTO
                                account (account_id, name, email, cpf, car_plate, is_passenger, is_driver, password)
                            VALUES
                                (\${account_id}, \${name}, \${email}, \${cpf}, \${car_plate}, \${is_passenger}, \${is_driver}, \${password});
                        `,
                        sV,
                    );
                });
                return t.batch(queries);
            });
            console.log('[SEEDING] Seeding [Account] completed');
        } catch (error: any) {
            console.error(error);
            throw new Error('[SEEDING] Failed to seed [Account].');
        }
    }

    async seedRides(): Promise<void> {
        try {
            console.log('[SEEDING] Start [Ride] seeding...');
            const seedValues = [
                {
                    ride_id: '0d63a8cf-1607-4b53-b9a4-1d9623caa8f9',
                    passenger_id: '87549960-5557-443e-86c7-3021b3cf9e04',
                    status: 'requested',
                    from_lat: -25.4451499,
                    from_long: -49.307889,
                    to_lat: -25.460001020387935,
                    to_long: -49.265266248935745,
                    date: new Date().toISOString(),
                },
            ];
            await this.connection.tx((t) => {
                let queries = seedValues.map((sV) => {
                    return t.none(
                        `
                            INSERT INTO
                                ride (ride_id, passenger_id, status, from_lat, from_long, to_lat, to_long, date)
                            VALUES
                                (\${ride_id}, \${passenger_id}, \${status}, \${from_lat}, \${from_long}, \${to_lat}, \${to_long}, \${date});
                        `,
                        sV,
                    );
                });
                return t.batch(queries);
            });
            console.log('[SEEDING] Seeding [Ride] completed');
        } catch (error: any) {
            throw new Error('[SEEDING] Failed to seed [Ride].');
        }
    }

    async seedPositions(): Promise<void> {
        return;
    }
}

async function main(): Promise<void> {
    try {
        const seed = new Seed(process.env.POSTGRES_HOST, process.env.POSTGRES_PORT, process.env.POSTGRES_PASS, process.env.POSTGRES_DB);
        await seed.clearDB();
        await seed.seedAccounts();
        await seed.seedRides();
        await seed.seedPositions();
    } catch (error: any) {
        console.error(error.message);
    }
}

main();
