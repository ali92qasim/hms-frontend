import useSWR from 'swr';
import {fetcher} from '../utils/axios';
import {useMemo} from 'react';

export function useGet(url, options) {
    const {data, error, isValidating} = useSWR(url, fetcher, options);
    return useMemo(() => ({data, error, isValidating}), [data, error, isValidating]);
}

export function usePost(url, options) {
    const {data, error, isValidating} = useSWR(url, fetcher, options);
    return useMemo(() => ({data, error, isValidating}), [data, error, isValidating]);
}
export function usePut(url, options) {
    const {data, error, isValidating} = useSWR(url, fetcher, options);
    return useMemo(() => ({data, error, isValidating}), [data, error, isValidating]);
}
export function useDelete(url, options) {
    const {data, error, isValidating} = useSWR(url, fetcher, options);
    return useMemo(() => ({data, error, isValidating}), [data, error, isValidating]);
}