import React from "react";

import Header from '@/components/header';
import Nav from '@/components/header/nav';

export default function AdminLayout({children}: {
  children: React.ReactNode
}) {
  return (
    <>
      <section className="border-b pt-4 mb-6 bg-secondary">
        <Header />
        <Nav />
      </section>
      <main>
        {children}
      </main>
    </>
  )
}
