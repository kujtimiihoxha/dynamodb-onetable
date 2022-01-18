"use strict";
/*
    OneTable error class
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.OneTableArgError = exports.OneTableError = void 0;
function init(self, message, context) {
    self.name = self.constructor.name;
    self.message = message;
    if (context) {
        self.context = context;
        if (context.code) {
            self.code = context.code;
            delete context.code;
        }
    }
    self.date = new Date();
    if (typeof Error.captureStackTrace === 'function') {
        Error.captureStackTrace(self, self.constructor);
    }
    else {
        self.stack = (new Error(message)).stack;
    }
}
class OneTableError extends Error {
    constructor(message, context) {
        super(message);
        init(this, message, context);
    }
    toString() {
        let buf = [`message: ${this.message}`];
        if (this.context.code) {
            buf.push(`code: ${this.code}`);
        }
        if (this.context) {
            buf.push(`context: ${JSON.stringify(this.context, null, 4)}`);
        }
        return buf.join('\n');
    }
}
exports.OneTableError = OneTableError;
class OneTableArgError extends Error {
    constructor(message, context) {
        super(message, context);
        init(this, message, context);
        this.code = context.code || 'ArgumentError';
    }
}
exports.OneTableArgError = OneTableArgError;
