import useSWR from "swr"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export const useAnalytics = () => {
  const { data, error } = useSWR(
    "https://api.vercel.com/v1/projects/flameslinks/analytics",
    fetcher
  )

  return {
    analytics: data?.analytics,
    isLoading: !data && !error,
    isError: error,
  }
}
