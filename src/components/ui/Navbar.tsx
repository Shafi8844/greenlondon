'use client'
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import Logo from '../../../public/logo.png'
import { authClient } from "@/lib/auth-client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Upcoming Events", href: "/upcoming-events" },
  { name: "Create Event", href: "/create-event" },
  { name: "Joined Events", href: "/joined-events" },
  { name: "Manage Events", href: "/manage-events" },
]

const Navbar = () => {
    const links = NAV_LINKS
    const [menuOpen, setMenuOpen] = useState(false)
    const router = useRouter()

    const {data:session}=authClient.useSession()
    const user=session?.user;

    const handleSignOutButton =()=>{
        authClient.signOut();
        router.replace('/')
    }

  return (
    <div className="container-custom mt-3">
        <div className="flex items-center justify-between">
            <Link href={`/`}>
                <div className="flex items-center gap-x-1.5">
                    <Image src={Logo} alt="logo" width={25}></Image>
                    <p className="text-lg font-bold text-[#14231B]">Green London</p>
                </div>
            </Link>

            {/* Desktop links */}
            <nav className="hidden items-center justify-between gap-x-1 lg:flex">
                {
                    links.map((link,indx)=> (
                        <Link key={indx} href={link.href}>
                            <button
                                className="cursor-pointer rounded-4xl px-4 py-2 text-sm font-bold hover:bg-[#e5f9ea]"
                            >{link.name}</button>
                        </Link>
                    ))
                }
            </nav>

            <div className="flex items-center gap-x-2">
                {
                    user ? (
                        <div className="hidden lg:block">
                            <Popover>
                                <PopoverTrigger render={
                                    <Avatar>
                                        <AvatarImage referrerPolicy="no-referrer" src={user?.image as string} />
                                            <AvatarFallback>{user?.name?.charAt(0) ?? "?"}</AvatarFallback>
                                    </Avatar>
                                }> Menu
                                </PopoverTrigger>
                                <PopoverContent>
                                    <PopoverHeader>
                                        <p className="text-sm font-semibold text-[#14231B]">{user?.name}</p>
                                        <p className="text-xs text-gray-500">{user?.email}</p>
                                    </PopoverHeader>
                                    <div className="flex flex-col gap-1 py-2">
                                        <Link href="/joined-events" className="rounded-lg px-2 py-1.5 text-sm font-medium hover:bg-[#e5f9ea]">Joined Events</Link>
                                        <Link href="/manage-events" className="rounded-lg px-2 py-1.5 text-sm font-medium hover:bg-[#e5f9ea]">Manage Events</Link>
                                        <Button onClick={handleSignOutButton} variant="destructive" className="mt-1">Sign out</Button>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        </div>
                    ) : (
                        <div className="hidden items-center gap-x-2 lg:flex">
                            <Link href={"/sign-In"}><button className="cursor-pointer text-sm font-bold hover:bg-[#e5f9ea] py-2 px-4 border-0.5 rounded-4xl">Login</button></Link>
                            <Link href={'/sign-up'}><button className="cursor-pointer text-sm font-bold text-white bg-[#1B945E] py-3 px-5 rounded-4xl hover:bg-[#157d4f]">Join the Community</button></Link>
                        </div>
                    )
                }

                {/* Mobile menu toggle */}
                <button
                    type="button"
                    aria-label="Toggle menu"
                    aria-expanded={menuOpen}
                    onClick={() => setMenuOpen((open) => !open)}
                    className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-[#CBE2D2] text-[#14231B] lg:hidden"
                >
                    {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
            </div>
        </div>

        {/* Mobile panel: every link is always visible, so the tabs work while logged out too */}
        {menuOpen && (
            <nav className="mt-3 flex flex-col gap-1 rounded-2xl border border-[#E9F0EA] bg-white p-3 shadow-sm lg:hidden">
                {links.map((link, indx) => (
                    <Link key={indx} href={link.href} onClick={() => setMenuOpen(false)}>
                        <button className="w-full cursor-pointer rounded-lg px-3 py-2.5 text-left text-sm font-bold text-[#14231B] hover:bg-[#e5f9ea]">
                            {link.name}
                        </button>
                    </Link>
                ))}
                {!user && (
                    <>
                        <Link href="/sign-In" onClick={() => setMenuOpen(false)}>
                            <button className="w-full cursor-pointer rounded-lg px-3 py-2.5 text-left text-sm font-bold text-[#14231B] hover:bg-[#e5f9ea]">Login</button>
                        </Link>
                        <Link href="/sign-up" onClick={() => setMenuOpen(false)}>
                            <button className="w-full cursor-pointer rounded-full bg-[#1B945E] px-3 py-3 text-sm font-bold text-white">Join the Community</button>
                        </Link>
                    </>
                )}
            </nav>
        )}
    </div>
  )
}

export default Navbar
