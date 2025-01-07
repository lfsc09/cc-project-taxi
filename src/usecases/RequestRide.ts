import AccountDAO from '../infra/dao/Account/AccountDAO';
import RideDAO from '../infra/dao/Ride/RideDAO';
import { inject } from '../infra/DI';

export default class RequestRide {
    @inject('accountDAO')
    accountDAO?: AccountDAO;
    @inject('rideDAO')
    rideDAO?: RideDAO;

    async execute(input: RequestRideInput): Promise<RequestRideOutput> {
        const isPassenger = await this.accountDAO?.isAccountPassenger(input.passengerId);
        if (!isPassenger) throw new Error('Not a Passenger.');

        const hasUncompletedRides = await this.rideDAO?.hasUncompletedRides(input.passengerId);
        if (hasUncompletedRides) throw new Error('Cannot request another ride.');

        const newRideId = crypto.randomUUID();
        await this.rideDAO?.requestRide({
            rideId: newRideId,
            passengerId: input.passengerId,
            status: 'requested',
            from: {
                lat: input.fromLat,
                long: input.fromLong,
            },
            to: {
                lat: input.toLat,
                long: input.toLong,
            },
            date: new Date().toISOString(),
        });

        return { rideId: newRideId };
    }
}

export interface RequestRideInput {
    passengerId: string;
    fromLat: number;
    fromLong: number;
    toLat: number;
    toLong: number;
}
export interface RequestRideOutput {
    rideId: string;
}
