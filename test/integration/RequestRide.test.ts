import AccountDAOMemory from '../../src/infra/dao/Account/AccountDAOMemory';
import RideDAOMemory from '../../src/infra/dao/Ride/RideDAOMemory';
import Registry from '../../src/infra/DI';
import RequestRide, { RequestRideOutput } from '../../src/usecases/RequestRide';
import Signup, { SignupOutput } from '../../src/usecases/Signup';

describe('Usecase: RequestRide', () => {
    let requestRide: RequestRide;

    beforeEach(() => {
        Registry.getInstance().provide('accountDAO', new AccountDAOMemory());
        Registry.getInstance().provide('rideDAO', new RideDAOMemory());
        requestRide = new RequestRide();
    });

    it('Should create the Ride', async () => {
        const inputAccount = { name: 'Marco Prosta', email: 'marco@gmail.com', cpf: '97456321558', isPassenger: true, isDriver: false, password: '123456' };
        const outputSignup = (await new Signup().execute(inputAccount)) as SignupOutput;
        expect(outputSignup?.accountId).toBeDefined();
        const intputRide = {
            passengerId: outputSignup.accountId,
            fromLat: 0,
            fromLong: 0,
            toLat: 0,
            toLong: 0,
        };
        const outputRequestRide = (await requestRide.execute(intputRide)) as RequestRideOutput;
        const rideId = outputRequestRide?.rideId;
        expect(rideId).toBeDefined();
    });

    it('Must fail to create Ride [Not a passenger]', async () => {
        const inputAccount = { name: 'Marco Prosta', email: 'marco@gmail.com', cpf: '97456321558', carPlate: 'AAA0000', isPassenger: false, isDriver: true, password: '123456' };
        const outputSignup = (await new Signup().execute(inputAccount)) as SignupOutput;
        expect(outputSignup?.accountId).toBeDefined();
        const intputRide = {
            passengerId: outputSignup.accountId,
            fromLat: 0,
            fromLong: 0,
            toLat: 0,
            toLong: 0,
        };
        await expect(() => requestRide.execute(intputRide)).rejects.toThrow(new Error('Not a Passenger.'));
    });

    it('Must fail to create Ride [Cannot request another ride]', async () => {
        const inputAccount = { name: 'Marco Prosta', email: 'marco@gmail.com', cpf: '97456321558', isPassenger: true, isDriver: false, password: '123456' };
        const outputSignup = (await new Signup().execute(inputAccount)) as SignupOutput;
        expect(outputSignup?.accountId).toBeDefined();
        const intputRide1 = {
            passengerId: outputSignup.accountId,
            fromLat: 0,
            fromLong: 0,
            toLat: 0,
            toLong: 0,
        };
        const outputRequestRide = (await requestRide.execute(intputRide1)) as RequestRideOutput;
        const rideId1 = outputRequestRide?.rideId;
        expect(rideId1).toBeDefined();

        const intputRide2 = {
            passengerId: outputSignup.accountId,
            fromLat: 0,
            fromLong: 0,
            toLat: 0,
            toLong: 0,
        };
        await expect(() => requestRide.execute(intputRide2)).rejects.toThrow(new Error('Cannot request another ride.'));
    });
});
