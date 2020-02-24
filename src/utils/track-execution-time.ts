import { logger } from './logger';

const NS_PER_SEC = 1e9;
const MS_PER_NS = 1e6;

const calculateExecutionTime = (diff: number[]): number => (diff[0] * NS_PER_SEC + diff[1]) / MS_PER_NS;

export function trackExecutionTime(_target: any, propertyName: string, descriptor: TypedPropertyDescriptor<any>) {
    const method: Function | undefined = descriptor.value;

    descriptor.value = async function() {
        const time = process.hrtime();

        const result = method && (await method.apply(this, arguments));

        const diff = process.hrtime(time);

        logger.info(`'${propertyName}' method execute ${calculateExecutionTime(diff)} ms`);

        return result;
    };
}
