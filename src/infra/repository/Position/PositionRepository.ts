import Position from "../../../core/entity/Position";

export default interface PositionRepository {
    getPositionById(positionId: string): Promise<Position | undefined>;
    createPosition(position: Position): Promise<void>;
}