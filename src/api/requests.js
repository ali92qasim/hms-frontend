import useSWR, {mutate} from 'swr';
import {fetcher, postFetcher} from '../utils/axios';
import {useMemo} from 'react';

export function useGet(url, options) {
    const {data, error, isValidating} = useSWR(url, fetcher, options);
    return useMemo(() => ({data, error, isValidating}), [data, error, isValidating]);
}

export function usePost(url, options) {
    const { data, error, isValidating } = useSWR(url, fetcher, options);
  
    const post = async (payload, config = {}) => {
      try {
        mutate(
          url,
          async () => {
            const result = await postFetcher(url, payload, config);
            return result;
          },
          false
        );
        await mutate(url);
      } catch (err) {
        throw err;
      }
    };
  
    return useMemo(() => ({ data, error, isValidating, post }), [data, error, isValidating]);
  }
export function usePut(url, options) {
    const {data, error, isValidating} = useSWR(url, fetcher, options);
    return useMemo(() => ({data, error, isValidating}), [data, error, isValidating]);
}
export function useDelete(url, options) {
    const {data, error, isValidating} = useSWR(url, fetcher, options);
    return useMemo(() => ({data, error, isValidating}), [data, error, isValidating]);
}