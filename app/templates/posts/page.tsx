import Products from "./Products"

const wp_api_endpoint = "https://jsonplaceholder.typicode.com/posts" // this works on

async function getData() {
  const res = await fetch(wp_api_endpoint)
  return res.json()
}

const ProductsPage = async () => {
  const products = await getData()

  return <Products products={products} />
}

export default ProductsPage
