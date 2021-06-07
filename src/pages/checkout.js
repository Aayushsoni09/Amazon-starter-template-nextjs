import Image from 'next/image'
import React from 'react'
import { useSelector } from 'react-redux'
import NavBar from '../Components/NavBar'
import { selectItems , selectTotal} from '../slices/basketSlice'
import CartItems from '../Components/CartItems'
import Currency from "react-currency-formatter"
import { useSession } from 'next-auth/client'
import {loadStripe} from "@stripe/stripe-js"
import axios from 'axios'
const stripePromise=loadStripe(process.env.stripe_public_key);
function checkout() {
    const items=useSelector(selectItems)
    const [session]=useSession()
    const total=useSelector(selectTotal)

    const createCheckOutSession=async ()=>{
        const stripe=await stripePromise

        const checkoutSession=await axios.post("/api/create-checkout-session",{
            items:items,
            email:session.user.email,
        });

        const result = await stripe.redirectToCheckout({
            sessionId:checkoutSession.data.id,
        })

        if (result.error) alert(result.error.message);
    }
    return (
        <div className="bg-gray-100">
            <NavBar />
            <main className="lg:flex max-w-screen-2xl mx-auto">
                {/* left */}
                <div className="flex-grow m-5 shadow-sm">
                    <Image
                        src="https://links.papareact.com/ikj"
                        width={1020}
                        height={250}
                        objectFit="contain"
                    />
                    <div className="flex flex-col p-5 space-y-10 bg-white">
                        <h1 className="text-3xl border-b pb-4">{items.length==0 ? "Cart is Empty":"Your Shopping Cart"}</h1>
                        {items.map((item,i)=>(

                        <CartItems id={item.id} key={i} title={item.title} price={item.price} description={item.description} category={item.category}  image={item.image} isPrime={item.isPrime} rating={item.rating} />
                        ))}
                        

                    </div>

                </div>
                <div></div>

                            {/* Right */}
                            <div className="flex flex-col bg-white p-10 shadow-md">
                                {items.length > 0 && (

                                    <>
                                    <h2 className="whitespace-nowrap">
                                        Subtotal ({items.length} items):{" "}
                                        <span className="font-bold">
                                            
                                            <Currency quantity={total} currency="INR" />
                                        </span>

                                    </h2>
                                    <button onClick={createCheckOutSession} role="link" disabled={!session} className={`button mt-2 ${!session && 'from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed'}`}>
                                        {!session ? "SignIn to Checkout": "Proceed to Checkout"}
                                    </button>
                                    </>
                                )}
                            </div>
            </main>
        </div>
    )
}

export default checkout
