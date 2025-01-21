import AcceptRide from '../../usecases/AcceptRide';
import GetRide from '../../usecases/GetRide';
import RequestRide from '../../usecases/RequestRide';
import StartRide from '../../usecases/StartRide';
import { inject } from '../DI';
import { CallbackInput } from '../http/ExpressAdapter';
import HttpServer from '../http/HttpServer';

export default class RideController {
    @inject('httpServer')
    httpServer?: HttpServer;

    constructor() {
        this.httpServer?.register('get', '/ride/:id', async (request: CallbackInput) => {
            const rideId = (request.params?.id ?? '') as string;
            return await new GetRide().execute(rideId);
        });

        this.httpServer?.register('post', '/ride/request', async (request: CallbackInput) => {
            const input = request.body;
            return await new RequestRide().execute(input);
        });

        this.httpServer?.register('post', '/ride/accept', async (request: CallbackInput) => {
            const input = request.body;
            return await new AcceptRide().execute(input);
        });

        this.httpServer?.register('post', '/ride/start', async (request: CallbackInput) => {
            const input = request.body;
            return await new StartRide().execute(input);
        });

        this.httpServer?.register('put', '/ride/position', async (request: CallbackInput) => {
            const input = request.body;
            return await new RequestRide().execute(input);
        });
    }
}
