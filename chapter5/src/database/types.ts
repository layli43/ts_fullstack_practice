/**
 * Define the pagination data type
 */
export interface PaginateMeta {
    /**
     * The number of items current page contains
     */
    itemCount: number;

    /**
     * The total number of items in the dataset
     */
    totalItems: number;

    /**
     * The number of items per page
     */
    perPage: number;

    /**
     * The total number of pages
     */
    totalPages?: number;

    /**
     * The current page number
     */
    currentPages: number;
}

export interface PaginationOptions {
    /**
     * Current page
     */
    page?: number;

    /**
     * Number of items per page
     */
    limit?: number;
}

/**
 * Return Paginatination result
 */
export interface PaginateReturn<E extends Record<string, any>> {
    meta: PaginateMeta;
    items: E[];
}

/**
 * Artical type
 */
export interface IPost {
    id: string;
    title: string;
    body: string;
    thumb: string;
    summary: string | undefined;
}
