
import { hsGetMachine } from "@/lib/hs-api";
import DataTable from '@/components/data-table/machines';


export default async function Page() {
  
  const data = await hsGetMachine()
  console.log(data);

  return (
    <>
      <DataTable list={data.machines} />
    </>
  )
}
