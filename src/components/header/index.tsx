import {GitHubLogoIcon} from '@radix-ui/react-icons'

export default function Header() {
  return (
    <header className='container flex justify-between mx-auto mb-4 md:mb-6'>
      <div className={`text-primary font-bold text-xl px-3`}>headscale admin</div>
      <div className={`flex items-center gap-x-5 text-muted-foreground `}>
        <div className={`cursor-pointer`}>Github</div>
        <GitHubLogoIcon className={`cursor-pointer w-7 h-7`}/>
      </div>
    </header>
  )
}
