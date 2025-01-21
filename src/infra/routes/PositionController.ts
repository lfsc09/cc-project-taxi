import UpdatePosition from '../../usecases/UpdatePosition';
import { inject } from '../DI';
import { CallbackInput } from '../http/ExpressAdapter';
import HttpServer from '../http/HttpServer';

export default class PositionController {
    @inject('httpServer')
    httpServer?: HttpServer;

    constructor() {
        this.httpServer?.register('put', '/ride/position', async (request: CallbackInput) => {
            const input = request.body;
            return await new UpdatePosition().execute(input);
        });
    }
}
