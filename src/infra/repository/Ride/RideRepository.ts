import Ride from "../../../core/entity/Ride";

export default interface RideRepository {
    getRideById(rideId: string): Promise<Ride | undefined>;
    hasUncompletedRides(accountId: string): Promise<boolean>;
    isDriverAlreadyOnARide(accountId: string): Promise<boolean>;
    createRide(ride: Ride): Promise<void>;
    updateRide(ride: Ride): Promise<void>;
}