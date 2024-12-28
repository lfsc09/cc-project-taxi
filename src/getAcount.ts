import { DbConn } from './main';

export interface Account {
  name: string;
  email: string;
  cpf: string;
  password: string;
  carPlate: string;
  isPassenger: boolean;
  isDriver: boolean;
}

export const getAccount = async (conn: DbConn, id: string): Promise<Account | undefined> => {
  const [account] = await conn.query('SELECT * FROM ccca.account WHERE account_id = $1', [id]);
  return account;
};
