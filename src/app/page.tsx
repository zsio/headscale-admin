import Image from 'next/image'
import {permanentRedirect} from "next/navigation";


export default function Home() {
  permanentRedirect("/admin/machines")
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      123123
    </main>
  )
}
