import apiRoot from "./client";

export const viewAllCartDiscount = () => {
  return apiRoot.cartDiscounts().get().execute();
};
