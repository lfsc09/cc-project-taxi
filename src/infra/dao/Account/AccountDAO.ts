export default interface AccountDAO {
    getAccountById(accountId: string): Promise<GetAccountByIdOutput>;
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
}
