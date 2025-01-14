import Account from '../../src/core/entity/Account';

describe('Entity: Account', () => {
    it('Should create passenger Account', () => {
        const input = { name: 'Marco Prosta', email: 'marco@gmail.com', cpf: '97456321558', isPassenger: true, isDriver: false, password: '123456' };
        const account = Account.create(input.name, input.email, input.cpf, input.isPassenger, input.isDriver, input.password);
        expect(account.getName()).toBe(input.name);
        expect(account.getEmail()).toBe(input.email);
        expect(account.getCpf()).toBe(input.cpf);
        expect(account.getIsPassenger()).toBeTruthy();
        expect(account.getIsDriver()).toBeFalsy();
    });

    it('Should create driver Account', () => {
        const input = { name: 'Marco Prosta', email: 'marco@gmail.com', cpf: '97456321558', carPlate: 'AAA0000', isPassenger: false, isDriver: true, password: '123456' };
        const account = Account.create(input.name, input.email, input.cpf, input.isPassenger, input.isDriver, input.password, input.carPlate);
        expect(account.getName()).toBe(input.name);
        expect(account.getEmail()).toBe(input.email);
        expect(account.getCpf()).toBe(input.cpf);
        expect(account.getIsPassenger()).toBeFalsy();
        expect(account.getIsDriver()).toBeTruthy();
        expect(account.getCarPlate()).toBe(input.carPlate);
    });

    it('Should restore a passenger Account', () => {
        const input = {
            accountId: 'asdasd-asasd-asdasd-asd',
            name: 'Marco Prosta',
            email: 'marco@gmail.com',
            cpf: '97456321558',
            isPassenger: 'true',
            isDriver: 'false',
            password: '123456',
        };
        const account = Account.restore(input.accountId, input.name, input.email, input.cpf, input.isPassenger, input.isDriver, input.password);
        expect(account.getAccountID()).toBe(input.accountId);
        expect(account.getName()).toBe(input.name);
        expect(account.getEmail()).toBe(input.email);
        expect(account.getCpf()).toBe(input.cpf);
        expect(account.getIsPassenger()).toBeTruthy();
        expect(account.getIsDriver()).toBeFalsy();
    });

    it('Should restore a driver Account', () => {
        const input = {
            accountId: 'asdasd-asasd-asdasd-asd',
            name: 'Marco Prosta',
            email: 'marco@gmail.com',
            cpf: '97456321558',
            carPlate: 'AAA0000',
            isPassenger: 'false',
            isDriver: 'true',
            password: '123456',
        };
        const account = Account.restore(input.accountId, input.name, input.email, input.cpf, input.isPassenger, input.isDriver, input.password, input.carPlate);
        expect(account.getAccountID()).toBe(input.accountId);
        expect(account.getName()).toBe(input.name);
        expect(account.getEmail()).toBe(input.email);
        expect(account.getCpf()).toBe(input.cpf);
        expect(account.getIsPassenger()).toBeFalsy();
        expect(account.getIsDriver()).toBeTruthy();
        expect(account.getCarPlate()).toBe(input.carPlate);
    });

    it('Should fail because of [Invalid name]', () => {
        const input = { name: 'Marco', email: 'marco@gmail.com', cpf: '97456321558', isPassenger: true, isDriver: false, password: '123456' };
        expect(() => Account.create(input.name, input.email, input.cpf, input.isPassenger, input.isDriver, input.password)).toThrow(new Error('Invalid name.'));
    });

    it('Should fail because of [Invalid email]', () => {
        const input = { name: 'Marco Prosta', email: 'marco', cpf: '97456321558', isPassenger: true, isDriver: false, password: '123456' };
        expect(() => Account.create(input.name, input.email, input.cpf, input.isPassenger, input.isDriver, input.password)).toThrow(new Error('Invalid email.'));
    });

    it('Should fail because of [Is Passenger and Driver]', () => {
        const input = { name: 'Marco Prosta', email: 'marco@gmail.com', cpf: '97456321558', isPassenger: true, isDriver: true, carPlate: 'AAA0000', password: '123456' };
        expect(() => Account.create(input.name, input.email, input.cpf, input.isPassenger, input.isDriver, input.password, input.carPlate)).toThrow(
            new Error('Cannot be passenger and driver.'),
        );
    });

    it('Should fail because of [Invalid Car Plate]', () => {
        const input = { name: 'Marco Prosta', email: 'marco@gmail.com', cpf: '97456321558', carPlate: 'AAA000', isPassenger: false, isDriver: true, password: '123456' };
        expect(() => Account.create(input.name, input.email, input.cpf, input.isPassenger, input.isDriver, input.password, input.carPlate)).toThrow(
            new Error('Invalid car plate.'),
        );
    });
});
