import PgPromiseAdapter from '../../database/PostgreSQL';
import { inject } from '../../DI';
import RideDAO, { GetRideByIdOutput } from './RideDAO';

export default class RideDAODatabase implements RideDAO {
    @inject('postgreSQL')
    dbConn?: PgPromiseAdapter;

    async getRideById(rideId: string): Promise<GetRideByIdOutput> {
        const [ride] = await this.dbConn?.query('SELECT * FROM ccca.ride WHERE ride_id = $1', [rideId]);
        return ride;
    }
}
