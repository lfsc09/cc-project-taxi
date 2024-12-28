import axios from 'axios';

axios.defaults.validateStatus = function () {
    return true;
};

describe('e2e: /signup', () => {
    it('Should create Passenger Account', async () => {
        const input = { name: 'Marco Prosta', email: `marco${new Date().getTime()}@gmail.com`, cpf: '97456321558', isPassenger: true, isDriver: false, password: '123456' };
        const responseSignup = await axios.post('http://localhost:3000/signup', input);
        const passengerAccountId = responseSignup?.data?.accountId;
        expect(passengerAccountId).toBeDefined();
    });

    it('Should return error because of invalid name', async () => {
        const input = { name: 'Paulo', email: `paulo${new Date().getTime()}@gmail.com`, cpf: '71428793860', isPassenger: true, password: '123456' };
        const responseSignup = await axios.post('http://localhost:3000/signup', input);
        expect(responseSignup?.status).toBe(422);
        const errorMessage = responseSignup?.data?.message;
        expect(errorMessage).toBe('Invalid name.');
    });
});
