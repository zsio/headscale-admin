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

interface Props {
  params: {
    id: string
  }
}

export default function Page(props: Props) {

  console.log(props)
  
  // 当前机器：{JSON.stringify(props.params)}

  return (
    <>

      <Breadcrumb className="">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/admin/machines">Machines</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>host</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex justify-between">
        <div className="flex items-center">
          <span>机器</span>
          <DotFilledIcon className={cn("w-6 h-6 text-gray-400", true && "text-green-600")}/>
        </div>
        <div>123</div>
      </div>
      <Separator className="my-4"/>
      <div className="flex h-5 items-center space-x-4 text-sm">
        <div>Blog</div>
        <Separator orientation="vertical"/>
        <div>Docs</div>
        <Separator orientation="vertical"/>
        <div>Source</div>
      </div>
    </>
  )
}