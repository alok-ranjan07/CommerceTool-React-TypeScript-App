import apiRoot from "./client";

export const getCartDiscountList = () => {
  return apiRoot.cartDiscounts().get().execute();
};

export const getCartDiscountByKey = (event) => {
  return apiRoot.cartDiscounts().withKey({ key: event.input }).get().execute();
};

export const getCartDiscountByID = (event) => {
  return apiRoot.cartDiscounts().withId({ ID: event.id }).get().execute();
};

export const deleteCartDiscountById = ({ id, version }) => {
  return apiRoot
    .cartDiscounts()
    .withId({ ID: id })
    .delete({ queryArgs: { version: version } })
    .execute();
};

export const addCartDiscount = (event) => {
  return apiRoot
    .cartDiscounts()
    .post({
      body: {
        name: {
          en: event.promoName,
        },
        key: event.promoKey,
        value: event.value,
        cartPredicate: "1=1",
        target: event.target,
        sortOrder: event.sortOrder,
        stores: [
          {
            key: event.storeKey,
          },
        ],
        isActive: event.active,
        validFrom: event.validFrom,
        validUntil: event.validUntil,
        requiresDiscountCode: event.discountCodeRequirement,
      },
    })
    .execute();
};

export const getDiscountCode = () => {
  return apiRoot.discountCodes().get().execute();
};
apiRoot.cartDiscounts().withId().post();
