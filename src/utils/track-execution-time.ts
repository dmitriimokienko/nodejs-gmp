import { logger } from './logger';

const NS_PER_SEC = 1e9;
const MS_PER_NS = 1e6;

const calculateExecutionTime = (time: number[]): number => (time[0] * NS_PER_SEC + time[1]) / MS_PER_NS;

export function trackExecutionTime(_target: any, propertyName: string, descriptor: TypedPropertyDescriptor<any>) {
    const method: Function | undefined = descriptor.value;

    descriptor.value = async function execute(...args: any) {
        const time = process.hrtime();

        const result = method && (await method.apply(this, args));

        const timeDifference = process.hrtime(time);

        logger.info(`'${propertyName}' method execute ${calculateExecutionTime(timeDifference)} ms`);

        return result;
    };
}
