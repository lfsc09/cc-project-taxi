import axios from 'axios';

axios.defaults.validateStatus = function () {
    return true;
};

describe('e2e: /getAccount', () => {
    it('Should return a Passenger Account', async () => {
        const input = { name: 'Marco Prosta', email: `marco${new Date().getTime()}@gmail.com`, cpf: '97456321558', isPassenger: true, isDriver: false, password: '123456' };
        const responseSignup = await axios.post('http://localhost:3000/signup', input);
        const passengerAccountId = responseSignup?.data?.accountId;
        expect(passengerAccountId).toBeDefined();

        const responseGetAccount = await axios.get(`http://localhost:3000/getAccount?id=${passengerAccountId}`);
        const outputGetAccount = responseGetAccount?.data;
        expect(outputGetAccount.name).toBe(input.name);
        expect(outputGetAccount.email).toBe(input.email);
        expect(outputGetAccount.cpf).toBe(input.cpf);
        expect(outputGetAccount.password).toBe(input.password);
        expect(outputGetAccount.is_passenger).toBe(input.isPassenger);
    });

    it('Should return error for not found', async () => {
        const responseGetAccount = await axios.get(`http://localhost:3000/getAccount?id=${crypto.randomUUID()}`);
        expect(responseGetAccount?.status).toBe(404);
        const errorMessage = responseGetAccount?.data?.message;
        expect(errorMessage).toBe('Not Found.');
    });
});
