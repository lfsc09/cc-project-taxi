import { inject } from '../infra/DI';
import PositionRepository from '../infra/repository/Position/PositionRepository';
import RideRepository from '../infra/repository/Ride/RideRepository';

export default class FinishRide {
    @inject('rideRepository')
    rideRepository?: RideRepository;
    @inject('positionRepository')
    positionRepository?: PositionRepository;

    async execute(input: FinishRideInput): Promise<void> {
        const ride = await this.rideRepository?.getRideById(input.rideId);
        if (!ride) throw new Error('Not found.');

        const positions = await this.positionRepository?.getRidePositions(input.rideId);

        ride.finish(positions);

        await this.rideRepository?.updateRide(ride);
    }
}

export interface FinishRideInput {
    rideId: string;
}
