import express from 'express';
import HttpServer from './HttpServer';

export default class ExpressAdapter implements HttpServer {
    #server: any;

    constructor() {
        this.#server = express();
        this.#server.use(express.json());
    }

    register(method: string, url: string, callback: Function): void {
        this.#server[method](url, async function (req: express.Request, res: express.Response) {
            try {
                const output = await callback(req);
                res.json(output);
            } catch (error: any) {
                res.status(422).json({ message: error.message });
            }
        });
    }

    listen(port: number): void {
        this.#server.listen(port);
    }
}

export type CallbackInput = express.Request;
