// 'use client'
// import useSWR from "swr";
// import { fetcher } from '@/lib/request';
import { hsGetMachine } from "@/lib/hs-api";
import DataTable from '@/components/data-table/machines';


export default async function Page() {

  // const {data, error, isLoading} = useSWR('/api/v1/machine', fetcher)
  
  const data = await hsGetMachine()
  console.log(data);

  return (
    <>
      <DataTable list={data.machines} />
    </>
  )
}
