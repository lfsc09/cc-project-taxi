import { inject } from '../infra/DI';
import AccountRepository from '../infra/repository/Account/AccountRepository';
import RideRepository from '../infra/repository/Ride/RideRepository';

export default class StartRide {
    @inject('accountRepository')
    accountRepository?: AccountRepository;
    @inject('rideRepository')
    rideRepository?: RideRepository;

    async execute(input: StartRideInput): Promise<void> {
        const ride = await this.rideRepository?.getRideById(input.rideId);
        if (!ride) throw new Error('Not found.');

        ride.start();

        await this.rideRepository?.updateRide(ride);
    }
}

export interface StartRideInput {
    rideId: string;
}
