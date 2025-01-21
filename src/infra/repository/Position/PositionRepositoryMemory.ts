import Position from '../../../core/entity/Position';
import PositionRepository from './PositionRepository';

export default class PositionRepositoryMemory implements PositionRepository {
    positions: Position[] = [];

    async getPositionById(positionId: string): Promise<Position | undefined> {
        return this.positions.find((position: Position) => position.getPositionId() === positionId);
    }

    async createPosition(position: Position): Promise<void> {
        this.positions.push(position);
    }
}
