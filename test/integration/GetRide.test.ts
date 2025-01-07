import Registry from '../../src/infra/DI';
import AccountDAOMemory from '../../src/infra/dao/Account/AccountDAOMemory';
import RideDAOMemory from '../../src/infra/dao/Ride/RideDAOMemory';
import GetRide from '../../src/usecases/GetRide';
import RequestRide, { RequestRideOutput } from '../../src/usecases/RequestRide';
import Signup, { SignupOutput } from '../../src/usecases/Signup';

describe('Usecase: GetRide', () => {
    let getRide: GetRide;

    beforeEach(() => {
        Registry.getInstance().provide('accountDAO', new AccountDAOMemory());
        Registry.getInstance().provide('rideDAO', new RideDAOMemory());
        getRide = new GetRide();
    });

    it('Should return Ride', async () => {
        const inputAccount = { name: 'Marco Prosta', email: 'marco@gmail.com', cpf: '97456321558', isPassenger: true, isDriver: false, password: '123456' };
        const outputSignup = (await new Signup().execute(inputAccount)) as SignupOutput;
        const accountId = outputSignup?.accountId;
        expect(accountId).toBeDefined();
        const inputRide = {
            passengerId: accountId,
            fromLat: 0,
            fromLong: 0,
            toLat: 0,
            toLong: 0,
        };
        const outputRequestRide = (await new RequestRide().execute(inputRide)) as RequestRideOutput;
        const rideId = outputRequestRide?.rideId;
        expect(rideId).toBeDefined();

        const outputGetRide = await getRide.execute(rideId);
        expect(outputGetRide?.passenger_id).toBe(accountId);
        expect(outputGetRide?.status).toBe('requested');
        expect(outputGetRide?.driver_id).toBe('');
    });

    it('Should return Null for unexistent ID', async () => {
        await expect(() => getRide.execute(crypto.randomUUID())).rejects.toThrow(new Error('Not Found.'));
    });
});
