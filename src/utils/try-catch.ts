import { Request, Response, NextFunction } from 'express';
import { noop } from 'lodash';

export function tryCatch(): Function {
    return (): PropertyDescriptor => {
        let method: Function = noop;

        return {
            configurable: true,
            enumerable: false,

            get() {
                return async (...args: [Request, Response, NextFunction]): Promise<void> => {
                    try {
                        await method.apply(this, args);
                    } catch (e) {
                        const [, , next] = args;
                        return next(e);
                    }
                };
            },

            set(func: Function) {
                method = func;
            }
        };
    };
}
