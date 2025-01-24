import supertest from 'supertest';

describe('e2e: /signup', () => {
    const timeout: number = 10000;
    const appUrl: string = 'http://localhost:3000';

    it(
        'Should create passenger Account',
        async () => {
            const input = { name: 'Marco Prosta', email: `marco${new Date().getTime()}@gmail.com`, cpf: '97456321558', isPassenger: true, isDriver: false, password: '123456' };
            const response = await supertest(appUrl).post(`/signup`).send(input).expect(200);
            expect(response.body.accountId).toBeDefined();
        },
        timeout,
    );

    it(
        'Should not create an Account [Invalid name]',
        async () => {
            const input = { name: 'Paulo', email: `paulo${new Date().getTime()}@gmail.com`, cpf: '71428793860', isPassenger: true, password: '123456' };
            const response = await supertest(appUrl).post(`/signup`).send(input).expect(422).expect('Content-Type', /json/);
            expect(response.body.message).toBe('Invalid name.');
        },
        timeout,
    );
});
