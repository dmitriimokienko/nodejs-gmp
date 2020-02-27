import { noop } from 'lodash';
import { logger } from './logger';

const NS_PER_SEC = 1e9;
const MS_PER_NS = 1e6;

const calculateExecutionTime = (time: number[]): number => (time[0] * NS_PER_SEC + time[1]) / MS_PER_NS;

export function trackExecutionTime(): Function {
    return (_target: any, propertyName: string): PropertyDescriptor => {
        let method: Function = noop;

        return {
            configurable: true,
            enumerable: false,

            get() {
                return async (...args: any) => {
                    const time = process.hrtime();
                    const result = await method.apply(this, args);
                    const timeDifference = process.hrtime(time);

                    logger.info(`'${propertyName}' method execute ${calculateExecutionTime(timeDifference)} ms`);

                    return result;
                };
            },

            set(func: Function) {
                method = func;
            }
        };
    };
}
