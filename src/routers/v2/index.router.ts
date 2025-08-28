import express from 'express'
import pingRouter from '../../modules/ping/ping.router';

const v2Router = express.Router();

v2Router.use('/ping',pingRouter)


export default v2Router