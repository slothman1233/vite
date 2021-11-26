type bodyModel<T> = {
    subcode?: string,
    code?: number,
    message?: string,
    requestLine?: number,
    bodyMessage?: T
}




class BaseModel<T> {
    bodyMessage: T
    code: number
    subcode: string
    message: string
    requestLine: number
    constructor({ bodyMessage = null, code, subcode = '', message = 'exception', requestLine = -1 }: bodyModel<T>) {
        this.bodyMessage = bodyMessage
        this.code = code
        this.subcode = subcode
        this.message = message
        this.requestLine = requestLine
    }
}

/**
 * 成功的模型
 */
class SuccessModel<T> extends BaseModel<T> {
    constructor({ bodyMessage, code, subcode, message, requestLine }: bodyModel<T>) {
        if (code) {
            super({ bodyMessage, code, subcode, message, requestLine })
        } else {
            super({ bodyMessage, code: 0, subcode, message, requestLine })
        }
    }
}

/**
 * 错误的模型
 */
class ErrorModel<T> extends BaseModel<T> {
    constructor({ bodyMessage, code, subcode, message, requestLine }: bodyModel<T>) {
        if (code) {
            super({ bodyMessage, code, subcode, message, requestLine })
        } else {
            super({ bodyMessage, code: -1, subcode, message, requestLine })
        }
    }
}
class ReturnModel<T> extends BaseModel<T> {
    constructor({ bodyMessage, code, subcode, message, requestLine }: bodyModel<T>) {
        if (code) {
            super({ bodyMessage, code, subcode, message, requestLine })
        } else {
            super({ bodyMessage, code: -1, subcode, message, requestLine })
        }
    }
}

export {
    SuccessModel,
    ErrorModel,
    ReturnModel,
    bodyModel
}