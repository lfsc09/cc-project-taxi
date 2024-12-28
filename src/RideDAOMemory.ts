import RideDAO, { GetRideByIdOutput, RequestRideInput } from './RideDAO';

export default class RideDAOMemory implements RideDAO {
    private rides: Ride[] = [];

    async getRideById(rideId: string): Promise<GetRideByIdOutput> {
        return this.rides.find((ride: Ride) => ride.ride_id === rideId) as GetRideByIdOutput;
    }

    async hasUncompletedRides(accountId: string): Promise<boolean> {
        return !!this.rides.find((ride: Ride) => ride.passenger_id === accountId && ride.status !== 'completed');
    }

    async requestRide(ride: RequestRideInput): Promise<void> {
        this.rides.push({
            ride_id: ride.rideId,
            passenger_id: ride.passengerId,
            driver_id: '',
            status: ride.status,
            fare: 0,
            distance: 0,
            from_lat: ride.from.lat,
            from_long: ride.from.long,
            to_lat: ride.to.lat,
            to_long: ride.to.long,
            date: ride.date,
        });
    }
}

interface Ride {
    ride_id: string;
    passenger_id: string;
    driver_id: string;
    status: 'requested' | 'accepted' | 'on_going' | 'completed';
    fare: number;
    distance: number;
    from_lat: number;
    from_long: number;
    to_lat: number;
    to_long: number;
    date: string;
}
