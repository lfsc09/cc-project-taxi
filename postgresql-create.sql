drop schema if exists ccca cascade;

create schema ccca;

create table
    ccca.account (
        account_id uuid primary key,
        name text not null,
        email text not null,
        cpf text not null,
        car_plate text null,
        is_passenger boolean not null default false,
        is_driver boolean not null default false,
        password text not null
    );

create table
    ccca.ride (
        ride_id uuid,
        passenger_id uuid,
        driver_id uuid,
        status text,
        fare numeric,
        distance numeric,
        from_lat numeric,
        from_long numeric,
        to_lat numeric,
        to_long numeric,
        date timestamp
    );

create table
    ccca.position (
        position_id uuid,
        ride_id uuid,
        lat numeric,
        long numeric,
        date timestamp
    );

-- insert into
--     ccca.account (
--         account_id,
--         name,
--         email,
--         cpf,
--         car_plate,
--         is_passenger,
--         is_driver,
--         password
--     )
-- values
--     (
--         '87549960-5557-443e-86c7-3021b3cf9e04'::UUID,
--         "Jonas Prosta",
--         "jonas@gmail.com",
--         "97456321558",
--         NULL,
--         'TRUE',
--         'FALSE',
--         "123456",
--     ),
--     (
--         '61fa0396-d73a-487c-abf9-83a64bfc7dd4'::UUID,
--         "Jonas Kaban",
--         "jkab@gmail.com",
--         "97456321558",
--         "ZZZ0000",
--         'FALSE',
--         'TRUE',
--         "123456",
--     );

-- insert into
--     ride (
--         ride_id,
--         passenger_id,
--         status,
--         from_lat,
--         from_long,
--         to_lat,
--         to_long,
--         date
--     )
-- values
--     (
--         '0d63a8cf-1607-4b53-b9a4-1d9623caa8f9',
--         '87549960-5557-443e-86c7-3021b3cf9e04',
--         'requested',
--         '-25.4451499',
--         '-49.307889',
--         '-25.460001020387935',
--         '-49.265266248935745',
--         current_timestamp
--     );