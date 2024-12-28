export default interface AccountDAO {
    getAccountById(accountId: string): Promise<GetAccountByIdOutput>;
    isDuplicateByEmail(email: string): Promise<boolean>;
    isAccountPassenger(accountId: string): Promise<boolean>;
    createAccount(account: CreateAccountInput): Promise<void>;
}

export interface GetAccountByIdOutput {
    account_id: string;
    name: string;
    email: string;
    cpf: string;
    car_plate: string;
    is_passanger: boolean;
    is_driver: boolean;
    password: string;
};

export interface CreateAccountInput {
    accountId: string;
    name: string;
    email: string;
    cpf: string;
    carPlate?: string;
    isPassenger: boolean;
    isDriver: boolean;
    password: string;
};
