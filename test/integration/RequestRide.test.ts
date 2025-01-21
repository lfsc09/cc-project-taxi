import Account from '../../src/core/entity/Account';
import Ride from '../../src/core/entity/Ride';
import Registry from '../../src/infra/DI';
import AccountRepositoryMemory from '../../src/infra/repository/Account/AccountRepositoryMemory';
import RideRepositoryMemory from '../../src/infra/repository/Ride/RideRepositoryMemory';
import RequestRide, { RequestRideOutput } from '../../src/usecases/RequestRide';

describe('Usecase: RequestRide', () => {
    let requestRide: RequestRide;
    let accountRepository: AccountRepositoryMemory;
    let rideRepository: RideRepositoryMemory;

    beforeEach(() => {
        Registry.getInstance().provide('accountRepository', new AccountRepositoryMemory());
        Registry.getInstance().provide('rideRepository', new RideRepositoryMemory());
        requestRide = new RequestRide();
        accountRepository = Registry.getInstance().inject('accountRepository');
        rideRepository = Registry.getInstance().inject('rideRepository');
    });

    it('Should create the Ride', async () => {
        const passengerId = crypto.randomUUID();
        accountRepository.accounts.push(Account.restore(passengerId, 'Marco Prosta', 'marco@gmail.com', '97456321558', true, false, '123456'));
        const input = {
            passengerId,
            fromLat: 10,
            fromLong: 10,
            toLat: 12,
            toLong: 12,
        };
        const output = (await requestRide.execute(input)) as RequestRideOutput;
        const rideId = output?.rideId;
        expect(rideId).toBeDefined();
    });

    it('Should fail to create Ride [Not a passenger]', async () => {
        const supposedPassengerId = crypto.randomUUID();
        accountRepository.accounts.push(Account.restore(supposedPassengerId, 'Marco Prosta', 'marco@gmail.com', '97456321558', false, true, '123456', 'AAA0000'));
        const input = {
            passengerId: supposedPassengerId,
            fromLat: 10,
            fromLong: 10,
            toLat: 12,
            toLong: 12,
        };
        expect(() => requestRide.execute(input)).rejects.toThrow(new Error('Not a Passenger.'));
    });

    it('Should fail to create Ride [Cannot request another ride]', async () => {
        const passengerId = crypto.randomUUID();
        accountRepository.accounts.push(Account.restore(passengerId, 'Marco Prosta', 'marco@gmail.com', '97456321558', true, false, '123456'));
        rideRepository.rides.push(Ride.restore(crypto.randomUUID(), passengerId, undefined, 'requested', undefined, undefined, 10, 10, 12, 12, new Date().toISOString()));
        const intput = {
            passengerId,
            fromLat: 13,
            fromLong: 13,
            toLat: 14,
            toLong: 14,
        };
        expect(() => requestRide.execute(intput)).rejects.toThrow(new Error('Cannot request another ride.'));
    });
});
