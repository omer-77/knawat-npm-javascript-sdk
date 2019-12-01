import { I18nText } from '../types/I18nText';

type Category = {
  id: number;
  parentId: number;
  productsCount: number;
  treeNodeLevel: number;
  name: I18nText;
};
type Categories = {
  count: number;
  categories: Array<Category>;
};
type CategoriesQueryParams = {
  parentId?: number;
  treeNodeLevel?: number;
};

export default {
  /**
   * Get all catalog categories
   *
   * @see http://docs.knawat.io/#tag/Products/paths/~1catalog~1categories/get
   */
  listCategories(): Promise<Categories> {
    return this.$fetch<Categories>('GET', '/catalog/categories', { auth: 'token' });
  },

  /**
   * get invoices list
   *
   * @see http://docs.knawat.io/#tag/Products/paths/~1catalog~1categories/get
   */
  getCategories(queryParams: CategoriesQueryParams): Promise<Category> {
    return this.$fetch<Category>('GET', '/catalog/categories', {
      auth: 'token',
      queryParams,
    });
  },
};
