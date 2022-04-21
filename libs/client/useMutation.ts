import { MethodsType } from "@libs/server/types";
import { useState } from "react";

export type FetchType = (body: any, cb?: Function) => void;
type PayloadType<T> = { isLoading: boolean; data: T | null };
type UseMutationArgsType = {
  method?: MethodsType;
  url: string;
};

const useMutation = <T>(
  args: UseMutationArgsType
): [FetchType, PayloadType<T>] => {
  const { method = "POST", url } = args;

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<T | null>(null);

  const postFetch: FetchType = (body, cb) => {
    setIsLoading(true);
    fetch(url, {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        cb && cb(data);
      })
      .catch(() => {})
      .finally(() => setIsLoading(false));
  };

  return [postFetch, { isLoading, data }];
};

export default useMutation;
