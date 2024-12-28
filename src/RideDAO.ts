export default interface RideDAO {
    getRideById(rideId: string): Promise<GetRideByIdOutput>;
    hasUncompletedRides(accountId: string): Promise<boolean>;
    requestRide(ride: RequestRideInput): Promise<void>;
}

export interface GetRideByIdOutput {
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

export interface RequestRideInput {
    rideId: string;
    passengerId: string;
    status: 'requested';
    from: {
        lat: number;
        long: number;
    };
    to: {
        lat: number;
        long: number;
    };
    date: string;
}
