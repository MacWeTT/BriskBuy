import { useState, useEffect } from "react";
import axios, { Canceler } from "axios";
import { Order } from "@/common/types/orders";

export default function useGetOrders() {
  const [orders, setOrders] = useState([] as Order[]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const apiURL = process.env.NEXT_PUBLIC_API_URL;
    setLoading(true);
    setError(false);
    let cancel: Canceler;
    axios({
      method: "GET",
      url: `${apiURL}/orders/`,
      cancelToken: new axios.CancelToken((c) => {
        cancel = c;
      }),
    })
      .then((res) => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (axios.isCancel(err)) return;
        setError(true);
      });
    return () => cancel();
  }, []);

  return { loading, error, orders };
}
