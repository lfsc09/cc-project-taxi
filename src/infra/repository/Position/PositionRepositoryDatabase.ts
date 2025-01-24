import Position from '../../../core/entity/Position';
import PgPromiseAdapter from '../../database/PostgresqlAdapter';
import { inject } from '../../DI';
import PositionRepository from './PositionRepository';

export default class PositionRepositoryDatabase implements PositionRepository {
    @inject('postgreSQL')
    dbConn?: PgPromiseAdapter;

    async getPositionById(positionId: string): Promise<Position | undefined> {
        const [position] = await this.dbConn?.query(
            `
                SELECT *
                FROM
                    position
                WHERE
                    position_id = $1
                ;
            `,
            [positionId],
        );
        if (position) return Position.restore(position.position_id, position.ride_id, position.lat, position.long, position.date);
        return undefined;
    }

    async getRidePositions(rideId: string): Promise<Position[] | undefined> {
        const [positions] = await this.dbConn?.each(
            `
                SELECT *
                FROM
                    position
                WHERE
                    ride_id = $1
                ;
            `,
            [rideId],
            (row: any) => {
                row = Position.restore(row.row_id, row.ride_id, row.lat, row.long, row.date);
            }
        );
        if (positions) return positions;
        return undefined;
    }

    async createPosition(position: Position): Promise<void> {
        await this.dbConn?.query(
            `
                INSERT INTO
                    position (position_id, ride_id, lat, long, date)
                VALUES
                    ($1, $2, $3, $4, $5)
                ;
            `,
            [position.getPositionId(), position.getRideId(), position.getLat(), position.getLong(), position.getDate().toISOString()],
        );
    }
}
