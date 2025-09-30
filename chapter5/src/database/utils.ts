import { base, en, Faker, zh_CN } from '@faker-js/faker';
import { isNil } from 'lodash';

import type { PaginateReturn, PaginationOptions } from './type';

/**
 * Paginate function
 * @param data
 * @param options
 */
export const paginate = async <T extends Record<string, any>>(
    data: T[],
    options: PaginationOptions,
): Promise<PaginateReturn<T>> => {
    const limit = isNil(options.limit) || options.limit < 1 ? 1 : options.limit;
    const page = isNil(options.page) || options.page < 1 ? 1 : options.page;
    const start = page > 1 ? (page - 1) * limit : 0;
    const items = data.slice(start, start + limit);
    const totalPages =
        data.length % limit === 0 ? data.length / limit : Math.floor(data.length / limit) + 1;
    const remainder = data.length % limit === 0 ? limit : data.length % limit;
    const itemCount = page < totalPages ? limit : remainder;
    return {
        items,
        meta: {
            itemCount,
            totalItems: data.length,
            perPage: limit,
            totalPages,
            currentPages: page,
        },
    };
};

/**
 * Create a Faker instance with mutiple locale
 */
export const faker = new Faker({
    locale: { en, zh_CN, base },
});
