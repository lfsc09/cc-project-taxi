import Account from '../../src/core/entity/Account';
import Ride from '../../src/core/entity/Ride';
import Registry from '../../src/infra/DI';
import AccountRepositoryMemory from '../../src/infra/repository/Account/AccountRepositoryMemory';
import RideRepositoryMemory from '../../src/infra/repository/Ride/RideRepositoryMemory';
import AcceptRide from '../../src/usecases/AcceptRide';

describe('Usecase: AcceptRide', () => {
    let acceptRide: AcceptRide;
    let accountRepository: AccountRepositoryMemory;
    let rideRepository: RideRepositoryMemory;

    beforeEach(() => {
        Registry.getInstance().provide('accountRepository', new AccountRepositoryMemory());
        Registry.getInstance().provide('rideRepository', new RideRepositoryMemory());
        acceptRide = new AcceptRide();
        accountRepository = Registry.getInstance().inject('accountRepository');
        rideRepository = Registry.getInstance().inject('rideRepository');
    });

    it('Should Accept a Ride', async () => {
        const driverId = crypto.randomUUID();
        accountRepository.accounts.push(Account.restore(driverId, 'Marco Prosta', 'marco@gmail.com', '97456321558', false, true, '123456', 'AAA0000'));
        const rideId = crypto.randomUUID();
        rideRepository.rides.push(Ride.restore(rideId, crypto.randomUUID(), undefined, 'requested', undefined, undefined, 10, 10, 12, 12, new Date().toISOString()));
        const input = { rideId, driverId };
        await acceptRide.execute(input);
        const acceptedRide = await rideRepository.getRideById(rideId);
        expect(acceptedRide?.getDriverId()).toBe(driverId);
        expect(acceptedRide?.getStatus()).toBe('accepted');
    });

    it('Should fail to Accept a Ride [Not a driver]', async () => {
        const supposedDriverId = crypto.randomUUID();
        accountRepository.accounts.push(Account.restore(supposedDriverId, 'Marco Prosta', 'marco@gmail.com', '97456321558', true, false, '123456'));
        const input = { rideId: crypto.randomUUID(), driverId: supposedDriverId };
        expect(() => acceptRide.execute(input)).rejects.toThrow(new Error('Not a driver.'));
    });

    it('Should fail to Accept a Ride [Driver already in another ride]', async () => {
        const driverId = crypto.randomUUID();
        accountRepository.accounts.push(Account.restore(driverId, 'Marco Prosta', 'marco@gmail.com', '97456321558', false, true, '123456', 'AAA0000'));
        rideRepository.rides.push(Ride.restore(crypto.randomUUID(), crypto.randomUUID(), driverId, 'accepted', undefined, undefined, 10, 10, 12, 12, new Date().toISOString()));
        const ride2Id = crypto.randomUUID();
        rideRepository.rides.push(Ride.restore(ride2Id, crypto.randomUUID(), undefined, 'requested', undefined, undefined, 10, 10, 12, 12, new Date().toISOString()));
        const input = { rideId: ride2Id, driverId };
        expect(() => acceptRide.execute(input)).rejects.toThrow(new Error('Driver already on a ride.'));
    });

    it('Should fail to Accept a Ride [Ride not found]', async () => {
        const driverId = crypto.randomUUID();
        accountRepository.accounts.push(Account.restore(driverId, 'Marco Prosta', 'marco@gmail.com', '97456321558', false, true, '123456', 'AAA0000'));
        const input = { rideId: crypto.randomUUID(), driverId };
        expect(() => acceptRide.execute(input)).rejects.toThrow(new Error('Not found.'));
    });
});
