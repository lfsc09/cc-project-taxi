import axios from 'axios';

axios.defaults.validateStatus = function () {
    return true;
};

describe('e2e: /getRide', () => {
    it('Should return a "Requested" Ride', async () => {
        const input = {
            rideId: '0d63a8cf-1607-4b53-b9a4-1d9623caa8f9',
            passengerId: '87549960-5557-443e-86c7-3021b3cf9e04',
            status: 'requested',
            date: '2024-05-17T18:09:14.421Z',
        };
        const responseGetRide = await axios.get(`http://localhost:3000/ride/${input.rideId}`);
        const output = responseGetRide?.data;
        expect(output.ride_id).toBe(input.rideId);
        expect(output.passenger_id).toBe(input.passengerId);
        expect(output.status).toBe(input.status);
        expect(output.date).toBe(input.date);
    });

    it('Should return error for not found', async () => {
        const responseGetRide = await axios.get(`http://localhost:3000/ride/${crypto.randomUUID()}`);
        expect(responseGetRide?.status).toBe(404);
        const errorMessage = responseGetRide?.data?.message;
        expect(errorMessage).toBe('Not Found.');
    });
});
