import Ride from '../../../core/entity/Ride';
import RideRepository from './RideRepository';

export default class RideRepositoryMemory implements RideRepository {
    rides: Ride[] = [];

    async hasUncompletedRides(accountId: string): Promise<boolean> {
        return !!this.rides.find((ride: Ride) => ride.getPassengerId() === accountId && ride.getStatus() !== 'completed');
    }

    async requestRide(ride: Ride): Promise<void> {
        this.rides.push(ride);
    }
}
