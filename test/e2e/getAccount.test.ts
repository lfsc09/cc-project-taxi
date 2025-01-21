import axios from 'axios';

axios.defaults.validateStatus = function () {
    return true;
};

describe('e2e: /getAccount', () => {
    it('Should return a Passenger Account', async () => {
        const input = {
            accountId: '87549960-5557-443e-86c7-3021b3cf9e04',
            name: 'Jonas Prosta',
            email: `jonas@gmail.com`,
            cpf: '97456321558',
            isPassenger: true,
            isDriver: false,
            password: '123456',
        };

        const responseGetAccount = await axios.get(`http://localhost:3000/account/${input.accountId}`);
        const output = responseGetAccount?.data;

        expect(output.name).toBe(input.name);
        expect(output.email).toBe(input.email);
        expect(output.cpf).toBe(input.cpf);
        expect(output.password).toBe(input.password);
        expect(output.is_passenger).toBe(input.isPassenger);
    });

    it('Should return error for not found', async () => {
        const responseGetAccount = await axios.get(`http://localhost:3000/account/${crypto.randomUUID()}`);
        expect(responseGetAccount?.status).toBe(404);
        const errorMessage = responseGetAccount?.data?.message;
        expect(errorMessage).toBe('Not Found.');
    });
});
