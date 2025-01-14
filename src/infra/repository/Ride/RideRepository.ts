export default interface RideRepository {
    hasUncompletedRides(accountId: string): Promise<boolean>;
    requestRide(ride: Ride): Promise<void>;
}