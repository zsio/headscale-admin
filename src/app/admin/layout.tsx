import React from "react";

import Header from '@/components/header';
import {CubeIcon, GearIcon, PersonIcon, RocketIcon, Link1Icon } from "@radix-ui/react-icons";

export default function AdminLayout({children}: {
  children: React.ReactNode
}) {

  const navs = [
    {
      url: "/admin/machines",
      title: "机 器",
      icon: CubeIcon
    },
    {
      url: "/admin/users",
      title: "用 户",
      icon: PersonIcon
    },
    {
      url: "/admin/setting",
      title: "设 置",
      icon: GearIcon
    }
  ]

  return (
    <>
      <section className="pt-4 mb-6 border-b bg-secondary">
        <Header navs={navs}/>
      </section>
      <main className="container">
        {children}
      </main>
    </>
  )
}
