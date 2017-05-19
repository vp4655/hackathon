import express from 'express';
import Test from './controllers/test.controller.js';

export default () => {
    const router = express.Router();

    router.route('/test')
        .get(Test.list);

    return router;
};
