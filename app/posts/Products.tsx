"use client"

import React, { useEffect, useState } from "react"

import Product from "./Product"

interface ProductData {
  id: string
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
            <Product key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  )
}

export default Products
