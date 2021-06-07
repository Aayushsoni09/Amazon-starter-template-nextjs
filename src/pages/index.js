import Head from "next/head";
import NavBar from '../Components/NavBar'
import Banner from '../Components/Banner'
import ProductFeed from "../Components/ProductFeed";
export default function Home({products}) {
  return (
    <div className="bg-gray-100">
      <Head>
        <title>Amazon</title>
      </Head>
    <NavBar/>
    <main className="max-w-screen-2xl mx-auto"><Banner/></main>
    <ProductFeed products={products}/>
      
    </div>
  );
}
export async function getServerSideProps(context){

  const products=await fetch("https://fakestoreapi.com/products").then(
    (res)=>res.json()
  );
  return {
    props:{
      products,
    },
  };
}
