import KnawatMP from './KnawatMP';
import categories from './api/categories';
import invoices from './api/invoices';
import membership from './api/membership';
import orders from './api/orders';
import products from './api/products';

KnawatMP._addToPrototype(categories);
KnawatMP._addToPrototype(invoices);
KnawatMP._addToPrototype(membership);
KnawatMP._addToPrototype(miscellaneous);
KnawatMP._addToPrototype(orders);
KnawatMP._addToPrototype(products);

module.exports = KnawatMP;
