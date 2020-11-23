<p align="center"><a href="https://knawat.com/" target="_blank"><img src="https://knawat.com/wp-content/uploads/2017/10/253_77.png" alt="Knawat" width="300"></a></p>

<p align="center">
  <a href="https://gitter.im/Knawat/Lobby" rel="nofollow">
    <img src="https://badges.gitter.im/Join%20Chat.svg" alt="Join the chat at Knawat">
  </a>
  <a href="http://isitmaintained.com/project/Knawat/Knawat-NPM-JavaScript-SDK">
    <img src="http://isitmaintained.com/badge/resolution/Knawat/Knawat-NPM-JavaScript-SDK.svg" alt="Average time to resolve an issue"/>
  </a>
  <a href="http://isitmaintained.com/project/Knawat/Knawat-NPM-JavaScript-SDK">
    <img src="http://isitmaintained.com/badge/open/Knawat/Knawat-NPM-JavaScript-SDK.svg" alt="Percentage of issues still open"/>
  </a>
  <a href="https://npm-stat.com/charts.html?package=@knawat/mp">
    <img src="https://img.shields.io/npm/dm/@knawat/mp.svg" alt="npm"/>
  </a>
  <a href="https://www.npmjs.com/package/@knawat/mp">
    <img src="https://img.shields.io/npm/v/@knawat/mp.svg" alt="npm"/>
  </a>
</p>

# Knawat Node.js NPM Package (MP)

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/57a87a5472f643a0b8b4a920075baa5b)](https://app.codacy.com/app/Knawat/Knawat-NPM-JavaScript-SDK?utm_source=github.com&utm_medium=referral&utm_content=Knawat/Knawat-NPM-JavaScript-SDK&utm_campaign=Badge_Grade_Settings)

A Node.js package for Knawat Dropshipping MP REST API. Easily interact with the Knawat MP REST API using this library.

## Installation

```
npm install @knawat/mp --save

yarn add @kanwat/mp
```

## Getting started

Check out the Knawat Dropshipping MP REST API endpoints and data that can be manipulated in <https://mp.knawat.io/>.

## Setup

Setup for the new Knawat Dropshipping REST API integration:

```javascript
const MP = require('@knawat/mp');

// Provide instance with your store credentials
const mp = new MP({
  key: 'XXXXXXXXXXXXXXXXXXXXXXXXXXX',
  secret: 'XXXXXXXXXXXXXXXXXXXXXXXX',
});

// Or use your store id/URL
// Supported using basic auth only
const mp = new MP({
  store: 'XXXXXXXXXXXXXXXXXXXXXXXXXXX',
});
```

### Options

| Option   | Type     | Required    | Description                                                                   |
| -------- | -------- | ----------- | ----------------------------------------------------------------------------- |
| `key`    | `string` | conditional | Your Store's API consumer key if token not provided this field is required    |
| `secret` | `string` | conditional | Your Store's API consumer secret if token not provided this field is required |
| `store`  | `string` | conditional | Your store current store URL                                                  |

<small>https://knawat-mp.restlet.io/#operation_get_token</small>


## Library Methods


### Products Functions

All the functions mentioned here return a promise and it's an async function.
What's mentioned between `[brackets]` are the authentication method used for the functions.

Example 
```JavaScript
mp.getProducts() // return a promise.
```

* My Products
  * [__getProducts([params])__](https://docs.knawat.io/#tag/My-Products/paths/~1catalog~1products/get)
  * [__addProducts(products)__](https://docs.knawat.io/#tag/My-Products/paths/~1catalog~1products/post)
  * [__updateBulkProduct(data)__](https://docs.knawat.io/#tag/My-Products/paths/~1catalog~1products/patch)
  * [__getMyProductsCount(params)__](https://docs.knawat.io/#tag/My-Products/paths/~1catalog~1products~1count/get)
  * [__getMyProductBySku(id, [params])__](https://docs.knawat.io/#tag/My-Products/paths/~1catalog~1products~1{sku}/get)
  * [__updateProductBySku(id, product)__](https://docs.knawat.io/#tag/My-Products/paths/~1catalog~1products~1{sku}/put)
  * [__deleteProductBySku(id)__](https://docs.knawat.io/#tag/My-Products/paths/~1catalog~1products~1{sku}/delete)
* Orders
  * [__getOrders([params])__](https://docs.knawat.io/#tag/Orders/paths/~1orders/get)
  * [__getOrderById(id)__](https://docs.knawat.io/#tag/Orders/paths/~1orders~1{order_id}/get)
  * [__getOrderWarnings(id)__](https://docs.knawat.io/#tag/Orders/paths/~1orders~1{order_id}~1warnings/get)
  * [__cancelOrder(id)__](https://docs.knawat.io/#tag/Orders/paths/~1orders~1{order_id}/delete)
  * [__payOrder(id)__](https://docs.knawat.io/#tag/Orders/paths/~1orders~1pay~1{order_id}/put)
  * [__createOrder(order)__](https://docs.knawat.io/#tag/Orders/paths/~1orders/post)
  * [__updateOrder(id, order)__](https://docs.knawat.io/#tag/Orders/paths/~1orders~1{order_id}/put)
* Invoices
  * [__getInvoices([params])__](https://docs.knawat.io/#tag/Invoices/paths/~1invoices/get)
  * [__applyCreditsToInvoice(id, data)__](https://docs.knawat.io/#tag/Invoices/paths/~1invoices~1{id}~1credits/post)
* Categories
  * __getAllCategories()__
  * __getCategories([params])__
* Payments
  * __addPayment(storeId, payment)__`[Basic]`
  * [__listPayments([params])__](https://docs.knawat.io/#tag/Payments/paths/~1payments/get)
* Logs `[Basic]`
  * __getStoreLogs([params])__
  * [__createStoreLogs(log)__](https://docs.knawat.io/#tag/Logs/paths/~1logs/post) `[Basic|Bearer]`
* Products `[Basic]`
  * __getProductsByVariationSku(sku)__
  * __getProductBySku(sku[, params])__
* Stores `[Basic]`
  * __listStores([params])__
  * __createStore(store)__
  * __updateStore(id, store)__
  * __getStoreByURL(storeId[, params])__
  * __getStoresByUser(userEmail[, limit])__
* Shipping `[Basic]`
  * __getShippingRules(country, weight, price)__
  * __getShippingCouriers()__
  * __getAllShipmentPolicies()__
  * __createShipmentPolicy(shipment)__
  * __getShipmentPolicyById(id)__
  * __updateShipmentPolicy(id, shipment)__
* Subscriptions `[Basic]`
  * __listSubscriptions([params])__
  * __addSubscription(subscription)__
  * __cancelSubscription(id)__
  * __updateSubscription(id, subscription)__
* Memberships `[Basic]`
  * __listMemberships()__
  * __getMembershipById(id[, params])__
  * __createMembership(membership)__
  * __updateMembership(id, membership)__
* Coupons `[Basic]`
  * __listCoupons([params])__
  * __getCoupon(id[, params])__
  * __createCoupon(coupon)__
  * __updateCoupon(id coupon)__
* Taxes `[Basic]`
  * __getTaxRecords([params])__
  * __createTaxRecord(tax)__
  * __updateTaxRecord(id, tax)__
  * __getTaxById(id)__
  * __deleteTaxRecord(id)__


### REST Function

This function is used internally as a warpper for the library.
An Async function that requests Data from server. 

| Params    | Type     | Description                                                                  |
| --------- | -------- | ---------------------------------------------------------------------------- |
| `Method`  | `string` | HTTP Methods for RESTful Services (Get, Put, Post, Patch, Delete)            |
| `Path`    | `string` | WooCommerce API endpoint, example: `catalog/products` or `orders/{order_id}` |
| `options` | `Object` | options { queryParams, auth, body, headers }                                 |

```javascript
mp.$fetch(method, path,options={});
```

Example: 
```javascript
mp.$fetch('GET', '/catalog/categories', { auth: 'token' }); // returns object : count and categories array

```

## postman 

If you want to test the API on the postman you can get the bearer token by using this following mettohds: 

```javascript
 mp.getTokenAuth() // Async function
 mp.getToeknAuth().then(console.log)
```
After that you can use the available resource to test and see the results you got!.


## Reporting Security Issues

To disclose a security issue to our team, [please submit a report here](https://knawat.com/contact/).

## Support & Chat

Developers are welcome here, please create issue or [chat with us https://gitter.im/Knawat/Lobby](https://gitter.im/Knawat/Lobby). This repository is not suitable for Knawat customers support. Please don't use our issue tracker for support requests, but for Knawat Dropshipping NPM Package issues only. Support can take place through [Knawat support portal](https://help.knawat.com/hc/en-us/requests/new/) which is available for free.

Support requests in issues on this repository will be closed on sight.

## Contributing to Knawat

If you have a patch or have stumbled upon an issue with Knawat NPM Package, you can contribute this back to the code. Please create a pull request.

## Check also

- [Knawat RESTful API](https://mp.knawat.io)
- [Knawat PHP SDK](https://github.com/Knawat/Knawat-PHP-SDK)
- [WooCommerce Dropshipping Plugin](https://github.com/Knawat/dropshipping-woocommerce)
- [Magento 2 Module](https://github.com/Knawat/knawat-dropshipping-magento2)
- [OpenCart Module](https://github.com/Knawat/knawat-dropshipping-opencart)
