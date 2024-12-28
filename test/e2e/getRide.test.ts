import axios from 'axios';

axios.defaults.validateStatus = function () {
    return true;
};

describe('e2e: /getRide', () => {
    it('Should return a Ride', async () => {
        const accountInput = { name: 'Marco Prosta', email: `marco${new Date().getTime()}@gmail.com`, cpf: '97456321558', isPassenger: true, isDriver: false, password: '123456' };
        const responseSignup = await axios.post('http://localhost:3000/signup', accountInput);
        const passengerAccountId = responseSignup?.data?.accountId;
        expect(passengerAccountId).toBeDefined();

        const rideInput = {};
        const responseRequestRide = await axios.post('http://localhost:3000/requestRide', rideInput);
        const rideId = responseRequestRide?.data?.rideId;
        expect(rideId).toBeDefined();

        const responseGetRide = await axios.get(`http://localhost:3000/getRide?id=${rideId}`);
        const outputGetRide = responseGetRide?.data;
        expect(outputGetRide.ride_id).toBe(rideId);
        expect(outputGetRide.passenger_id).toBe(passengerAccountId);
        expect(outputGetRide.status).toBe('requested');
    });

    it('Should return error for not found', async () => {
        const responseGetAccount = await axios.get(`http://localhost:3000/getRide?id=${crypto.randomUUID()}`);
        expect(responseGetAccount?.status).toBe(404);
        const errorMessage = responseGetAccount?.data?.message;
        expect(errorMessage).toBe('Not Found.');
    });
});
