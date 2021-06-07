import React from 'react'
import Image from "next/image"
import {MenuIcon,SearchIcon,ShoppingCartIcon} from "@heroicons/react/outline"
import { signIn, signOut, useSession } from 'next-auth/client'
import { useRouter} from 'next/router'
import { useSelector } from 'react-redux'
import { selectItems } from '../slices/basketSlice'
function NavBar() {
    const [ session] = useSession()
    const router =useRouter()
    const items=useSelector(selectItems)
    return (
        <header>
            <div className="flex items-center bg-amazon_blue p-1 flex-grow py-2">
                <div className="mt-2 flex items-center flex-grow sm:flex-grow-0">
                <Image
                    onClick={()=>router.push('/')}
                    src="https://links.papareact.com/f90"
                    width={150}
                    height={40}
                    objectFit="contain"
                    className="cursor-pointer"/>
                </div>
                <div className="hidden sm:flex h-10 items-center bg-yellow-400 hover:bg-yellow-500 flex-grow  rounded-md cursor-pointer">
                    <input type="text" className="p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none"/>
                    <SearchIcon className="h-12 p-4"/>
                </div>
                <div className="text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap">
                    <div onClick={!session?signIn:signOut} className="cursor-pointer hover:underline"> 
                          <p>{session ? `Hello, ${session.user.name}` : "Sign In"}   </p>
                          <p className="font-extrabold  md:text-sm">Accounts and Lists</p>  
                    </div>
                <div className="cursor-pointer hover:underline " > 
                    <p>Returns</p>
                    <p role="link" onClick={() => router.push('/orders')} className="font-extrabold md:text-sm">& Orders</p> 
                </div>
                
                <div onClick={()=>router.push('/checkout')} className="relative cursor-pointer hover:underline flex items-center">
                <span className="absolute top-0 right-0 md:right-5 h-4 w-4 bg-yellow-400 rounded-full text-black text-center font-bold">{items.length}</span> 
                    <ShoppingCartIcon className="h-10" />
                    <p className=" hidden md:inline font-extrabold  md:text-sm  mt-2">Cart</p>
                </div>
                </div>
            </div>
            <div className="flex items-center bg-amazon_blue-light space-x-3 p-2 p-l-6 text-white" >
                
                <p className="cursor-pointer hover:underline flex items-center ">
                    <MenuIcon  className="h-6 mr-1"/> All</p>
                <p className="cursor-pointer hover:underline">Prime Video</p>
                <p className="cursor-pointer hover:underline">Amazon Business</p>
                <p className="cursor-pointer hover:underline">Today's Deals</p>
                <p className="hidden lg:inline-flex cursor-pointer hover:underline ">Electronics</p>
                <p className="hidden lg:inline-flex cursor-pointer hover:underline ">Food and Grocery</p>
                <p className="hidden lg:inline-flex cursor-pointer hover:underline ">Prime</p>
                <p className="hidden lg:inline-flex cursor-pointer hover:underline ">Buy Again</p>
                <p className="hidden lg:inline-flex cursor-pointer hover:underline ">Health & Personal Care</p>

            </div>
        </header>
    )
}

export default NavBar
