"use client"

import React, { useEffect, useState } from "react"

import Product from "./Product"

interface ProductData {
  id: string | number
  title: string
}

interface ProductsProps {
  products: ProductData[]
}

const Products: React.FC<ProductsProps> = ({ products }) => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    // Simulating data fetching delay
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }, [])

  if (loading) {
    return <p>Loading...</p>
  }

  return (
    <div>
      <section className="products">
        <div className="product-list">
          {products.map((product) => (
            <div>
              <Product key={product.id} product={product} />
              <hr className="my-4 py-1" />
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Products
