import {Plant} from '../Models/Plant';

let plant = new Plant();

export default {
    list: (req, res, next) => {
        plant.getAll().then(function (plants) {
            res.status(200)
                .json(plants);
        });
    }
};

