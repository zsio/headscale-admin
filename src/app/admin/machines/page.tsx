'use client'

import { useHsMachines } from "@/lib/hs-hooks";
import {useToast} from "@/components/ui/use-toast";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import Copy from "@/components/copy";
import TimeAgo from "@/components/timeago";
import {Button} from "@/components/ui/button";
import {DotFilledIcon, DotsHorizontalIcon, InputIcon, PlusCircledIcon, TrashIcon} from "@radix-ui/react-icons";
import React, {useEffect, useState} from "react";
import {cn} from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Input} from "@/components/ui/input";
import {HsMachine} from "@/lib/hs";

export default function Page() {
  const [search, setSearch] = useState("")
  const {data, error, isLoading, mutate} = useHsMachines()
  const {toast} = useToast()
  const handleRefresh = () => {
    mutate().then()
  };

  let list = data?.filter?.(row=>{
    if (row.name.includes(search)) return true;
    if (row.user.name.includes(search)) return true;
    if (row.givenName.includes(search)) return true;
    return row.ipAddresses.join(' ').includes(search);
  }) || []
  
  return (
    <>
      <div className="flex items-center justify-between py-4">
        <div>
          <Input
            placeholder="名称 / 用户 / IP"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value)
            }}
            className="max-w-sm"
          />
        </div>
        <div>
          <Button variant="outline" className="flex items-center gap-1">
            <PlusCircledIcon className="w-4 h-4" />
            <span>添加</span>
          </Button>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow className='hover:bg-white'>
            <TableHead>名称</TableHead>
            <TableHead>名称</TableHead>
            <TableHead>最后在线</TableHead>
            <TableHead className="w-20"/>
          </TableRow>
        </TableHeader>
        <TableBody>
          {list.map((machine) => (
            <TableRow key={machine.id}>
              <TableCell>
                <div className="">
                  <div className={`text-primary font-bold`}><Copy text={machine.name}>{machine.name}</Copy></div>
                  <div className={`text-muted-foreground text-xs`}>
                    <span>{machine.user.name}</span>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className={`text-muted-foreground flex flex-col gap-y-0.5`}>
                  {
                    machine.ipAddresses?.sort()?.map((ip) => (
                      <div key={ip} className={`flex items-center gap-x-1`}>
                        <Copy text={ip} className=""><span className="underline decoration-dotted">{ip}</span></Copy>
                      </div>
                    ))
                  }
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center">
                  <DotFilledIcon className={cn("w-6 h-6 text-gray-400", machine.online && "text-green-600")}/>
                  <TimeAgo time={machine.lastSeen} text={machine.online ? "在线" : undefined}/>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center justify-end">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="w-8 h-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <DotsHorizontalIcon className="w-4 h-4"/>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {/*<DropdownMenuLabel>Actions</DropdownMenuLabel>*/}
                      <DropdownMenuItem>
                        选项
                      </DropdownMenuItem>
                      <DropdownMenuSeparator/>
                      <DropdownMenuItem>
                        选项
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        选项
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}
