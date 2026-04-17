<script setup lang="ts">
import { useRoute } from "vue-router"

const route = useRoute()
const productId = route.params.id
</script>

<template>
  <div class="p-10">
    <h1 class="text-2xl font-bold">
      Product ID: {{ productId }}
    </h1>

    <p class="mt-4 text-gray-500">
      Product details page coming soon.
    </p>
  </div>
</template>