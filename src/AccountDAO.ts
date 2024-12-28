import { DbConn } from './main';

export default interface AccountDAO {
  getAccountById(id: string): Promise<GetAccountByIdOutput>;
  isDuplicateByEmail(email: string): Promise<boolean>;
  createAccount(account: CreateAccountInput): Promise<void>;
}

export class AccountDAODatabase implements AccountDAO {
  constructor(private readonly conn: DbConn) {}

  async getAccountById(id: string): Promise<GetAccountByIdOutput> {
    const [account] = await this.conn.query('SELECT * FROM ccca.account WHERE account_id = $1', [id]);
    return account;
  }

  async isDuplicateByEmail(email: string): Promise<boolean> {
    const [account] = await this.conn.query('SELECT * FROM ccca.account WHERE email = $1', [email]);
    return !!account;
  }

  async createAccount(account: CreateAccountInput): Promise<void> {
    await this.conn.query('INSERT INTO ccca.account (account_id, name, email, cpf, car_plate, is_passenger, is_driver, password) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', [
      account.account_id,
      account.name,
      account.email,
      account.cpf,
      account?.carPlate ?? '',
      !!account.isPassenger,
      !!account.isDriver,
      account.password,
    ]);
  }
}

export class AccountDAOMemory implements AccountDAO {
  private accounts: any[] = [];

  async getAccountById(id: string): Promise<GetAccountByIdOutput> {
    return this.accounts.find((account: any) => account.account_id === id) as GetAccountByIdOutput;
  }

  async isDuplicateByEmail(email: string): Promise<boolean> {
    return !!this.accounts.find((account: any) => account.email === email);
  }

  async createAccount(account: CreateAccountInput): Promise<void> {
    this.accounts.push(account);
  }
}

export interface GetAccountByIdOutput {
  name: string;
  email: string;
  cpf: string;
  password: string;
  carPlate: string;
  isPassenger: boolean;
  isDriver: boolean;
}

export interface CreateAccountInput {
  account_id: string;
  name: string;
  email: string;
  cpf: string;
  carPlate?: string;
  isPassenger: boolean;
  isDriver: boolean;
  password: string;
}
