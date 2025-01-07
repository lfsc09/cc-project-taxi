import AccountDAODatabase from './infra/dao/Account/AccountDAODatabase';
import RideDAODatabase from './infra/dao/Ride/RideDAODatabase';
import PgPromiseAdapter from './infra/database/PostgreSQL';
import Registry from './infra/DI';
import ExpressAdapter from './infra/http/Express';

const POSTGRES_PASS = '123456';
const POSTGRES_HOST = '127.0.0.1';
const POSTGRES_PORT = 5432;
const POSTGRES_DB = 'app';

try {
    const httpServer = new ExpressAdapter();
    Registry.getInstance().provide('httpServer', httpServer);
    Registry.getInstance().provide('postgreSQL', new PgPromiseAdapter(POSTGRES_HOST, POSTGRES_PORT, POSTGRES_PASS, POSTGRES_DB));
    Registry.getInstance().provide('accountDAO', new AccountDAODatabase());
    Registry.getInstance().provide('rideDAO', new RideDAODatabase());
    httpServer.listen(3000);
} catch (error: any) {
    console.error(error.message);
}
