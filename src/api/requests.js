import useSWR, {mutate} from 'swr';
import {fetcher, postFetcher, putFetcher, deleteFetcher} from '../utils/axios';
import {useMemo} from 'react';

export function useGet(url, options) {
    const {data, error, isValidating} = useSWR(url, fetcher, options);
    return useMemo(() => ({data, error, isValidating}), [data, error, isValidating]);
}

export function usePost(url) {
  const post = async (payload, config = {}) => {
    try {
      const result = await postFetcher(url, payload, config);
      await mutate(url);
      return result;
    } catch (err) {
      throw err;
    }
  };

  return { post };
}
export function usePut(url) {
  const put = async (payload, config = {}) => {
    try {
      const result = await putFetcher(url, payload, config); 
      await mutate(url); 
      return result;
    } catch (err) {
      throw err;
    }
  };

  return { put };
}

export async function useDelete(key, url) {
  const result = await deleteFetcher(url);  
  mutate(key, 
    (data) => {
      const updatedData = data.data.filter(item => item.id !== result.id)
      return updatedData
    }
  ); 
  return result; 
}