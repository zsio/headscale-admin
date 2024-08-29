'use client'

import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {cn} from "@/lib/utils";
import {DotFilledIcon} from "@radix-ui/react-icons";
import React from "react";
import {useHsMachines} from "@/lib/hs-hooks";

interface Props {
  params: {
    id: string
  }
}

export default function Page(props: Props) {

  const allMachine = useHsMachines()
  const machine = allMachine.data.find(m => m.id === props.params.id)
  
  
  // 当前机器：{JSON.stringify(props.params)}

  return (
    <>
      
      <div className="flex justify-between items-center mt-8 ">
        <div className="flex items-center font-bold text-2xl">
          <span>{machine?.givenName}</span>
          <DotFilledIcon className={cn("w-6 h-6 text-gray-400", machine?.online && "text-green-600")}/>
        </div>
        <div>
          <button className="btn">Edit</button>
        </div>
      </div>
      <Separator className="my-6"/>
      <div className="flex h-5 items-center space-x-4 text-sm">
        <div className="space-y-1.5">
          <p className="text-gray-400">Managed by</p>
          <p>{machine?.user.name}</p>
        </div>
        <Separator orientation="vertical" className="h-12"/>
        <div className="space-y-1">
          <p>123</p>
          <p>123</p>
        </div>
      </div>
    </>
  )
}