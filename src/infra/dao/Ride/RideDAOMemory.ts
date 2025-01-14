import RideDAO, { GetRideByIdOutput } from './RideDAO';

export default class RideDAOMemory implements RideDAO {
    rides: Ride[] = [];

    async getRideById(rideId: string): Promise<GetRideByIdOutput> {
        return this.rides.find((ride: Ride) => ride.ride_id === rideId) as GetRideByIdOutput;
    }
}

interface Ride {
    ride_id: string;
    passenger_id: string;
    driver_id: string;
    status: 'requested' | 'accepted' | 'in_progress' | 'completed';
    fare: number;
    distance: number;
    from_lat: number;
    from_long: number;
    to_lat: number;
    to_long: number;
    date: string;
}
