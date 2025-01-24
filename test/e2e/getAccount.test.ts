import supertest from 'supertest';

describe('e2e: /getAccount', () => {
    const timeout: number = 10000;
    const appUrl: string = 'http://localhost:3000';

    it(
        'Should return a Passenger Account',
        async () => {
            const input = {
                accountId: '87549960-5557-443e-86c7-3021b3cf9e04',
                name: 'Jonas Prosta',
                email: `jonas@gmail.com`,
                cpf: '97456321558',
                isPassenger: true,
                isDriver: false,
                password: '123456',
            };
            const response = await supertest(appUrl).get(`/account/${input.accountId}`).expect(200).expect('Content-Type', /json/);
            expect(response.body.name).toBe(input.name);
            expect(response.body.email).toBe(input.email);
            expect(response.body.cpf).toBe(input.cpf);
            expect(response.body.password).toBe(input.password);
            expect(response.body.is_passenger).toBe(input.isPassenger);
        },
        timeout,
    );

    it(
        'Should return error for not found',
        async () => {
            const response = await supertest(appUrl).get(`/account/${crypto.randomUUID()}`).expect(404).expect('Content-Type', /json/);
            expect(response.body.message).toBe('Not Found.');
        },
        timeout,
    );
});
