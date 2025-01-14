export default class Coord {
    constructor(
        private readonly lat: number,
        private readonly long: number,
    ) {}

    getLat(): number {
        return this.lat;
    }
    getLong(): number {
        return this.long;
    }
}
