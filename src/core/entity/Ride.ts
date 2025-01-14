import Coord from '../vo/Ride/Coord';
import Status, { StatusFactory } from '../vo/Ride/Status';

export default class Ride {
    #rideId: string;
    #passengerId: string;
    #driverId?: string;
    #status: Status;
    #fare?: number;
    #distance?: number;
    #from?: Coord;
    #to?: Coord;
    #date: Date;

    private constructor(
        rideId: string | undefined,
        passengerId: string,
        driverId: string | undefined,
        status: 'requested' | 'accepted' | 'in_progress' | 'completed',
        fare: number | undefined,
        distance: number | undefined,
        fromLat: number | undefined,
        fromLong: number | undefined,
        toLat: number | undefined,
        toLong: number | undefined,
        date: Date,
    ) {
        this.#rideId = !rideId ? crypto.randomUUID() : rideId;
        this.#passengerId = passengerId;
        if (driverId) this.#driverId = driverId;
        this.#status = StatusFactory.create(status);
        if (fare !== undefined) this.#fare = fare;
        if (distance !== undefined) this.#distance = distance;
        if (fromLat !== undefined && fromLong !== undefined) this.#from = new Coord(fromLat, fromLong);
        if (toLat !== undefined && toLong !== undefined) this.#to = new Coord(toLat, toLong);
        this.#date = date;
    }

    static restore(
        rideId: string,
        passengerId: string,
        driverId: string | undefined,
        status: 'requested' | 'accepted' | 'in_progress' | 'completed',
        fare: number | undefined,
        distance: number | undefined,
        fromLat: number | undefined,
        fromLong: number | undefined,
        toLat: number | undefined,
        toLong: number | undefined,
        date: string,
    ): Ride {
        return new Ride(rideId, passengerId, driverId, status, fare, distance, fromLat, fromLong, toLat, toLong, new Date(date));
    }

    static create(passengerId: string, fromLat: number, fromLong: number, toLat: number, toLong: number): Ride {
        return new Ride(undefined, passengerId, undefined, 'requested', undefined, undefined, fromLat, fromLong, toLat, toLong, new Date());
    }

    getRideId(): string {
        return this.#rideId;
    }
    getPassengerId(): string {
        return this.#passengerId;
    }
    getDriverId(): string | undefined {
        return this.#driverId;
    }
    getStatus(): string {
        return this.#status.getValue();
    }
    getFare(): number | undefined {
        return this.#fare;
    }
    getDistance(): number | undefined {
        return this.#distance;
    }
    getFromLat(): number | undefined {
        return this.#from?.getLat();
    }
    getFromLong(): number | undefined {
        return this.#from?.getLong();
    }
    getToLat(): number | undefined {
        return this.#to?.getLat();
    }
    getToLong(): number | undefined {
        return this.#to?.getLong();
    }
    getDate(): Date {
        return this.#date;
    }
}
