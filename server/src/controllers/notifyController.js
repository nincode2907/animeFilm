'use strict';

const connection = require('../dbs/mysql.db');
const NotifyModel = require('../models/notify.model');

class NotifyController {
    getAllNotification = async (req, res, next) => {
        res.status(200).json(await NotifyModel.getAllNotification());
    }
}

module.exports = new NotifyController