import { inject } from '../infra/DI';
import AccountRepository from '../infra/repository/Account/AccountRepository';
import RideRepository from '../infra/repository/Ride/RideRepository';

export default class AcceptRide {
    @inject('accountRepository')
    accountRepository?: AccountRepository;
    @inject('rideRepository')
    rideRepository?: RideRepository;

    async execute(input: AcceptRideInput): Promise<void> {
        const isDriver = await this.accountRepository?.isAccountDriver(input.driverId);
        if (!isDriver) throw new Error('Not a driver.');

        const isAlreadyOnARide = await this.rideRepository?.isDriverAlreadyOnARide(input.driverId);
        if (isAlreadyOnARide) throw new Error('Driver already on a ride.');

        const ride = await this.rideRepository?.getRideById(input.rideId);
        if (!ride) throw new Error('Not found.');

        ride.accept(input.driverId);

        await this.rideRepository?.updateRide(ride);
    }
}

export interface AcceptRideInput {
    rideId: string;
    driverId: string;
}
