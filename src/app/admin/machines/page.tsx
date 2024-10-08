'use client'

import {useHsMachines} from "@/lib/hs-hooks";
import toast from "react-hot-toast";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import Copy from "@/components/copy";
import TimeAgo from "@/components/timeago";
import {Button} from "@/components/ui/button";
import {DotFilledIcon, InputIcon, PlusCircledIcon, TrashIcon} from "@radix-ui/react-icons";
import React, {useCallback, useMemo, useState} from "react";
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
  const {data, isLoading, mutate} = useHsMachines()
  const handleRefresh = useCallback(() => {
    mutate().then()
  }, [mutate])

  const handleDelete = useCallback((id: string) => {
    hsDeleteMachineById(id).then(() => {
      toast.success("删除成功");
    }).catch((err) => {
      toast.error("删除失败");
    }).finally(handleRefresh)
  }, [])

  let list = useMemo(() => {
    return data?.filter?.(row => {
      if (row.name.includes(search)) return true;
      if (row.user.name.includes(search)) return true;
      if (row.givenName.includes(search)) return true;
      return row.ipAddresses.join(' ').includes(search);
    }) || []
  }, [data, search])

  return (
    <>
      <div className="my-3">
        <h1 className="text-2xl font-bold">Machines</h1>
        <p className="text-muted-foreground">Manage the devices connected to your tail net.</p>
      </div>
      <div className="flex items-center justify-between py-4">
        <div>
          <Input
            placeholder="Name / User / IP"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value)
            }}
            className="max-w-sm w-96"
          />
        </div>
        <div>
          <Link href={"/admin/machines/register"}>
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
                              <div className="inline-block underline decoration-dotted">
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
                  <TimeAgo time={machine.lastSeen} text={machine.online ? "Online" : undefined}/>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center h-5 space-x-2 text-sm">
                  <ChangeName renameAPI={hsMachineRename} id={machine.id} oldName={machine.givenName}
                              onClose={() => handleRefresh()}>
                    <Button variant="ghost" size="icon">
                      <InputIcon className="w-4 h-4"/>
                    </Button>
                  </ChangeName>
                  <Separator orientation="vertical"/>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <TrashIcon className="w-4 h-4"/>
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle className="text-red-500">Are you sure you want to delete this device?</AlertDialogTitle>
                        <AlertDialogDescription/>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete(machine.id)}>Confirm</AlertDialogAction>
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
