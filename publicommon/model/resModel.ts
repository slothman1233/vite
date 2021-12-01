type bodyModel<T> = {
  subCode?: string;
  code?: number;
  message?: string;
  requestLine?: number;
  bodyMessage?: T;
};

class BaseModel<T> {
  bodyMessage: T;
  code: number;
  subCode: string;
  message: string;
  requestLine: number;
  constructor({
    bodyMessage = null,
    code,
    subCode = '',
    message = 'exception',
    requestLine = -1,
  }: bodyModel<T>) {
    this.bodyMessage = bodyMessage;
    this.code = code;
    this.subCode = subCode;
    this.message = message;
    this.requestLine = requestLine;
  }
}

/**
 * 成功的模型
 */
class SuccessModel<T> extends BaseModel<T> {
  constructor({ bodyMessage, code, subCode, message, requestLine }: bodyModel<T>) {
    if (code) {
      super({ bodyMessage, code, subCode, message, requestLine });
    } else {
      super({ bodyMessage, code: 0, subCode, message, requestLine });
    }
  }
}

/**
 * 错误的模型
 */
class ErrorModel<T> extends BaseModel<T> {
  constructor({ bodyMessage, code, subCode, message, requestLine }: bodyModel<T>) {
    if (code) {
      super({ bodyMessage, code, subCode, message, requestLine });
    } else {
      super({ bodyMessage, code: -1, subCode, message, requestLine });
    }
  }
}
class ReturnModel<T> extends BaseModel<T> {
  constructor({ bodyMessage, code, subCode, message, requestLine }: bodyModel<T>) {
    if (code) {
      super({ bodyMessage, code, subCode, message, requestLine });
    } else {
      super({ bodyMessage, code: -1, subCode, message, requestLine });
    }
  }
}

export { SuccessModel, ErrorModel, ReturnModel, bodyModel };
