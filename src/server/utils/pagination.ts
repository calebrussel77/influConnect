/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { type PaginationInput } from '../api/validations/base.validations';

export const DEFAULT_PAGE_SIZE = 20;

export function getPagination(limit: number, page: number | undefined) {
  const take = limit > 0 ? limit : undefined;
  const skip = page && take ? (page - 1) * take : undefined;

  return { take, skip };
}

export function getPagingData<T>(
  data: { count?: number; items: T[] },
  limit?: number,
  page?: number
) {
  const { count: totalItems = 0, items } = data;
  const currentPage = page ?? 1;
  const pageSize = limit ?? totalItems;
  const totalPages =
    pageSize && totalItems ? Math.ceil(totalItems / pageSize) : 1;

  return { items, totalItems, currentPage, pageSize, totalPages };
}

export async function getPagedData<TQuery extends PaginationInput, TData>(
  { page, limit, ...rest }: TQuery,
  fn: (
    args: { skip?: number; take?: number } & Omit<TQuery, 'page' | 'limit'>
  ) => Promise<{ items: TData; count?: number }>
) {
  const take = !page ? undefined : limit;
  const skip = !page ? undefined : (page - 1) * limit;

  const { items, count } = await fn({ skip, take, ...rest });

  return {
    currentPage: page,
    pageSize: take,
    totalPages: !!take && !!count ? Math.ceil(count / take) : 1,
    totalItems: count,
    items,
  };
}
