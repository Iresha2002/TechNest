<script setup lang="ts">
import { ref, onMounted } from "vue"
import { useRoute, RouterLink } from "vue-router"
import { fetchProductById } from "../api/product"
import type { Product } from "../types/product"
import { useCartStore } from "../stores/cart"

const route = useRoute()

const product = ref<Product | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)
  const cartStore = useCartStore()

onMounted(async () => {
  try {
    const id = route.params.id as string
    const data = await fetchProductById(id)
    product.value = data
  } catch (e) {
    console.error(e)
    error.value = e instanceof Error ? e.message : "Failed to load product"
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 px-4 py-10">
    <div class="mx-auto max-w-6xl">
      <RouterLink
        to="/"
        class="inline-block mb-6 rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-900"
      >
        ← Back to products
      </RouterLink>

      <p v-if="loading" class="text-sm text-gray-500 dark:text-gray-400">
        Loading product details...
      </p>

      <p v-else-if="error" class="text-sm text-red-500">
        {{ error }}
      </p>

      <div
        v-else-if="product"
        class="grid md:grid-cols-2 gap-10 items-start"
      >
        <div class="rounded-2xl border border-gray-200 dark:border-gray-800 p-4 bg-white dark:bg-gray-900">
          <img
            :src="product.thumbnail"
            :alt="product.title"
            class="w-full h-96 object-cover rounded-xl"
          />
        </div>

        <div>
          <p class="text-sm text-gray-500 dark:text-gray-400 uppercase">
            {{ product.category }}
          </p>

          <h1 class="mt-2 text-3xl font-bold">
            {{ product.title }}
          </h1>

          <p class="mt-2 text-gray-500 dark:text-gray-400">
            Brand: {{ product.brand }}
          </p>

          <p class="mt-4 text-2xl font-bold text-blue-600">
            ${{ product.price }}
          </p>

          <p class="mt-3 text-sm text-gray-500 dark:text-gray-400">
            ⭐ {{ product.rating }} • Stock: {{ product.stock }}
          </p>

          <p class="mt-6 leading-7 text-gray-700 dark:text-gray-300">
            {{ product.description }}
          </p>

          
           <button
          v-if="product"
          @click="
            cartStore.isInCart(product.id)
              ? cartStore.removeFromCart(product.id)
              : cartStore.addToCart(product)
          "
          class="mt-8 rounded-xl px-6 py-3 text-sm font-semibold"
          :class="cartStore.isInCart(product.id)
            ? 'bg-red-500 text-white hover:bg-red-600'
            : 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'"
        >
          {{ cartStore.isInCart(product.id) ? "Remove from cart" : "Add to cart" }}
        </button>
        </div>
      </div>
    </div>
  </div>
</template>