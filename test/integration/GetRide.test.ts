import AccountDAOMemory from '../../src/AccountDAOMemory';
import GetRide from '../../src/GetRide';
import RequestRide, { RequestRideOutput } from '../../src/RequestRide';
import RideDAOMemory from '../../src/RideDAOMemory';
import Signup, { SignupOutput } from '../../src/Signup';

describe('Usecase: GetRide', () => {
    let rideDAO: RideDAOMemory;
    let accountDAO: AccountDAOMemory;
    let getRide: GetRide;

    beforeEach(() => {
        rideDAO = new RideDAOMemory();
        accountDAO = new AccountDAOMemory();
        getRide = new GetRide(rideDAO);
    });

    it('Should return Ride', async () => {
        const inputAccount = { name: 'Marco Prosta', email: 'marco@gmail.com', cpf: '97456321558', isPassenger: true, isDriver: false, password: '123456' };
        const outputSignup = (await new Signup(accountDAO).execute(inputAccount)) as SignupOutput;
        const accountId = outputSignup?.accountId;
        expect(accountId).toBeDefined();
        const inputRide = {
            passengerId: accountId,
            fromLat: 0,
            fromLong: 0,
            toLat: 0,
            toLong: 0,
        };
        const outputRequestRide = (await new RequestRide(rideDAO, accountDAO).execute(inputRide)) as RequestRideOutput;
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
