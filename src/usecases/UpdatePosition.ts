import Position from '../core/entity/Position';
import { inject } from '../infra/DI';
import PositionRepository from '../infra/repository/Position/PositionRepository';
import RideRepository from '../infra/repository/Ride/RideRepository';

export default class UpdatePosition {
    @inject('rideRepository')
    rideRepository?: RideRepository;
    @inject('positionRepository')
    positionRepository?: PositionRepository;

    async execute(input: UpdatePositionInput): Promise<void> {
        const ride = await this.rideRepository?.getRideById(input.rideId);
        if (!ride) throw new Error('Not found.');
        if (!ride.isInProgress()) throw new Error('Ride not in progress.');

        const position = Position.create(input.rideId, input.lat, input.long);

        await this.positionRepository?.createPosition(position);
    }
}

export interface UpdatePositionInput {
    rideId: string;
    lat: number;
    long: number;
}
