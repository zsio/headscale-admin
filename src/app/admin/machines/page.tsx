'use client'

import {useHsMachines} from "@/lib/hs-hooks";
import {useToast} from "@/components/ui/use-toast";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import Copy from "@/components/copy";
import TimeAgo from "@/components/timeago";
import {Button} from "@/components/ui/button";
import {DotFilledIcon, DotsHorizontalIcon, InputIcon, PlusCircledIcon, TrashIcon} from "@radix-ui/react-icons";
import React, {useEffect, useState} from "react";
import {cn} from "@/lib/utils";
import {Input} from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import ChangeName from "@/components/change-name/change-name";
import {Separator} from "@/components/ui/separator";
import {hsMachineRename, hsDeleteMachineById} from "@/lib/hs-api";
import Link from "next/link";

export default function Page() {
  const [search, setSearch] = useState("")
  const {data, error, isLoading, mutate} = useHsMachines()
  const {toast} = useToast()
  const handleRefresh = () => {
    mutate().then()
  };

  const handleDelete = (id: string) => {
    hsDeleteMachineById(id).then(() => {
      toast({
        duration: 500,
        description: "删除成功",
      })
    }).catch((err) => {
      toast({
        duration: 3000,
        title: "删除失败",
        description: err
      })
    }).finally(handleRefresh)
  }

  let list = data?.filter?.(row => {
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
          <Link href="/admin/machines/register">
            <Button variant="outline" className="flex items-center gap-1">
              <PlusCircledIcon className="w-4 h-4"/>
              <span>添加</span>
            </Button>
          </Link>
          
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow className='hover:bg-white'>
            <TableHead>名称</TableHead>
            <TableHead>地址</TableHead>
            <TableHead>状态</TableHead>
            <TableHead className="w-20"/>
          </TableRow>
        </TableHeader>
        <TableBody>
          {list.map((machine) => (
            <TableRow key={machine.id}>
              <TableCell>
                <div className="py-1.5">
                  <div className={`text-primary font-bold`}>
                    <Copy text={machine.givenName}>
                      <Link href={`/admin/machines/${machine.id}`}>
                        <span className="hover:underline ">{machine.givenName}</span>
                      </Link>
                    </Copy>
                  </div>
                  <div className={`text-muted-foreground text-xs`}>
                    <span>{machine.user.name}</span>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                {
                  (
                    () => {
                      const ips = machine.ipAddresses?.sort?.() ?? []
                      return (
                        <>
                          <HoverCard openDelay={300} closeDelay={100}>
                            <HoverCardTrigger asChild>
                              <div className="underline decoration-dotted inline-block">
                                <Copy text={ips?.[0]} className=""><span
                                  className="underline decoration-dotted">{ips?.[0]}</span></Copy>
                              </div>
                            </HoverCardTrigger>
                            <HoverCardContent>
                              <div className={`text-muted-foreground flex flex-col gap-y-0.5`}>
                                <div className={`flex items-center gap-x-1`}>
                                  <Copy text={machine.givenName} className="">
                                    <span className="underline decoration-dotted">{machine.givenName}</span>
                                  </Copy>
                                </div>
                                {
                                  ips?.map((ip) => (
                                    <div key={ip} className={`flex items-center gap-x-1`}>
                                      <Copy text={ip} className=""><span
                                        className="underline decoration-dotted">{ip}</span></Copy>
                                    </div>
                                  ))
                                }
                              </div>
                            </HoverCardContent>
                          </HoverCard>
                        </>
                      )
                    }
                  )()
                }

              </TableCell>
              <TableCell>
                <div className="flex items-center">
                  <DotFilledIcon className={cn("w-6 h-6 text-gray-400", machine.online && "text-green-600")}/>
                  <TimeAgo time={machine.lastSeen} text={machine.online ? "在线" : undefined}/>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex h-5 items-center space-x-2 text-sm">
                  <ChangeName renameAPI={hsMachineRename} id={machine.id} oldName={machine.givenName}
                              onClose={() => handleRefresh()}>
                    <Button variant="ghost" size="icon">
                      <InputIcon className="h-4 w-4"/>
                    </Button>
                  </ChangeName>
                  <Separator orientation="vertical"/>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <TrashIcon className="h-4 w-4"/>
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>确定要删除此设备吗？</AlertDialogTitle>
                        <AlertDialogDescription/>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>取 消</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete(machine.id)}>确 定</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>


              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}
