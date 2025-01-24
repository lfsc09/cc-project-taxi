import supertest from 'supertest';

describe('e2e: /getRide', () => {
    const timeout: number = 10000;
    const appUrl: string = 'http://localhost:3000';

    it(
        'Should return a "Requested" Ride',
        async () => {
            const input = {
                rideId: '0d63a8cf-1607-4b53-b9a4-1d9623caa8f9',
                passengerId: '87549960-5557-443e-86c7-3021b3cf9e04',
                status: 'requested',
            };
            const response = await supertest(appUrl).get(`/ride/${input.rideId}`).expect(200).expect('Content-Type', /json/);
            expect(response.body.ride_id).toBe(input.rideId);
            expect(response.body.passenger_id).toBe(input.passengerId);
            expect(response.body.status).toBe(input.status);
            expect(response.body.date).toBeDefined();
        },
        timeout,
    );

    it(
        'Should return error for not found',
        async () => {
            const response = await supertest(appUrl).get(`/ride/${crypto.randomUUID()}`).expect(404).expect('Content-Type', /json/);
            expect(response.body.message).toBe('Not Found.');
        },
        timeout,
    );
});
