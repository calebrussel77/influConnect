import { slugit } from '@/utils/strings';
import { throwDbError } from './error-handling';
import { getRandomId } from '@/utils/misc';

export const getSlugifiedField = async (
  field: string,
  queryCondition: (slug: string) => Promise<unknown>
) => {
  try {
    const slug = slugit(field);
    let uniqueSlug = slug;
    while (await queryCondition(uniqueSlug)) {
      uniqueSlug = `${slug}-${getRandomId()}`;
    }
    return uniqueSlug;
  } catch (e) {
    throwDbError(e);
  }
};
