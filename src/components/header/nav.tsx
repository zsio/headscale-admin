'use client'

import Link from "next/link";
import {usePathname} from 'next/navigation'
import {cn} from "@/lib/utils";
import React from "react";


export default function Nav({url, children}: {
  url: string
  children: React.ReactNode
}) {

  const path = usePathname()

  return (
    <Link href={url}>
      <div className={cn([
        `relative px-3 py-1.5 mb-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-zinc-800`,
        url === path && 'text-blue-600'
      ])}>
        {children}
        <div className="absolute w-full px-3 h-0.5 left-0 -bottom-1.5 z-10">
          <div className={cn(`h-full bg-blue-600 rounded mx-auto`, !path.startsWith(url) && 'hidden')}/>
        </div>
      </div>
    </Link>
  );
}
