import Position from '../entity/Position';

export default class DistanceAndFareCalculator {
    static calculateFromToDistance(fromLat: number, fromLong: number, toLat: number, toLong: number): number {
        const earthRadius = 6371;
        const degreesToRadians = Math.PI / 180;
        const deltaLat = (toLat - fromLat) * degreesToRadians;
        const deltaLon = (toLong - fromLong) * degreesToRadians;
        const a =
            Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
            Math.cos(fromLat * degreesToRadians) * Math.cos(toLat * degreesToRadians) * Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = earthRadius * c;
        return Math.round(distance * 100) / 100;
    }

    static calculateTotalDistanceAndFare(positions: Position[]): { totalDistance: number; totalFare: number } {
        let totalDistance: number = 0;
        let totalFare: number = 0;
        for (const [index, position] of positions.entries()) {
            const nextPosition = positions[index + 1];
            if (!nextPosition) break;
            const distance = DistanceAndFareCalculator.calculateFromToDistance(position.getLat(), position.getLong(), nextPosition.getLat(), nextPosition.getLong());
            totalDistance += distance;
            totalFare += distance * DistanceAndFareCalculator.getFareValue(nextPosition.getDate());
        }
        return { totalDistance: +totalDistance.toFixed(2), totalFare: +totalFare.toFixed(2) };
    }

    private static getFareValue(date: Date): number {
        if (date.getDate() === 1) return 1;
        if (date.getHours() > 22 || date.getHours() < 6) return 3.9;
        return 2.1;
    }
}
