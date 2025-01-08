import { useQuery, useMutation, queryClient } from "react-query";

export function useCustomQuery(queryKey, queryFn) {
  return useQuery(queryKey, queryFn);
}

export function getQueryData(queryClient, queryKey) {
  return queryClient.getQueryData(queryKey);
}

export function setQueryData(queryClient, queryKey, data) {
  queryClient.setQueryData(queryKey, data);
}

export function removeQueryData(queryKey) {
  queryClient.removeQueryData(queryKey);
}

export function useCustomMutation(mutationKey, mutationFn) {
  return useMutation(mutationKey, mutationFn);
}
