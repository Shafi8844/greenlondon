import Image from "next/image"
import Link from "next/link"
import Logo from '../../../public/logo.png'

const Navbar = () => {
    const links = [
        {name:"Discover", href:"/discover"},
        {name:"Our Misson", href:"/OurMission"},
        {name:"Environment Impact", href:"/environmentImpact"}
    ]
  return (
    <div className="flex items-center justify-between mt-3 max-w-6xl container-custom ">
        <div>
            <Link href={`/`}>
        <div className="flex  flex-2 gap-x-1.5">
            <Image src={Logo} alt="logo" width={25}></Image>
            <p className="font-bold">Green London</p>
        </div>
        </Link>
        </div>
        <div className="flex justify-between gap-x-4 ">
            {
                links.map((link,indx)=> <Link key={indx} href={link.href}><button
                className="text-sm cursor-pointer font-bold hover:bg-[#e5f9ea] py-2 px-4 rounded-4xl"
                >{link.name}</button></Link>)
            }
        </div>
        <div className="flex text-sm items-center gap-x-2">
            <Link href={"/sign-In"}><button className="cursor-pointer text-sm font-bold hover:bg-[#e5f9ea] py-2 px-4 border-0.5 rounded-4xl">Login</button></Link>
            <Link href={'/sign-up'}><button className="cursor-pointer text-sm font-bold bg-[#1B945E] py-3 px-5 rounded-4xl">Join the Community</button></Link>
        </div>
    </div>
  )
}

export default Navbar