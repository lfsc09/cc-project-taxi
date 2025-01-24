import Position from '../../../core/entity/Position';
import PositionRepository from './PositionRepository';

export default class PositionRepositoryMemory implements PositionRepository {
    positions: Position[] = [];

    async getPositionById(positionId: string): Promise<Position | undefined> {
        return this.positions.find((position: Position) => position.getPositionId() === positionId);
    }

    async getRidePositions(rideId: string): Promise<Position[] | undefined> {
        return this.positions.filter((position: Position) => position.getRideId() === rideId);
    }

    async createPosition(position: Position): Promise<void> {
        this.positions.push(position);
    }
}
