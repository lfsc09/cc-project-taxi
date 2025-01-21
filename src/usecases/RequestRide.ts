import Ride from '../core/entity/Ride';
import { inject } from '../infra/DI';
import AccountRepository from '../infra/repository/Account/AccountRepository';
import RideRepository from '../infra/repository/Ride/RideRepository';

export default class RequestRide {
    @inject('accountRepository')
    accountRepository?: AccountRepository;
    @inject('rideRepository')
    rideRepository?: RideRepository;

    async execute(input: RequestRideInput): Promise<RequestRideOutput> {
        const newRide = Ride.create(input.passengerId, input.fromLat, input.fromLong, input.toLat, input.toLong);

        const isPassenger = await this.accountRepository?.isAccountPassenger(newRide.getPassengerId());
        if (!isPassenger) throw new Error('Not a Passenger.');

        const hasUncompletedRides = await this.rideRepository?.hasUncompletedRides(newRide.getPassengerId());
        if (hasUncompletedRides) throw new Error('Cannot request another ride.');

        await this.rideRepository?.createRide(newRide);

        return { rideId: newRide.getRideId() };
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
