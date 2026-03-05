import type { ProductsResponse } from "../types/product"

export async function fetchProducts(): Promise<ProductsResponse> {
  const urls = [
    "https://dummyjson.com/products/category/smartphones",
    "https://dummyjson.com/products/category/laptops",
    "https://dummyjson.com/products/category/tablets",
    "https://dummyjson.com/products/category/mobile-accessories",
  ]

  const responses = await Promise.all(
    urls.map((url) => fetch(url).then((res) => res.json()))
  )

  const products = responses.flatMap((r) => r.products)

  return {
    products,
    total: products.length,
    skip: 0,
    limit: products.length,
  }
}