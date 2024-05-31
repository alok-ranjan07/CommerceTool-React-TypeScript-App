const fetch = require("node-fetch");

(async function m() {
  const query = `mutation CreateOrderFromCart($cartId: String, $cartVersion: Long!,$orderNumber:String) {
    createOrderFromCart(
        draft: { cart: { id: $cartId }, version: $cartVersion, orderNumber: $orderNumber }
    ) {
        customerId
        customerEmail
        orderNumber
        orderState
        id
        version
        customer {
            email
            firstName
            id
            version
            createdAt
            lastModifiedAt
        }
    }
}

    `;
  const variables = {
    cartId: "4291ca38-a05e-4760-b204-307fd6191222",
    cartVersion: 12,
    orderNumber: "123453",
  };
  const data = await fetch(
    "https://api.us-central1.gcp.commercetools.com/ct_chatbot/graphql",
    {
      headers: { Authorization: "Bearer 2Og_eIdhaxpDNVdHjF1kITM_7C19A5tp" },
      method: "POST",
      body: JSON.stringify({ query: query, variables: variables }),
    }
  );

  console.log(JSON.stringify({ query: query, variables: variables }));
})();
