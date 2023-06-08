import { Suspense } from "react"
import Image from "next/image"
import Link from "next/link"

import Loading from "@/components/Loading"

interface ProductProps {
  product: {
    id: number | string
    title: string
  }
}

const Product: React.FC<ProductProps> = ({ product }) => {
  return (
    <Suspense fallback={<Loading />}>
      <article key={product.id} className="product">
        <section className="product-data">
          <h6 className="product-title">{product.title}</h6>
          <Link href={`/posts/${product.id}`}>View Post</Link>
        </section>
      </article>
    </Suspense>
  )
}

export default Product
