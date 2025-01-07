import GetRide from "../../usecases/GetRide";
import RequestRide from "../../usecases/RequestRide";
import { inject } from "../DI";
import { CallbackInput } from "../http/Express";
import HttpServer from "../http/HttpServer";

export default class AccountController {
    @inject("httpServer")
    httpServer?: HttpServer;

    constructor() {
        this.httpServer?.register('get', '/getRide', async (request: CallbackInput) => {
            const rideId = (request.query?.id ?? '') as string;
            return await new GetRide().execute(rideId);
        });

        this.httpServer?.register('post', '/requestRide', async (request: CallbackInput) => {
            const input = request.body;
            return await new RequestRide().execute(input);
        });
    }
}