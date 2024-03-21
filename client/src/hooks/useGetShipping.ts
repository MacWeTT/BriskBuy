import { useState, useEffect } from "react";
import axios, { Canceler } from "axios";
import { ShippingAddress } from "@/common/types/user";

export default function useGetShipping(pk: number) {
  const [shipping, setShipping] = useState([] as ShippingAddress[]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const apiURL = process.env.NEXT_PUBLIC_API_URL;
    setLoading(true);
    let cancel: Canceler;
    axios({
      method: "GET",
      url: `${apiURL}/shipping/${pk}`,
      params: { id: pk },
      cancelToken: new axios.CancelToken((c) => {
        cancel = c;
      }),
    })
      .then((res) => {
        setShipping(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (axios.isCancel(err)) return;
        setError(true);
      });
    return () => cancel();
  }, [pk]);

  return { shipping, loading, error };
}
