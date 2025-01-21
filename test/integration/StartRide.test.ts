import Ride from '../../src/core/entity/Ride';
import Registry from '../../src/infra/DI';
import RideRepositoryMemory from '../../src/infra/repository/Ride/RideRepositoryMemory';
import StartRide from '../../src/usecases/StartRide';

describe('Usecase: StartRide', () => {
    let startRide: StartRide;
    let rideRepository: RideRepositoryMemory;

    beforeEach(() => {
        Registry.getInstance().provide('rideRepository', new RideRepositoryMemory());
        startRide = new StartRide();
        rideRepository = Registry.getInstance().inject('rideRepository');
    });

    it('Should Start a Ride', async () => {
        const rideId = crypto.randomUUID();
        rideRepository.rides.push(Ride.restore(rideId, crypto.randomUUID(), crypto.randomUUID(), 'accepted', undefined, undefined, 10, 10, 12, 12, new Date().toISOString()));
        const input = { rideId };
        await startRide.execute(input);
        const acceptedRide = await rideRepository.getRideById(rideId);
        expect(acceptedRide?.getStatus()).toBe('in_progress');
    });

    it('Should fail to Start a Ride [Ride not found]', async () => {
        const input = { rideId: crypto.randomUUID() };
        expect(() => startRide.execute(input)).rejects.toThrow(new Error('Not found.'));
    });
});
