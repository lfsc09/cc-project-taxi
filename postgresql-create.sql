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

CREATE TABLE
    ccca.ride (
        ride_id uuid,
        passenger_id uuid,
        driver_id uuid,
        status text,
        fare NUMERIC,
        distance NUMERIC,
        from_lat NUMERIC,
        from_long NUMERIC,
        to_lat NUMERIC,
        to_long NUMERIC,
        date TIMESTAMP
    );