import crypto from 'crypto';
import { validateCpf } from './validateCpf';
import { DbConn } from './main';

export const signup = async (conn: DbConn, input: any): Promise<{ accountId: string } | -5 | -4 | -3 | -2 | -1> => {
  const [existentAccount] = await conn.query('SELECT * FROM ccca.account WHERE email = $1', [input.email]);
  if (!!existentAccount) return -4;

  if (!isNameValid(input.name)) return -3;
  if (!isEmailValid(input.email)) return -2;
  if (!validateCpf(input.cpf)) return -1;
  if (!!input.isDriver && !isCarPlaceValid(input.carPlate)) return -5;

  const newId = crypto.randomUUID();
  await conn.query('INSERT INTO ccca.account (account_id, name, email, cpf, car_plate, is_passenger, is_driver, password) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', [
    newId,
    input.name,
    input.email,
    input.cpf,
    input?.carPlate ?? '',
    !!input.isPassenger,
    !!input.isDriver,
    input.password,
  ]);
  return { accountId: newId };
};

const isNameValid = (name: string): boolean => {
  return !!name.match(/[a-zA-Z] [a-zA-Z]+/);
};

const isEmailValid = (email: string): boolean => {
  return !!email.match(/^(.+)@(.+)$/);
};

const isCarPlaceValid = (plate: string): boolean => {
  return !!plate.match(/[A-Z]{3}[0-9]{4}/);
};
