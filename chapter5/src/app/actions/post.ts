'use server';

import { isNil } from 'lodash';
import { v4 } from 'uuid';

import type { IPost, PaginateReturn, PaginationOptions } from '@/database/types';

import { readDbFile, resetDbFile } from '@/database/generator';
import { paginate } from '@/database/utils';
import { getRandomInt } from '@/libs/random';

/**
 * Query paginated posts
 * @param options
 */
export const queryPostPaginate = async (
    options?: PaginationOptions,
): Promise<PaginateReturn<IPost>> => {
    const posts = (await readDbFile()).reverse();
    return paginate(posts, { page: 1, limit: 8, ...options });
};

/**
 * Query total pages
 * @param limit
 */
export const queryPostTotalPages = async (limit = 8): Promise<number> => {
    const data = await queryPostPaginate({ page: 1, limit });
    return data.meta.totalPages ?? 0;
};

/**
 * Query post by id
 * @param id
 */
export const queryPostItemById = async (id: string): Promise<IPost | null> => {
    const posts = await readDbFile();
    const postItem = posts.find((post) => post.id === id);
    if (isNil(postItem)) throw new Error("Post doesn't exist");
    return postItem;
};

/**
 * Create new post
 * @param data
 */
export const createPost = async (data: Omit<IPost, 'id'>): Promise<IPost> => {
    const posts = await readDbFile();
    const postItem: IPost = {
        ...data,
        id: v4(),
        thumb: `/uploads/thumb/post-${getRandomInt(1, 8)}.png`,
    };
    posts.push(postItem);
    await resetDbFile(posts);
    return postItem;
};

/**
 * Update Post by id
 * @param id
 * @param data
 */
export const updatePostById = async (
    id: string,
    data: Partial<Omit<IPost, 'id'>>,
): Promise<IPost | null> => {
    let posts = await readDbFile();
    const postItem = posts.find((post) => post.id === id);
    if (isNil(postItem)) throw new Error("Post doesn't exist");
    const updateItem = {
        ...(await queryPostItemById(id)),
        ...data, // New value will overwite old value
    } as IPost;
    posts = posts.map((post) => (post.id === id ? updateItem : post));
    await resetDbFile(posts);
    return updateItem;
};

/**
 * Delete post by id
 * @param id
 */
export const deletePostItem = async (id: string): Promise<IPost | null> => {
    let posts = await readDbFile();
    const item = await queryPostItemById(id);
    if (isNil(item)) return null;
    posts = posts.filter((post) => post.id !== id);
    await resetDbFile(posts);
    return item;
};
