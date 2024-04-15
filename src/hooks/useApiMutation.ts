import {
  MutationFunction,
  QueryKey,
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query'

/**
 * For API Mutation with feature: auto invalidate
 */
export function useApiMutation<
  TData = unknown,
  TError = unknown,
  TVariables = void,
  TContext = unknown,
>({
  queryKey,
  mutationFn,
  options,
}: {
  queryKey: QueryKey
  mutationFn: MutationFunction<TData, TVariables>
  options?: UseMutationOptions<TData, TError, TVariables, TContext>
}): UseMutationResult<TData, TError, TVariables, TContext> {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn,
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
    ...options,
  })
}

/**
 * For API Mutation with feature: auto invalidate and auto generated url from query key
 */
export function useApiMutation2<
  TData = unknown,
  TError = unknown,
  TVariables = void,
  TContext = unknown,
>({
  queryKey,
  mutationFun,
  options,
}: {
  queryKey: QueryKey
  mutationFun: (url: string, input: TVariables) => Promise<TData>
  options?: UseMutationOptions<TData, TError, TVariables, TContext>
}): UseMutationResult<TData, TError, TVariables, TContext> {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (input: TVariables) => {
      const url = `${queryKey.join('/')}`
      return mutationFun(url, input)
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
    ...options,
  })
}

export default useApiMutation
