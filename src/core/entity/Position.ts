import Coord from '../vo/Ride/Coord';

export default class Position {
    private positionId: string;
    private rideId: string;
    private coord: Coord;
    private date: Date;

    private constructor(positionId: string | undefined, rideId: string, lat: number, long: number, date: Date) {
        this.positionId = !positionId ? crypto.randomUUID() : positionId;
        this.rideId = rideId;
        this.coord = new Coord(lat, long);
        this.date = date;
    }

    static restore(positionId: string, rideId: string, lat: number, long: number, date: string): Position {
        return new Position(positionId, rideId, lat, long, new Date(date));
    }

    static create(rideId: string, lat: number, long: number): Position {
        return new Position(undefined, rideId, lat, long, new Date());
    }

    getPositionId(): string {
        return this.positionId;
    }
    getRideId(): string {
        return this.rideId;
    }
    getLat(): number {
        return this.coord.getLat();
    }
    getLong(): number {
        return this.coord.getLong();
    }
    getDate(): Date {
        return this.date;
    }
}
