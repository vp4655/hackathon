import api from '../api/router';

export const route = ({app, config, db}) => {
    app.use('/api', api(db));

    app.route('/*').get((req, res, next) => {
        res.status(200)
            .json({
                status: 'success',
                message: 'Good good, use your anger!'
            });
    });
};
