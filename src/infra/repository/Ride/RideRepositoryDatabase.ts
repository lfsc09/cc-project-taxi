import Ride from '../../../core/entity/Ride';
import PgPromiseAdapter from '../../database/PostgreSQL';
import { inject } from '../../DI';
import RideRepository from './RideRepository';

export default class RideRepositoryDatabase implements RideRepository {
    @inject('postgreSQL')
    dbConn?: PgPromiseAdapter;

    async hasUncompletedRides(accountId: string): Promise<boolean> {
        const [ride] = await this.dbConn?.query('SELECT * FROM ccca.ride WHERE passenger_id = $1 AND status <> "completed"', [accountId]);
        return !!ride;
    }

    async requestRide(ride: Ride): Promise<void> {
        await this.dbConn?.query('INSERT INTO ccca.account (ride_id, passenger_id, status, from_lat, from_long, to_lat, to_long, date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', [
            ride.getRideId(),
            ride.getPassengerId(),
            ride.getStatus(),
            ride.getFromLat(),
            ride.getFromLong(),
            ride.getToLat(),
            ride.getToLong(),
            ride.getDate().toISOString(),
        ]);
    }
}
