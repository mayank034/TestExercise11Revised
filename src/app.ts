import express from 'express';
import 'reflect-metadata';
import 'module-alias/register';
import { Kernel } from './core/kernel';
import { Routes } from './api/route';
class App {
    public app: express.Application = express();
    private kernel: Kernel = new Kernel();
    private router: Routes = new Routes();
    constructor() {
        this.initMiddlewares();
    }
    private async initMiddlewares() {
        this.kernel.initBodyParser(this.app);
        await this.kernel.databaseConnection();
        this.router.routes(this.app);
    }
}

export default new App().app;
