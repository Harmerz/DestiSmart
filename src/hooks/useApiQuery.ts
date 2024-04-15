import { QueryKey, useQuery, UseQueryOptions } from '@tanstack/react-query'

/**
 * For API query with feature: auto generated url
 */
export function useApiQuery<
  TQueryKey extends QueryKey,
  TQueryFnData,
  TError,
  TData = TQueryFnData,
>({
  queryKey,
  fetcher,
  options,
}: {
  queryKey: TQueryKey
  fetcher: (url: string) => Promise<TQueryFnData>
  options?: Omit<UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, 'queryKey' | 'queryFn'>
}) {
  return useQuery({
    queryKey,
    queryFn: ({ queryKey: key }) => {
      const url = `/${key.join('/')}`
      return fetcher(url)
    },
    ...options,
  })
}

/**
 * For API query with feature: auto generated url and dependency key
 */
export function useApiQuery2<
  TQueryKey extends QueryKey,
  TQueryKeyDepend extends QueryKey,
  TQueryFnData,
  TError,
  TData = TQueryFnData,
>({
  queryKeyPath,
  dependencies,
  fetcher,
  options,
}: {
  queryKeyPath: TQueryKey
  dependencies?: TQueryKeyDepend
  fetcher: (url: string) => Promise<TQueryFnData>
  options?: Omit<
    UseQueryOptions<
      TQueryFnData,
      TError,
      TData,
      readonly [...TQueryKey, ...TQueryKeyDepend] | readonly [...TQueryKey, ...never[]]
    >,
    'queryKey' | 'queryFn'
  >
}) {
  const url = `/${queryKeyPath.join('/')}`
  const queryKey = [...queryKeyPath, ...(dependencies ?? [])] as const

  return useQuery({
    queryKey,
    queryFn: () => fetcher(url),
    ...options,
  })
}

export default useApiQuery
