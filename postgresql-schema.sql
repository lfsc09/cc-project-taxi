CREATE DATABASE cc_taxi;

\c cc_taxi

CREATE TABLE account (
    account_id UUID PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    cpf TEXT NOT NULL,
    car_plate TEXT NULL,
    is_passenger BOOLEAN NOT NULL DEFAULT false,
    is_driver BOOLEAN NOT NULL DEFAULT false,
    password TEXT NOT NULL
);

CREATE TABLE ride (
    ride_id UUID PRIMARY KEY,
    passenger_id UUID,
    driver_id UUID,
    status TEXT,
    fare NUMERIC,
    distance NUMERIC,
    from_lat NUMERIC,
    from_long NUMERIC,
    to_lat NUMERIC,
    to_long NUMERIC,
    date TIMESTAMP
);

CREATE TABLE position (
    position_id UUID PRIMARY KEY,
    ride_id UUID,
    lat NUMERIC,
    long NUMERIC,
    date TIMESTAMP
);