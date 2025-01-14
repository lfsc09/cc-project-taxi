import Ride from '../../src/core/entity/Ride';

describe('Entity: Ride', () => {
    it('Should create new Ride as "Requested"', () => {
        const input = {
            passengerId: 'fasdffas-fasfasaf-asfasdasf-asd',
            fromLat: 10,
            fromLong: 10,
            toLat: 12,
            toLong: 12,
        };
        const ride = Ride.create(input.passengerId, input.fromLat, input.fromLong, input.toLat, input.toLong);
        expect(ride.getPassengerId()).toBe(input.passengerId);
        expect(ride.getFromLat()).toBe(input.fromLat);
        expect(ride.getFromLong()).toBe(input.fromLong);
        expect(ride.getToLat()).toBe(input.toLat);
        expect(ride.getToLong()).toBe(input.toLong);
        expect(ride.getDate()).toBeDefined();
        expect(ride.getStatus()).toBe('requested');
    });

    it('Should restore a "Requested" Ride', () => {
        const input = {
            rideId: 'fd98fd-sd09f0sd-g9sdf98g',
            passengerId: 'fasdffas-fasfasaf-asfasdasf-asd',
            status: 'requested',
            fromLat: 10,
            fromLong: 10,
            toLat: 12,
            toLong: 12,
            date: new Date().toISOString(),
        };
        const ride = Ride.restore(
            input.rideId,
            input.passengerId,
            undefined,
            input.status as 'requested',
            undefined,
            undefined,
            input.fromLat,
            input.fromLong,
            input.toLat,
            input.toLong,
            input.date,
        );
        expect(ride.getRideId()).toBe(input.rideId);
        expect(ride.getPassengerId()).toBe(input.passengerId);
        expect(ride.getStatus()).toBe(input.status);
        expect(ride.getFromLat()).toBe(input.fromLat);
        expect(ride.getFromLong()).toBe(input.fromLong);
        expect(ride.getToLat()).toBe(input.toLat);
        expect(ride.getToLong()).toBe(input.toLong);
        expect(ride.getDate().toISOString()).toBe(input.date);
    });

    it('Should restore a "Accepted" Ride', () => {
        const input = {
            rideId: 'fd98fd-sd09f0sd-g9sdf98g',
            passengerId: 'fasdffas-fasfasaf-asfasdasf-asd',
            driverId: 'fasdas-8g9f8g-sas75das',
            status: 'accepted',
            fromLat: 10,
            fromLong: 10,
            toLat: 12,
            toLong: 12,
            date: new Date().toISOString(),
        };
        const ride = Ride.restore(
            input.rideId,
            input.passengerId,
            input.driverId,
            input.status as 'accepted',
            undefined,
            undefined,
            input.fromLat,
            input.fromLong,
            input.toLat,
            input.toLong,
            input.date,
        );
        expect(ride.getRideId()).toBe(input.rideId);
        expect(ride.getPassengerId()).toBe(input.passengerId);
        expect(ride.getDriverId()).toBe(input.driverId);
        expect(ride.getStatus()).toBe(input.status);
        expect(ride.getFromLat()).toBe(input.fromLat);
        expect(ride.getFromLong()).toBe(input.fromLong);
        expect(ride.getToLat()).toBe(input.toLat);
        expect(ride.getToLong()).toBe(input.toLong);
        expect(ride.getDate().toISOString()).toBe(input.date);
    });

    it('Should restore a "In Progress" Ride', () => {
        const input = {
            rideId: 'fd98fd-sd09f0sd-g9sdf98g',
            passengerId: 'fasdffas-fasfasaf-asfasdasf-asd',
            driverId: 'fasdas-8g9f8g-sas75das',
            status: 'in_progress',
            distance: 50,
            fromLat: 10,
            fromLong: 10,
            toLat: 12,
            toLong: 12,
            date: new Date().toISOString(),
        };
        const ride = Ride.restore(
            input.rideId,
            input.passengerId,
            input.driverId,
            input.status as 'accepted',
            undefined,
            input.distance,
            input.fromLat,
            input.fromLong,
            input.toLat,
            input.toLong,
            input.date,
        );
        expect(ride.getRideId()).toBe(input.rideId);
        expect(ride.getPassengerId()).toBe(input.passengerId);
        expect(ride.getDriverId()).toBe(input.driverId);
        expect(ride.getStatus()).toBe(input.status);
        expect(ride.getDistance()).toBe(input.distance);
        expect(ride.getFromLat()).toBe(input.fromLat);
        expect(ride.getFromLong()).toBe(input.fromLong);
        expect(ride.getToLat()).toBe(input.toLat);
        expect(ride.getToLong()).toBe(input.toLong);
        expect(ride.getDate().toISOString()).toBe(input.date);
    });

    it('Should restore a "Completed" Ride', () => {
        const input = {
            rideId: 'fd98fd-sd09f0sd-g9sdf98g',
            passengerId: 'fasdffas-fasfasaf-asfasdasf-asd',
            driverId: 'fasdas-8g9f8g-sas75das',
            status: 'in_progress',
            fare: 49.78,
            distance: 50,
            fromLat: 10,
            fromLong: 10,
            toLat: 12,
            toLong: 12,
            date: new Date().toISOString(),
        };
        const ride = Ride.restore(
            input.rideId,
            input.passengerId,
            input.driverId,
            input.status as 'accepted',
            input.fare,
            input.distance,
            input.fromLat,
            input.fromLong,
            input.toLat,
            input.toLong,
            input.date,
        );
        expect(ride.getRideId()).toBe(input.rideId);
        expect(ride.getPassengerId()).toBe(input.passengerId);
        expect(ride.getDriverId()).toBe(input.driverId);
        expect(ride.getStatus()).toBe(input.status);
        expect(ride.getFare()).toBe(input.fare);
        expect(ride.getDistance()).toBe(input.distance);
        expect(ride.getFromLat()).toBe(input.fromLat);
        expect(ride.getFromLong()).toBe(input.fromLong);
        expect(ride.getToLat()).toBe(input.toLat);
        expect(ride.getToLong()).toBe(input.toLong);
        expect(ride.getDate().toISOString()).toBe(input.date);
    });
});
