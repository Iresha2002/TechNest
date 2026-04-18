import { defineStore } from "pinia"
import type { Product } from "../types/product"

export const useCartStore = defineStore("cart", {
  state: () => ({
    items: JSON.parse(localStorage.getItem("cartItems") || "[]") as Product[],
  }),

  getters: {
    count: (state) => state.items.length,

    isInCart: (state) => {
      return (id: number) => state.items.some((item) => item.id === id)
    },
  },

  actions: {
    addToCart(product: Product) {
      this.items.push(product)
      this.saveCart()
    },

    removeFromCart(productId: number) {
      this.items = this.items.filter((item) => item.id !== productId)
      this.saveCart()
    },

    saveCart() {
      localStorage.setItem("cartItems", JSON.stringify(this.items))
    },
  },
})