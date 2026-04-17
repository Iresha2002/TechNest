<script setup lang="ts">
import type { Product } from "../types/product"

defineProps<{
  product: Product
}>()
</script>

<template>
  <div class="bg-white dark:bg-gray-800 rounded-xl shadow p-4 hover:shadow-lg transition">
    
    <img
      :src="product.thumbnail"
      class="w-full h-40 object-cover rounded"
    />

    <h3 class="mt-2 font-semibold text-gray-800 dark:text-white">
      {{ product.title }}
    </h3>

    <p class="text-gray-500 text-sm">
      {{ product.brand }}
    </p>

    <div class="flex justify-between items-center mt-2">
      <span class="text-blue-600 font-bold">
        ${{ product.price }}
      </span>

      <button
        class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
      >
        Add
      </button>
    </div>
    
  </div>
</template>