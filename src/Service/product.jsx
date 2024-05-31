import { apiRoot } from "./client";
import { myApiRoot } from "./client";

// export const getProductDetails = () => {
//   return apiRoot
//     .products()
//     .get({ queryArgs: { limit: 10 } })
//     .execute();
// };

export const getProductProjectionsDetails = (event) => {
  return apiRoot
    .productProjections()
    .search()
    .get({
      queryArgs: {
        "text.en": event.input,
        limit: 10,
        staged: true,
      },
    })
    .execute();
};

export const createOrderFromProductSKU = async (event) => {
  const cart = await apiRoot
    .carts()
    .post({
      body: {
        currency: "USD",
        country: "US",
        shippingAddress: { country: "US" },
      },
    })
    .execute();
  const cart_1 = await apiRoot
    .carts()
    .withId({ ID: cart.body.id })
    .post({
      body: {
        version: cart.body.version,
        actions: event.arrayOfSKUs.map((sku) => {
          return {
            action: "addLineItem",
            sku,
          };
        }),
      },
    })
    .execute();
  const matchingShippingMethod = await apiRoot
    .shippingMethods()
    .matchingCart()
    .get({
      queryArgs: {
        cartId: cart_1.body.id,
      },
    })
    .execute()
    .then((response) => response.body.results[0]);
  const cart_2 = await apiRoot
    .carts()
    .withId({ ID: cart_1.body.id })
    .post({
      body: {
        version: cart_1.body.version,
        actions: [
          {
            action: "setShippingMethod",
            shippingMethod: {
              typeId: "shipping-method",
              id: matchingShippingMethod.id,
            },
          },
        ],
      },
    })
    .execute();
  return await apiRoot
    .orders()
    .post({
      body: {
        version: cart_2.body.version,
        cart: {
          id: cart_2.body.id,
          typeId: "cart",
        },
      },
    })
    .execute();
};

export const createOrderFromProductSKUandMeApi = (event) => {
  return myApiRoot
    .me()
    .carts()
    .post({
      body: {
        currency: "USD",
        country: "US",
        shippingAddress: { country: "US" },
      },
    })
    .execute()
    .then((cart) => {
      return myApiRoot
        .me()
        .carts()
        .withId({ ID: cart.body.id })
        .post({
          body: {
            version: cart.body.version,
            actions: event.arrayOfSKUs.map((sku) => {
              return {
                action: "addLineItem",
                sku,
              };
            }),
          },
        })
        .execute();
    })
    .then(async (cart) => {
      const matchingShippingMethod = await myApiRoot
        .shippingMethods()
        .matchingCart()
        .get({
          queryArgs: {
            cartId: cart.body.id,
          },
        })
        .execute()
        .then((response) => response.body.results[0]);
      return myApiRoot
        .me()
        .carts()
        .withId({ ID: cart.body.id })
        .post({
          body: {
            version: cart.body.version,
            actions: [
              {
                action: "setShippingMethod",
                shippingMethod: {
                  typeId: "shipping-method",
                  id: matchingShippingMethod.id,
                },
              },
            ],
          },
        })
        .execute();
    })
    .then((cart) => {
      return myApiRoot
        .me()
        .orders()
        .post({
          body: {
            version: cart.body.version,
            id: cart.body.id,
          },
        })
        .execute();
    });
};
