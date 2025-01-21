import Position from '../../src/core/entity/Position';

describe('Entity: Position', () => {
    it('Should create new Ride as "Requested"', () => {
        const input = {
            rideId: crypto.randomUUID(),
            lat: 10,
            long: 10,
        };
        const position = Position.create(input.rideId, input.lat, input.long);
        expect(position.getRideId()).toBe(input.rideId);
        expect(position.getLat()).toBe(input.lat);
        expect(position.getLong()).toBe(input.long);
        expect(position.getPositionId()).toBeDefined();
        expect(position.getDate()).toBeDefined();
    });

    it('Should restore a Position', () => {
        const input = {
            positionId: crypto.randomUUID(),
            rideId: crypto.randomUUID(),
            lat: 10,
            long: 10,
            date: new Date().toISOString(),
        };
        const position = Position.restore(input.positionId, input.rideId, input.lat, input.long, input.date);
        expect(position.getPositionId()).toBe(input.positionId);
        expect(position.getRideId()).toBe(input.rideId);
        expect(position.getLat()).toBe(input.lat);
        expect(position.getLong()).toBe(input.long);
        expect(position.getDate().toISOString()).toBe(input.date);
    });
});
