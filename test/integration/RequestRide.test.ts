import Account from '../../src/core/entity/Account';
import Registry from '../../src/infra/DI';
import AccountRepositoryMemory from '../../src/infra/repository/Account/AccountRepositoryMemory';
import RideRepositoryMemory from '../../src/infra/repository/Ride/RideRepositoryMemory';
import RequestRide, { RequestRideOutput } from '../../src/usecases/RequestRide';

describe('Usecase: RequestRide', () => {
    let requestRide: RequestRide;

    beforeEach(() => {
        Registry.getInstance().provide('accountRepository', new AccountRepositoryMemory());
        Registry.getInstance().provide('rideRepository', new RideRepositoryMemory());
        requestRide = new RequestRide();
    });

    it('Should create the Ride', async () => {
        const accountRepository: AccountRepositoryMemory = Registry.getInstance().inject('accountRepository');
        const passengerAccount = {
            accountId: crypto.randomUUID(),
            name: 'Marco Prosta',
            email: 'marco@gmail.com',
            cpf: '97456321558',
            isPassenger: true,
            isDriver: false,
            password: '123456',
        };
        accountRepository.accounts.push(
            Account.restore(
                passengerAccount.accountId,
                passengerAccount.name,
                passengerAccount.email,
                passengerAccount.cpf,
                passengerAccount.isPassenger,
                passengerAccount.isDriver,
                passengerAccount.password,
            ),
        );
        const input = {
            passengerId: passengerAccount.accountId,
            fromLat: 0,
            fromLong: 0,
            toLat: 0,
            toLong: 0,
        };
        const output = (await requestRide.execute(input)) as RequestRideOutput;
        const rideId = output?.rideId;
        expect(rideId).toBeDefined();
    });

    it('Should fail to create Ride [Not a passenger]', async () => {
        const accountRepository: AccountRepositoryMemory = Registry.getInstance().inject('accountRepository');
        const driverAccount = {
            accountId: crypto.randomUUID(),
            name: 'Marco Prosta',
            email: 'marco@gmail.com',
            cpf: '97456321558',
            carPlate: 'AAA0000',
            isPassenger: false,
            isDriver: true,
            password: '123456',
        };
        accountRepository.accounts.push(
            Account.restore(
                driverAccount.accountId,
                driverAccount.name,
                driverAccount.email,
                driverAccount.cpf,
                driverAccount.isPassenger,
                driverAccount.isDriver,
                driverAccount.password,
                driverAccount.carPlate,
            ),
        );
        const intputRide = {
            passengerId: driverAccount.accountId,
            fromLat: 10,
            fromLong: 10,
            toLat: 12,
            toLong: 12,
        };
        await expect(() => requestRide.execute(intputRide)).rejects.toThrow(new Error('Not a Passenger.'));
    });

    it('Should fail to create Ride [Cannot request another ride]', async () => {
        const accountRepository: AccountRepositoryMemory = Registry.getInstance().inject('accountRepository');
        const passengerAccount = {
            accountId: crypto.randomUUID(),
            name: 'Marco Prosta',
            email: 'marco@gmail.com',
            cpf: '97456321558',
            isPassenger: true,
            isDriver: false,
            password: '123456',
        };
        accountRepository.accounts.push(
            Account.restore(
                passengerAccount.accountId,
                passengerAccount.name,
                passengerAccount.email,
                passengerAccount.cpf,
                passengerAccount.isPassenger,
                passengerAccount.isDriver,
                passengerAccount.password,
            ),
        );
        const intputRide1 = {
            passengerId: passengerAccount.accountId,
            fromLat: 10,
            fromLong: 10,
            toLat: 12,
            toLong: 12,
        };
        const outputRequestRide1 = (await requestRide.execute(intputRide1)) as RequestRideOutput;
        const rideId1 = outputRequestRide1?.rideId;
        expect(rideId1).toBeDefined();

        const intputRide2 = {
            passengerId: passengerAccount.accountId,
            fromLat: 13,
            fromLong: 13,
            toLat: 14,
            toLong: 14,
        };
        await expect(() => requestRide.execute(intputRide2)).rejects.toThrow(new Error('Cannot request another ride.'));
    });
});
