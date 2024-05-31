import { useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";

export const GET_CART_DISCOUNT_LIST = gql`
  query CartDiscounts {
    cartDiscounts {
      total
      results {
        validFrom
        validUntil
        isActive
        key
        name(locale: "en")
        id
        stores {
          key
        }
        target {
          type
        }
      }
    }
  }
`;

export const GetCartDiscountListByGQL = () => {
  const { error, loading, data } = useQuery(GET_CART_DISCOUNT_LIST);
  const [result, setResult] = useState([]);

  useEffect(() => {
    if (data) {
      setResult(data.cartDiscounts.results);
    }
  }, [data]);
  return { result, error, loading };
};
