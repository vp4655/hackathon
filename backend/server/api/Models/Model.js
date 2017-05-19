import db from '../../database/db';

export class Model {
    constructor(tableName) {
        this.db = db;
        this.tableName = tableName;
    }

    getAll() {
        return this.db.select('*')
            .from(this.tableName);
    }
}
