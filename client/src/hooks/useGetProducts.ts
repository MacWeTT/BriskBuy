import { useState, useEffect } from "react";
import axios, { Canceler } from "axios";
import { Product } from "@/common/types/product";

export default function useGetProducts(page: number) {
  const [products, setProducts] = useState([] as Product[]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    const apiURL = process.env.NEXT_PUBLIC_API_URL;
    setLoading(true);
    setError(false);
    let cancel: Canceler;
    axios({
      method: "GET",
      url: `${apiURL}/products/`,
      params: { page: page },
      cancelToken: new axios.CancelToken((c) => {
        cancel = c;
      }),
    })
      .then((res) => {
        setProducts((results) => {
          return [...new Set([...results, ...res.data.results])];
        });
        setHasMore(res.data.next !== null);
        setLoading(false);
      })
      .catch((err) => {
        if (axios.isCancel(err)) return;
        setError(true);
      });
    return () => cancel();
  }, [page]);

  return { loading, error, products, hasMore };
}
