import { toNumber, isInteger } from 'lodash';

export const prepareLimit = (count?: string): number | undefined => {
    const limit = toNumber(count);
    return isInteger(limit) ? limit : undefined;
};
