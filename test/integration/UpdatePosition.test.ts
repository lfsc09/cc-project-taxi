import Ride from '../../src/core/entity/Ride';
import Registry from '../../src/infra/DI';
import PositionRepositoryMemory from '../../src/infra/repository/Position/PositionRepositoryMemory';
import RideRepositoryMemory from '../../src/infra/repository/Ride/RideRepositoryMemory';
import UpdatePosition from '../../src/usecases/UpdatePosition';

describe('Usecase: StartRide', () => {
    let updatePosition: UpdatePosition;
    let rideRepository: RideRepositoryMemory;
    let positionRepository: PositionRepositoryMemory;

    beforeEach(() => {
        Registry.getInstance().provide('rideRepository', new RideRepositoryMemory());
        Registry.getInstance().provide('positionRepository', new PositionRepositoryMemory());
        updatePosition = new UpdatePosition();
        rideRepository = Registry.getInstance().inject('rideRepository');
        positionRepository = Registry.getInstance().inject('positionRepository');
    });

    it('Should create a Position', async () => {
        const rideId = crypto.randomUUID();
        rideRepository.rides.push(Ride.restore(rideId, crypto.randomUUID(), crypto.randomUUID(), 'in_progress', 0, undefined, 10, 10, 12, 12, new Date().toISOString()));
        const input = { rideId, lat: 10, long: 10 };
        await updatePosition.execute(input);
        expect(positionRepository.positions.length).toBe(1);
        const createdPosition = positionRepository.positions[0];
        expect(createdPosition.getRideId()).toBe(input.rideId);
        expect(createdPosition.getLat()).toBe(input.lat);
        expect(createdPosition.getLong()).toBe(input.long);
        expect(createdPosition.getPositionId()).toBeDefined();
        expect(createdPosition.getDate()).toBeDefined();
    });

    it('Should not create a Position [Ride not found]', async () => {
        const input = { rideId: crypto.randomUUID(), lat: 0, long: 0 };
        expect(() => updatePosition.execute(input)).rejects.toThrow(new Error('Not found.'));
    });

    it('Should not create a Position [Ride not in progress]', async () => {
        const rideId = crypto.randomUUID();
        rideRepository.rides.push(Ride.restore(rideId, crypto.randomUUID(), crypto.randomUUID(), 'accepted', undefined, undefined, 10, 10, 12, 12, new Date().toISOString()));
        const input = { rideId, lat: 10, long: 10 };
        expect(() => updatePosition.execute(input)).rejects.toThrow(new Error('Ride not in progress.'));
    });
});
