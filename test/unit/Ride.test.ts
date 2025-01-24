import Position from '../../src/core/entity/Position';
import Ride from '../../src/core/entity/Ride';

describe('Entity: Ride', () => {
    it('Should create new Ride as "Requested"', () => {
        const input = {
            passengerId: crypto.randomUUID(),
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
            rideId: crypto.randomUUID(),
            passengerId: crypto.randomUUID(),
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
        expect(ride.getDriverId()).toBeUndefined();
        expect(ride.getStatus()).toBe(input.status);
        expect(ride.getFare()).toBeUndefined();
        expect(ride.getDistance()).toBeUndefined();
        expect(ride.getFromLat()).toBe(input.fromLat);
        expect(ride.getFromLong()).toBe(input.fromLong);
        expect(ride.getToLat()).toBe(input.toLat);
        expect(ride.getToLong()).toBe(input.toLong);
        expect(ride.getDate().toISOString()).toBe(input.date);
    });

    it('Should restore a "Accepted" Ride', () => {
        const input = {
            rideId: crypto.randomUUID(),
            passengerId: crypto.randomUUID(),
            driverId: crypto.randomUUID(),
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
        expect(ride.getFare()).toBeUndefined();
        expect(ride.getDistance()).toBeUndefined();
        expect(ride.getFromLat()).toBe(input.fromLat);
        expect(ride.getFromLong()).toBe(input.fromLong);
        expect(ride.getToLat()).toBe(input.toLat);
        expect(ride.getToLong()).toBe(input.toLong);
        expect(ride.getDate().toISOString()).toBe(input.date);
    });

    it('Should restore a "In Progress" Ride', () => {
        const input = {
            rideId: crypto.randomUUID(),
            passengerId: crypto.randomUUID(),
            driverId: crypto.randomUUID(),
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
            input.status as 'in_progress',
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
        expect(ride.getFare()).toBeUndefined();
        expect(ride.getDistance()).toBe(input.distance);
        expect(ride.getFromLat()).toBe(input.fromLat);
        expect(ride.getFromLong()).toBe(input.fromLong);
        expect(ride.getToLat()).toBe(input.toLat);
        expect(ride.getToLong()).toBe(input.toLong);
        expect(ride.getDate().toISOString()).toBe(input.date);
    });

    it('Should restore a "Completed" Ride', () => {
        const input = {
            rideId: crypto.randomUUID(),
            passengerId: crypto.randomUUID(),
            driverId: crypto.randomUUID(),
            status: 'completed',
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
            input.status as 'completed',
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

    it('Should return "true" for `isInProgress()`', () => {
        const ride = Ride.restore(crypto.randomUUID(), crypto.randomUUID(), crypto.randomUUID(), 'in_progress', undefined, 50, 10, 10, 12, 12, new Date().toISOString());
        expect(ride.isInProgress()).toBeTruthy();
    });

    it('Should return "false" for `isInProgress()`', () => {
        let ride = Ride.restore(crypto.randomUUID(), crypto.randomUUID(), undefined, 'requested', undefined, undefined, 10, 10, 12, 12, new Date().toISOString());
        expect(ride.isInProgress()).toBeFalsy();
        ride = Ride.restore(crypto.randomUUID(), crypto.randomUUID(), crypto.randomUUID(), 'accepted', undefined, undefined, 10, 10, 12, 12, new Date().toISOString());
        expect(ride.isInProgress()).toBeFalsy();
        ride = Ride.restore(crypto.randomUUID(), crypto.randomUUID(), crypto.randomUUID(), 'completed', 50, 18, 10, 10, 12, 12, new Date().toISOString());
        expect(ride.isInProgress()).toBeFalsy();
    });

    it('Should Accept a Ride', () => {
        const driverId = crypto.randomUUID();
        const ride = Ride.restore(crypto.randomUUID(), crypto.randomUUID(), undefined, 'requested', undefined, undefined, 10, 10, 12, 12, new Date().toISOString());
        ride.accept(driverId);
        expect(ride.getDriverId()).toBe(driverId);
        expect(ride.getStatus()).toBe('accepted');
    });

    it('Should not Accept a Ride', () => {
        const driverId = crypto.randomUUID();
        let ride = Ride.restore(crypto.randomUUID(), crypto.randomUUID(), crypto.randomUUID(), 'accepted', undefined, undefined, 10, 10, 12, 12, new Date().toISOString());
        expect(() => ride.accept(driverId)).toThrow(new Error('Invalid state.'));
        ride = Ride.restore(crypto.randomUUID(), crypto.randomUUID(), crypto.randomUUID(), 'in_progress', undefined, 15, 10, 10, 12, 12, new Date().toISOString());
        expect(() => ride.accept(driverId)).toThrow(new Error('Invalid state.'));
        ride = Ride.restore(crypto.randomUUID(), crypto.randomUUID(), crypto.randomUUID(), 'completed', 40, 15, 10, 10, 12, 12, new Date().toISOString());
        expect(() => ride.accept(driverId)).toThrow(new Error('Invalid state.'));
    });

    it('Should Start a Ride', () => {
        const ride = Ride.restore(crypto.randomUUID(), crypto.randomUUID(), crypto.randomUUID(), 'accepted', undefined, undefined, 10, 10, 12, 12, new Date().toISOString());
        ride.start();
        expect(ride.getStatus()).toBe('in_progress');
    });

    it('Should not Start a Ride', () => {
        let ride = Ride.restore(crypto.randomUUID(), crypto.randomUUID(), undefined, 'requested', undefined, undefined, 10, 10, 12, 12, new Date().toISOString());
        expect(() => ride.start()).toThrow(new Error('Invalid state.'));
        ride = Ride.restore(crypto.randomUUID(), crypto.randomUUID(), crypto.randomUUID(), 'in_progress', undefined, 15, 10, 10, 12, 12, new Date().toISOString());
        expect(() => ride.start()).toThrow(new Error('Invalid state.'));
        ride = Ride.restore(crypto.randomUUID(), crypto.randomUUID(), crypto.randomUUID(), 'completed', 40, 15, 10, 10, 12, 12, new Date().toISOString());
        expect(() => ride.start()).toThrow(new Error('Invalid state.'));
    });

    it('Should Finish a Ride [Normal fare]', () => {
        const rideId = crypto.randomUUID();
        const ride = Ride.restore(
            rideId,
            crypto.randomUUID(),
            crypto.randomUUID(),
            'in_progress',
            0,
            0,
            -25.444069,
            -49.3423676,
            -25.4454575,
            -49.3077859,
            new Date().toISOString(),
        );
        let positions: Position[] = [
            [-25.444069, -49.3423676],
            [-25.4453673, -49.3376684],
            [-25.4498939, -49.3295038],
            [-25.4511146, -49.3201911],
            [-25.4491577, -49.3125951],
            [-25.4482155, -49.3077564],
            [-25.4454575, -49.3077859],
        ].map((pos) => Position.restore(crypto.randomUUID(), rideId, pos[0], pos[1], new Date('2025-01-05T14:00:00-03:00').toISOString()));
        ride.finish(positions);
        expect(ride.getStatus()).toBe('completed');
        expect(ride.getDistance()).toBe(3.99);
        expect(ride.getFare()).toBe(8.38);
    });

    it('Should Finish a Ride [Night fare]', () => {
        const rideId = crypto.randomUUID();
        const ride = Ride.restore(
            rideId,
            crypto.randomUUID(),
            crypto.randomUUID(),
            'in_progress',
            0,
            0,
            -25.444069,
            -49.3423676,
            -25.4454575,
            -49.3077859,
            new Date().toISOString(),
        );
        let positions: Position[] = [
            [-25.444069, -49.3423676],
            [-25.4453673, -49.3376684],
            [-25.4498939, -49.3295038],
            [-25.4511146, -49.3201911],
            [-25.4491577, -49.3125951],
            [-25.4482155, -49.3077564],
            [-25.4454575, -49.3077859],
        ].map((pos) => Position.restore(crypto.randomUUID(), rideId, pos[0], pos[1], new Date('2025-01-05T23:00:00-03:00').toISOString()));
        ride.finish(positions);
        expect(ride.getStatus()).toBe('completed');
        expect(ride.getDistance()).toBe(3.99);
        expect(ride.getFare()).toBe(15.56);
    });

    it('Should Finish a Ride [Promo day]', () => {
        const rideId = crypto.randomUUID();
        const ride = Ride.restore(
            rideId,
            crypto.randomUUID(),
            crypto.randomUUID(),
            'in_progress',
            0,
            0,
            -25.444069,
            -49.3423676,
            -25.4454575,
            -49.3077859,
            new Date().toISOString(),
        );
        let positions: Position[] = [
            [-25.444069, -49.3423676],
            [-25.4453673, -49.3376684],
            [-25.4498939, -49.3295038],
            [-25.4511146, -49.3201911],
            [-25.4491577, -49.3125951],
            [-25.4482155, -49.3077564],
            [-25.4454575, -49.3077859],
        ].map((pos) => Position.restore(crypto.randomUUID(), rideId, pos[0], pos[1], new Date('2025-01-01T20:00:00-03:00').toISOString()));
        ride.finish(positions);
        expect(ride.getStatus()).toBe('completed');
        expect(ride.getDistance()).toBe(3.99);
        expect(ride.getFare()).toBe(3.99);
    });

    it('Should not Finish a Ride [No positions]', () => {
        const ride = Ride.restore(crypto.randomUUID(), crypto.randomUUID(), crypto.randomUUID(), 'in_progress', 0, 0, 10, 10, 12, 12, new Date().toISOString());
        expect(() => ride.finish([])).toThrow(new Error('No positions found.'));
    });

    it('Should not Finish a Ride [Invalid states]', () => {
        const rideId = crypto.randomUUID();
        let positions: Position[] = [[-25.444069, -49.3423676]].map((pos) =>
            Position.restore(crypto.randomUUID(), rideId, pos[0], pos[1], new Date('2025-01-01T20:00:00-03:00').toISOString()),
        );
        let ride = Ride.restore(rideId, crypto.randomUUID(), undefined, 'requested', 0, 0, 10, 10, 12, 12, new Date().toISOString());
        expect(() => ride.finish(positions)).toThrow(new Error('Invalid state.'));
        ride = Ride.restore(rideId, crypto.randomUUID(), crypto.randomUUID(), 'accepted', 0, 0, 10, 10, 12, 12, new Date().toISOString());
        expect(() => ride.finish(positions)).toThrow(new Error('Invalid state.'));
        ride = Ride.restore(rideId, crypto.randomUUID(), crypto.randomUUID(), 'completed', 10, 50, 10, 10, 12, 12, new Date().toISOString());
        expect(() => ride.finish(positions)).toThrow(new Error('Invalid state.'));
    });
});
