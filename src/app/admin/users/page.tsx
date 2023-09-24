'use client'

import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table"
import {useHsUsers} from "@/lib/hs-hooks";
import TimeAgo from "@/components/timeago";
import Copy from "@/components/copy";
import {Button} from "@/components/ui/button";
import {TrashIcon} from "@radix-ui/react-icons";
import {Separator} from "@/components/ui/separator";
import UsernameEdit from "./username-edit";


export default function Page() {

  const {data, error, isLoading, mutate} = useHsUsers()

  const handleRefresh = () => {
    mutate()
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow className='hover:bg-white'>
            <TableHead>ID</TableHead>
            <TableHead>名称</TableHead>
            <TableHead>加入时间</TableHead>
            <TableHead className="w-20"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((user) => (
            <TableRow key={user.id}>
              <TableCell><Copy text={user.id}>{user.id}</Copy></TableCell>
              <TableCell>
                <Copy text={user.name}>{user.name}</Copy>
              </TableCell>
              <TableCell>
                <TimeAgo time={user.createdAt}/>
              </TableCell>
              <TableCell className="flex items-center justify-end gap-x-1">
                <UsernameEdit oldName={user.name} onClose={() => handleRefresh()}/>
                <Separator orientation="vertical"/>
                <Button variant="ghost" size="icon">
                  <TrashIcon className="h-4 w-4"/>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}
