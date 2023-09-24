import useSWR from "swr";
import {HsMachine, HsUser} from "@/lib/hs";


const HS_BASE_URL = "/api/headscale/v1";


const fetcher = async <T>(url: RequestInfo | URL) => {
  const res = await fetch(url, {})
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`)
  }
  return await res.json() as T;
}

export function useHsUsers() {
  const {data, error, isLoading, mutate} = useSWR(`${HS_BASE_URL}/user`, fetcher<{users: HsUser[]}>)
  return {data: data?.users || [], error, isLoading, mutate}
}

export function useHsMachines(id = "") {
  const {data, error, isLoading, mutate} = useSWR(`${HS_BASE_URL}/machine?user=${id}`, fetcher<{machines: HsMachine[]}>)
  return {data: data?.machines || [], error, isLoading, mutate}
}