'use client'
import Link from "next/link";
import { usePathname } from 'next/navigation'
import {cn} from "@/lib/utils";
import { CubeIcon,PersonIcon, LockOpen1Icon, GearIcon  } from '@radix-ui/react-icons'
import { Button } from "@/components/ui/button"

const routes = [
  {
    url: "/admin/machines",
    title: "Machines",
    icon: CubeIcon
  },
  {
    url: "/admin/users",
    title: "用 户",
    icon: PersonIcon
  },
  {
    url: "/admin/apikey",
    title: "密 钥",
    icon: LockOpen1Icon
  },
  {
    url: "/admin/setting",
    title: "设 置",
    icon: GearIcon
  }
]

export default function Nav() {

  const path = usePathname()
  console.log(path)

  return (
    <nav className="container flex gap-x-1">
      {
        routes.map(item => (
          <Link href={item.url} key={item.url}>
            <div className={cn([
              `relative  px-3 py-1.5 mb-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-zinc-800`,
              item.url === path && 'text-blue-600'
            ])}>
              <div className="flex items-center gap-x-2">
                <item.icon className={`w-5 h-5`} />
                <span>{item.title}</span>
              </div>
              <div className="absolute w-full px-3 h-0.5 left-0 -bottom-1.5 z-10">
                <div className={cn(`h-full bg-blue-600 rounded mx-auto`, item.url !== path && 'hidden')} />
              </div>
            </div>
          </Link>
        ))
      }
    </nav>
  );
}
