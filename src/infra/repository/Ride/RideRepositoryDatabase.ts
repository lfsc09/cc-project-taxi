import Ride from '../../../core/entity/Ride';
import PgPromiseAdapter from '../../database/PostgresqlAdapter';
import { inject } from '../../DI';
import RideRepository from './RideRepository';

export default class RideRepositoryDatabase implements RideRepository {
    @inject('postgreSQL')
    dbConn?: PgPromiseAdapter;

    async getRideById(rideId: string): Promise<Ride | undefined> {
        const [ride] = await this.dbConn?.query(
            `
                SELECT *
                FROM
                    ccca.ride
                WHERE
                    ride_id = $1
                ;
            `,
            [rideId],
        );
        if (ride)
            return Ride.restore(
                ride.ride_id,
                ride.passenger_id,
                ride.driver_id,
                ride.status,
                ride.fare,
                ride.distance,
                ride.from_lat,
                ride.from_long,
                ride.to_lat,
                ride.to_long,
                ride.date,
            );
        return undefined;
    }

    async hasUncompletedRides(accountId: string): Promise<boolean> {
        const [ride] = await this.dbConn?.query(
            `
                SELECT *
                FROM
                    ccca.ride
                WHERE
                    passenger_id = $1 AND
                    status <> "completed"
                ;
            `,
            [accountId],
        );
        return !!ride;
    }

    async isDriverAlreadyOnARide(accountId: string): Promise<boolean> {
        const [ride] = await this.dbConn?.query(
            `
                SELECT *
                FROM
                    ccca.ride
                WHERE
                    driver_id = $1 AND
                    (status = "accepted" OR status = "in_progress")
                ;
            `,
            [accountId],
        );
        return !!ride;
    }

    async createRide(ride: Ride): Promise<void> {
        await this.dbConn?.query(
            `
                INSERT INTO
                    ccca.account (ride_id, passenger_id, status, from_lat, from_long, to_lat, to_long, date)
                VALUES
                    ($1, $2, $3, $4, $5, $6, $7, $8)
                ;
            `,
            [ride.getRideId(), ride.getPassengerId(), ride.getStatus(), ride.getFromLat(), ride.getFromLong(), ride.getToLat(), ride.getToLong(), ride.getDate().toISOString()],
        );
    }

    async updateRide(ride: Ride): Promise<void> {
        await this.dbConn?.query(
            `
                UPDATE
                    ccca.account
                SET
                    driver_id = $2,
                    status = $3,
                    fare = $4,
                    distance = $5,
                WHERE
                    ride_id = $1
                ;
            `,
            [ride.getRideId(), ride.getDriverId() ?? '', ride.getStatus(), ride.getFare() ?? 0, ride.getDistance() ?? 0],
        );
    }
}
