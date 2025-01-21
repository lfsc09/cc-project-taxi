import AccountDAODatabase from './infra/dao/Account/AccountDAODatabase';
import RideDAODatabase from './infra/dao/Ride/RideDAODatabase';
import PgPromiseAdapter from './infra/database/PostgresqlAdapter';
import Registry from './infra/DI';
import ExpressAdapter from './infra/http/ExpressAdapter';
import AccountRepositoryDatabase from './infra/repository/Account/AccountRepositoryDatabase';
import RideRepositoryDatabase from './infra/repository/Ride/RideRepositoryDatabase';
import AccountController from './infra/routes/AccountController';
import PositionController from './infra/routes/PositionController';
import RideController from './infra/routes/RideController';

try {
    const httpServer = new ExpressAdapter();
    Registry.getInstance().provide('httpServer', httpServer);
    Registry.getInstance().provide('postgreSQL', new PgPromiseAdapter(process.env.POSTGRES_HOST, process.env.POSTGRES_PORT, process.env.POSTGRES_PASS, process.env.POSTGRES_DB));
    Registry.getInstance().provide('accountDAO', new AccountDAODatabase());
    Registry.getInstance().provide('accountRepository', new AccountRepositoryDatabase());
    Registry.getInstance().provide('rideDAO', new RideDAODatabase());
    Registry.getInstance().provide('rideRepository', new RideRepositoryDatabase());
    new AccountController();
    new RideController();
    new PositionController();
    httpServer.listen(3000);
} catch (error: any) {
    console.error(error.message);
}
