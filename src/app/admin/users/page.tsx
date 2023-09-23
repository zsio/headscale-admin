'use client'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {useHsUsers} from "@/lib/hs-hooks";
import {HsUser} from "@/lib/hs";
import TimeAgo from "@/components/timeago";

export default function Page() {

  const {data, error, isLoading} = useHsUsers()

  const users: HsUser[] = data
  
  return (
    <>
      <Table>
        
        <TableHeader>
          <TableRow className='hover:bg-white'>
            <TableHead>ID</TableHead>
            <TableHead>名称</TableHead>
            <TableHead className="text-right">创建时间</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell className="text-right">
                <TimeAgo time={user.createdAt} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}
