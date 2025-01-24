import PgPromiseAdapter from '../../database/PostgresqlAdapter';
import { inject } from '../../DI';
import RideDAO, { GetRideByIdOutput } from './RideDAO';

export default class RideDAODatabase implements RideDAO {
    @inject('postgreSQL')
    dbConn?: PgPromiseAdapter;

    async getRideById(rideId: string): Promise<GetRideByIdOutput> {
        const [ride] = await this.dbConn?.query(
            `
                SELECT *
                FROM
                    ride
                WHERE
                    ride_id = $1
                ;
            `,
            [rideId],
        );
        return ride;
    }
}
