import { DbConn } from './main';
import RideDAO, { GetRideByIdOutput, RequestRideInput } from './RideDAO';

export default class RideDAODatabase implements RideDAO {
    constructor(private readonly conn: DbConn) {}

    async getRideById(rideId: string): Promise<GetRideByIdOutput> {
        const [ride] = await this.conn.query('SELECT * FROM ccca.ride WHERE ride_id = $1', [rideId]);
        return ride;
    }

    async hasUncompletedRides(accountId: string): Promise<boolean> {
        const [ride] = await this.conn.query('SELECT * FROM ccca.ride WHERE passenger_id = $1 AND status <> "completed"', [accountId]);
        return !!ride;
    }

    async requestRide(ride: RequestRideInput): Promise<void> {
        await this.conn.query('INSERT INTO ccca.account (ride_id, passenger_id, status, from_lat, from_long, to_lat, to_long, date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', [
            ride.rideId,
            ride.passengerId,
            ride.status,
            ride.from.lat,
            ride.from.long,
            ride.to.lat,
            ride.to.long,
            ride.date,
        ]);
    }
}
