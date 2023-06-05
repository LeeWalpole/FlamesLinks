import React from "react"
import Image from "next/image"
import Link from "next/link"

interface ProductProps {
  product: ProductData
}

const Product: React.FC<ProductProps> = ({ product }) => {
  return (
    <article key={product.id} className="product">
      <section className="product-data">
        <h6 className="product-title">{product.title}</h6>
        <Link href={`/posts/${product.id}`}>View Post</Link>
      </section>
    </article>
  )
}

export default Product
