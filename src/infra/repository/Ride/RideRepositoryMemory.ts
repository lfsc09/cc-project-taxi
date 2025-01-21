import Ride from '../../../core/entity/Ride';
import RideRepository from './RideRepository';

export default class RideRepositoryMemory implements RideRepository {
    rides: Ride[] = [];

    async getRideById(rideId: string): Promise<Ride | undefined> {
        return this.rides.find((ride: Ride) => ride.getRideId() === rideId);
    }

    async hasUncompletedRides(accountId: string): Promise<boolean> {
        return !!this.rides.find((ride: Ride) => ride.getPassengerId() === accountId && ride.getStatus() !== 'completed');
    }

    async isDriverAlreadyOnARide(accountId: string): Promise<boolean> {
        return !!this.rides.find((ride: Ride) => ride.getDriverId() === accountId && (ride.getStatus() === 'accepted' || ride.getStatus() === 'in_progress'));
    }

    async createRide(ride: Ride): Promise<void> {
        this.rides.push(ride);
    }

    async updateRide(newRide: Ride): Promise<void> {
        const rideIdx = this.rides.findIndex((ride: Ride) => ride.getRideId() === newRide.getRideId());
        if (rideIdx !== -1) this.rides.splice(rideIdx, 1);
        this.rides.push(newRide);
    }
}
