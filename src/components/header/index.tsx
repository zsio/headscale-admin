import { GitHubLogoIcon } from '@radix-ui/react-icons'
import Nav from "@/components/header/nav";

type NavP = {
  url: string
  title: string
  icon?: React.ElementType
}

export default function Header({navs}: { navs: NavP[] }) {
  return (
    <>
      <header className='container flex justify-between mx-auto mb-4 md:mb-6'>
        <div className={`text-primary font-bold text-xl px-3`}>headscale admin</div>
        <div className={`flex items-center gap-x-5 text-muted-foreground `}>
          <div className={`cursor-pointer`}>Github</div>
          <GitHubLogoIcon className={`cursor-pointer w-7 h-7`}/>
        </div>
      </header>
      <nav className="container flex gap-x-1">
        {
          navs?.map(item => (
            <Nav url={item.url} key={item.url}>
              <div className="flex items-center gap-x-2">
                {
                  item.icon && (
                    <item.icon className={`w-5 h-5`}/>
                  )
                }
                <span>{item.title}</span>
              </div>
            </Nav>
          ))
        }
      </nav>
    </>
  )
}
