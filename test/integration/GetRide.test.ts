import Registry from '../../src/infra/DI';
import RideDAOMemory from '../../src/infra/dao/Ride/RideDAOMemory';
import GetRide from '../../src/usecases/GetRide';

describe('Usecase: GetRide', () => {
    let getRide: GetRide;
    let rideDAO: RideDAOMemory;

    beforeEach(() => {
        Registry.getInstance().provide('rideDAO', new RideDAOMemory());
        getRide = new GetRide();
        rideDAO = Registry.getInstance().inject('rideDAO');
    });

    it('Should return a "Requested" Ride', async () => {
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
        rideDAO.rides.push({
            ride_id: input.rideId,
            passenger_id: input.passengerId,
            driver_id: '',
            status: input.status as 'requested',
            fare: 0,
            distance: 0,
            from_lat: input.fromLat,
            from_long: input.fromLong,
            to_lat: input.toLat,
            to_long: input.toLong,
            date: input.date,
        });
        const output = await getRide.execute(input.rideId);
        expect(output?.ride_id).toBe(input.rideId);
        expect(output?.passenger_id).toBe(input.passengerId);
        expect(output?.driver_id).toBe('');
        expect(output?.status).toBe(input.status);
        expect(output?.from_lat).toBe(input.fromLat);
        expect(output?.from_long).toBe(input.fromLong);
        expect(output?.to_lat).toBe(input.toLat);
        expect(output?.to_long).toBe(input.toLong);
        expect(output?.date).toBe(input.date);
    });

    it('Should return Null for unexistent ID', async () => {
        await expect(() => getRide.execute(crypto.randomUUID())).rejects.toThrow(new Error('Not Found.'));
    });
});
