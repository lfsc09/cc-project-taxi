DROP schema if EXISTS ccca cascade;

CREATE schema ccca;

CREATE TABLE
  ccca.account (
    account_id uuid PRIMARY key,
    name text NOT NULL,
    email text NOT NULL,
    cpf text NOT NULL,
    car_plate text NULL,
    is_passenger BOOLEAN NOT NULL DEFAULT FALSE,
    is_driver BOOLEAN NOT NULL DEFAULT FALSE,
    password text NOT NULL
  );