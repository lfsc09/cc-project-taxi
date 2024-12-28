import crypto from 'crypto';
import AccountDAO from './AccountDAO';
import { validateCpf } from './validateCpf';

export default class Signup {
    constructor(private readonly accountDAO: AccountDAO) {}

    async execute(input: any): Promise<{ accountId: string }> {
        if (!this.#isNameValid(input.name)) throw new Error('Invalid name.');
        if (!this.#isEmailValid(input.email)) throw new Error('Invalid email.');
        if (!validateCpf(input.cpf)) throw new Error('Invalid cpf.');
        if (!!input.isDriver && !this.#isCarPlaceValid(input.carPlate)) throw new Error('Invalid car plate.');

        const accountExists = await this.accountDAO.isDuplicateByEmail(input.email);
        if (accountExists) throw new Error('Duplicated account.');

        const newId = crypto.randomUUID();
        await this.accountDAO.createAccount({
            account_id: newId,
            name: input.name,
            email: input.email,
            cpf: input.cpf,
            isPassenger: !!input.isPassenger,
            isDriver: !!input.isDriver,
            password: input.password,
        });

        return { accountId: newId };
    }

    #isNameValid(name: string): boolean {
        return !!name.match(/[a-zA-Z] [a-zA-Z]+/);
    }

    #isEmailValid(email: string): boolean {
        return !!email.match(/^(.+)@(.+)$/);
    }

    #isCarPlaceValid(plate: string): boolean {
        return !!plate.match(/[A-Z]{3}[0-9]{4}/);
    }
}
