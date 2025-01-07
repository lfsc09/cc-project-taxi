import RideDAO, { GetRideByIdOutput } from '../infra/dao/Ride/RideDAO';
import { inject } from '../infra/DI';

export default class GetRide {
    @inject('rideDAO')
    rideDAO?: RideDAO;

    async execute(rideId: string): Promise<GetRideOutput> {
        const ride = await this.rideDAO?.getRideById(rideId);
        if (!ride) throw new Error('Not Found.');
        return ride;
    }
}

export interface GetRideOutput extends GetRideByIdOutput {}
