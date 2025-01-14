import Cpf from '../vo/Account/Cpf';

export default class Account {
    #accountId: string;
    #name: string;
    #email: string;
    #cpf: Cpf;
    #carPlate?: string;
    #isPassenger: boolean;
    #isDriver: boolean;
    #password: string;

    private constructor(
        accountId: string | undefined,
        name: string,
        email: string,
        cpf: string,
        carPlate: string | undefined,
        isPassenger: boolean,
        isDriver: boolean,
        password: string,
    ) {
        if (!this.#isNameValid(name)) throw new Error('Invalid name.');
        if (!this.#isEmailValid(email)) throw new Error('Invalid email.');
        if (isPassenger && isDriver) throw new Error('Cannot be passenger and driver.');
        if (isDriver && !this.#isCarPlaceValid(carPlate)) throw new Error('Invalid car plate.');

        this.#accountId = !accountId ? crypto.randomUUID() : accountId;
        this.#name = name;
        this.#email = email;
        this.#cpf = new Cpf(cpf);
        this.#isPassenger = isPassenger;
        this.#isDriver = isDriver;
        if (this.#isDriver) this.#carPlate = carPlate;
        this.#password = password;
    }

    static restore(
        accountId: string,
        name: string,
        email: string,
        cpf: string,
        isPassenger: string | boolean,
        isDriver: string | boolean,
        password: string,
        carPlate?: string,
    ): Account {
        return new Account(
            accountId,
            name,
            email,
            cpf,
            carPlate,
            typeof isPassenger === 'boolean' ? isPassenger : isPassenger === 'true',
            typeof isDriver === 'boolean' ? isDriver : isDriver === 'true',
            password,
        );
    }

    static create(name: string, email: string, cpf: string, isPassenger: string | boolean, isDriver: string | boolean, password: string, carPlate?: string): Account {
        return new Account(
            undefined,
            name,
            email,
            cpf,
            carPlate,
            typeof isPassenger === 'boolean' ? isPassenger : isPassenger === 'true',
            typeof isDriver === 'boolean' ? isDriver : isDriver === 'true',
            password,
        );
    }

    getAccountID(): string {
        return this.#accountId;
    }
    getName(): string {
        return this.#name;
    }
    getEmail(): string {
        return this.#email;
    }
    getCpf(): string {
        return this.#cpf.getValue();
    }
    getCarPlate(): string | undefined {
        return this.#carPlate;
    }
    getIsPassenger(): boolean {
        return this.#isPassenger;
    }
    getIsDriver(): boolean {
        return this.#isDriver;
    }
    getPassword(): string {
        return this.#password;
    }

    #isNameValid(value: string): boolean {
        return !!value.match(/[a-zA-Z] [a-zA-Z]+/);
    }

    #isEmailValid(value: string): boolean {
        return !!value.match(/^(.+)@(.+)$/);
    }

    #isCarPlaceValid(value?: string): boolean {
        if (value === undefined) return false;
        return !!value.match(/[A-Z]{3}[0-9]{4}/);
    }
}
