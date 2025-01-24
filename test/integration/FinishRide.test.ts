import Position from '../../src/core/entity/Position';
import Ride from '../../src/core/entity/Ride';
import Registry from '../../src/infra/DI';
import PositionRepositoryMemory from '../../src/infra/repository/Position/PositionRepositoryMemory';
import RideRepositoryMemory from '../../src/infra/repository/Ride/RideRepositoryMemory';
import FinishRide from '../../src/usecases/FinishRide';

describe('Usecase: FinishRide', () => {
    let finishRide: FinishRide;
    let rideRepository: RideRepositoryMemory;
    let positionRepository: PositionRepositoryMemory;

    beforeEach(() => {
        Registry.getInstance().provide('rideRepository', new RideRepositoryMemory());
        Registry.getInstance().provide('positionRepository', new PositionRepositoryMemory());
        finishRide = new FinishRide();
        rideRepository = Registry.getInstance().inject('rideRepository');
        positionRepository = Registry.getInstance().inject('positionRepository');
    });

    it('Should Finish a Ride', async () => {
        const rideId = crypto.randomUUID();
        rideRepository.rides.push(
            Ride.restore(
                rideId,
                crypto.randomUUID(),
                crypto.randomUUID(),
                'in_progress',
                undefined,
                undefined,
                -25.444069,
                -49.3423676,
                -25.4454575,
                -49.3077859,
                new Date().toISOString(),
            ),
        );
        positionRepository.positions = [
            [-25.444069, -49.3423676],
            [-25.4453673, -49.3376684],
            [-25.4498939, -49.3295038],
            [-25.4511146, -49.3201911],
            [-25.4491577, -49.3125951],
            [-25.4482155, -49.3077564],
            [-25.4454575, -49.3077859],
        ].map((pos) => Position.restore(crypto.randomUUID(), rideId, pos[0], pos[1], new Date('2025-01-05T14:00:00-03:00').toISOString()));
        const input = { rideId };
        await finishRide.execute(input);
        const completedRide = await rideRepository.getRideById(rideId);
        expect(completedRide?.getStatus()).toBe('completed');
        expect(completedRide?.getDistance()).toBe(3.99);
        expect(completedRide?.getFare()).toBe(8.38);
    });

    it('Should fail to Finish a Ride [Ride not found]', async () => {
        const input = { rideId: crypto.randomUUID() };
        expect(() => finishRide.execute(input)).rejects.toThrow(new Error('Not found.'));
    });
});
