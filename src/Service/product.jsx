import apiRoot from "./client";

export const getProductDetails = () => {
  return apiRoot
    .products()
    .get({ queryArgs: { limit: 10 } })
    .execute();
};

export const getProductProjectionsDetails = (event) => {
  console.log("key"  + event)
  return apiRoot.productProjections().search().get(
    { queryArgs:{
      "text.en":"Wallet",
      limit:10,
        staged:true
    } }
  ).execute();
};

export const createOrderFromProductSKU = (event) => {
  return apiRoot
    .carts()
    .post({
      body: {
        currency: "EUR",
        country: "DE",
        shippingAddress: { country: "DE" },
      },
    })
    .execute()
    .then((cart) => {
      return apiRoot
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
      const matchingShippingMethod = await apiRoot
        .shippingMethods()
        .matchingCart()
        .get({
          queryArgs: {
            cartId: cart.body.id,
          },
        })
        .execute()
        .then((response) => response.body.results[0]);
      return apiRoot
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
      return apiRoot
        .orders()
        .post({
          body: {
            version: cart.body.version,
            cart: {
              id: cart.body.id,
              typeId: "cart",
            },
          },
        })
        .execute();
    });
};
