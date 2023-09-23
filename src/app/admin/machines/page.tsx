'use client'

import DataTable from '@/components/data-table/machines';
import { useHsMachines } from "@/lib/hs-hooks";

export default function Page() {
  
  const {data, error, isLoading} = useHsMachines()
  
  return (
    <>
      <DataTable list={data} />
    </>
  )
}
