import useSWR, {mutate} from 'swr';
import {fetcher, postFetcher} from '../utils/axios';
import {useMemo} from 'react';

export function useGet(url, options) {
    const {data, error, isValidating} = useSWR(url, fetcher, options);
    return useMemo(() => ({data, error, isValidating}), [data, error, isValidating]);
}

export function usePost(url) {
  const post = async (payload, config = {}) => {
    try {
      const result = await postFetcher(url, payload, config);
      await mutate(url); // revalidate the GET request
      return result;
    } catch (err) {
      throw err;
    }
  };

  return { post };
}
export function usePut(url, options) {
    const {data, error, isValidating} = useSWR(url, fetcher, options);
    return useMemo(() => ({data, error, isValidating}), [data, error, isValidating]);
}
export function useDelete(url, options) {
    const {data, error, isValidating} = useSWR(url, fetcher, options);
    return useMemo(() => ({data, error, isValidating}), [data, error, isValidating]);
}