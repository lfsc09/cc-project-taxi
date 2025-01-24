import express from 'express';
import HttpServer from './HttpServer';

export default class ExpressAdapter implements HttpServer {
    private server: any;

    constructor() {
        this.server = express();
        this.server.use(express.json());
    }

    register(method: string, url: string, callback: Function): void {
        this.server[method](url, async function (req: express.Request, res: express.Response) {
            try {
                const output = await callback(req);
                res.json(output);
            } catch (error: any) {
                if (/[Nn]ot [Ff]ound/g.test(error.message)) {
                    res.status(404).json({ message: error.message });
                } else {
                    res.status(422).json({ message: error.message });
                }
            }
        });
    }

    listen(port: number): void {
        this.server.listen(port, () => console.log(`Initiate listening at ${3000}`));
    }
}

export type CallbackInput = express.Request;
