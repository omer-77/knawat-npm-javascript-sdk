import mp from './setup';

const orderSample = {
  items: [
    { sku: 'W1K-3500-808054', quantity: 1 },
    { sku: 'A2KT18A82208-5400XL', quantity: 1 },
  ],
  status: 'processing',
  shipping: {
    first_name: 'John',
    last_name: 'Doe',
    address_1: 'John Doe 123',
    address_2: 'Main St',
    city: 'The City',
    state: 'Any town',
    postcode: 'ST3 7HS',
    country: 'US',
    email: 'email@example.com',
    phone: '+19098648831',
  },
  notes: 'Drop it at the door, do not knock the door',
  invoice_url: 'https://example.com/invoice.pdf',
};

// To be filled later with created order, we need to cancel it later
let createdOrder = {};

jest.setTimeout(10000);

test('Create order', () => {
  return mp.createOrder(orderSample).then(({ data }) => {
    createdOrder = data;
    expect(typeof data.id).toBe('string');
    expect(data.status).toBe('draft');
  });
});

test('Get orders', () => {
  return mp.getOrders().then(([order]) => {
    expect(typeof order.id).toBe('string');
    expect(['pending', 'processing', 'cancelled', 'open', 'draft', 'void']).toContain(
      order.status
    );
  });
});

test('Get Order By Id', () => {
  return mp
    .getOrders()
    .then((data) => data[0].id)
    .then((id) => {
      return mp.getOrderById(id).then((res) => {
        expect(res.id).toBe(id);
        expect(res.status).toBeDefined();
      });
    });
});

test('Update Order By Id', () => {
  return mp.updateOrder(createdOrder.id, orderSample).then((res) => {
    expect(res).toBeDefined();
  });
});

test('Cancel Order By Id', () => {
  return mp.cancelOrder(createdOrder.id).then((res) => {
    expect(res).toBeDefined();
  });
});
