import { pickBy } from 'lodash';
import { prepareSearchSubstring } from './prepare-search-substring';
import { prepareLimit } from './prepare-limit';

type Search = {
    [key: string]: any;
};

type Options = Record<string, unknown>;

export const createSequelizeFindOptions = (search: Search, count?: string): Options => {
    const key = Object.keys(search)[0];

    const substring = prepareSearchSubstring(search[key]);
    const limit = prepareLimit(count);

    return pickBy({
        where: substring ? { [key]: substring } : {},
        limit,
        raw: true
    });
};
