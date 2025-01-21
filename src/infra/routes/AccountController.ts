import GetAccount from '../../usecases/GetAccount';
import Signup from '../../usecases/Signup';
import { inject } from '../DI';
import { CallbackInput } from '../http/ExpressAdapter';
import HttpServer from '../http/HttpServer';

export default class AccountController {
    @inject('httpServer')
    httpServer?: HttpServer;

    constructor() {
        this.httpServer?.register('get', '/account/:id', async (request: CallbackInput) => {
            const accountId = (request.params?.id ?? '') as string;
            return await new GetAccount().execute(accountId);
        });

        this.httpServer?.register('post', '/signup', async (request: CallbackInput) => {
            const input = request.body;
            return await new Signup().execute(input);
        });
    }
}
