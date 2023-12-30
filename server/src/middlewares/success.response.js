'use strict';

const { ReasonPhrases, StatusCodes } = require('./httpStatus')

class SuccessResponse {
    constructor({message, resonStatus = ReasonPhrases.OK, status = StatusCodes.OK, metadata = {}}) {
        this.message = !message ? resonStatus : message
        this.status = status
        this.metadata = metadata
    }
    
    send = (res, header = {}) => {
        res.status(this.status).json(this)
    }
}

class OkayResponse extends SuccessResponse {
    constructor({message, metadata}) {
        super({message, metadata})
    }
}

class CreatedResponse extends SuccessResponse {
    constructor({message, resonStatus = ReasonPhrases.CREATED, status = StatusCodes.CREATED, metadata}) {
        super({message, resonStatus, status, metadata})
    }
}

module.exports = {
    CreatedResponse,
    OkayResponse
}