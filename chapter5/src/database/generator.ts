'use server';

import { access, readFile, writeFile } from 'node:fs/promises';
import path, { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { v4 } from 'uuid';

import { getRandomInt } from '@/libs/random';

import type { IPost } from './types';

import { faker } from './utils';

/**
 * Aquire the dirname of the current module.
 */
const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Starting data, generate with 22 articles
 */
const posts: IPost[] = [...Array.from({ length: 22 }).keys()].map(() => ({
    id: v4(),
    thumb: `/uploads/thumb/post-${getRandomInt(1, 8)}.png`,
    title: faker.lorem.paragraph({ min: 1, max: 3 }),
    body: faker.lorem.paragraphs({ min: 3, max: 6 }, '\n'),
    summary: Math.random() < 0.5 ? faker.lorem.text() : undefined,
}));

/**
 * Check if the database file exists,
 * if not create one and write the starting data to it.
 */
const checkDbFile = async () => {
    const dbPath = resolve(__dirname, 'db.json');
    try {
        await access(dbPath);
    } catch {
        const json = JSON.stringify(posts);
        await writeFile(dbPath, json);
    }
};

/**
 * Read data through db file.
 */
export const readDbFile = async (): Promise<IPost[]> => {
    await checkDbFile();
    const dbPath = resolve(__dirname, 'db.json');
    const data = await readFile(dbPath, 'utf-8');
    return JSON.parse(data);
};

/**
 * Reset the db file with new data
 */
export const resetDbFile = async (data: IPost[]) => {
    await checkDbFile();
    const dbPath = resolve(__dirname, 'db.json');
    const json = JSON.stringify(data);
    await writeFile(dbPath, json);
};
