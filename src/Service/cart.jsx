import apiRoot from "./client";

export const getCartDiscountList = () => {
  return apiRoot.cartDiscounts().get().execute();
};

export const getCartDiscountByKey = (event) => {
  return apiRoot.cartDiscounts().withKey({ key: event.input }).get().execute();
};

export const deleteCartDiscountById = ({ id, version }) => {
  return apiRoot
    .cartDiscounts()
    .withId({ ID: id })
    .delete({ queryArgs: { version: version } })
    .execute();
};
