import RideDAO, { GetRideByIdOutput } from './RideDAO';

export default class GetRide {
    constructor(private readonly rideDAO: RideDAO) {}

    async execute(rideId: string): Promise<GetRideOutput> {
        const ride = await this.rideDAO.getRideById(rideId);
        if (!ride) throw new Error('Not Found.');
        return ride;
    }
}

export interface GetRideOutput extends GetRideByIdOutput {}
