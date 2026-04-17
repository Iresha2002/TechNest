<script setup lang="ts">
import { ref, onMounted, computed } from "vue"
import { fetchProducts } from "./api/product"
import type { Product } from "./types/product"

const mobileMenuOpen = ref(false)
const isDark = ref(false)
const products = ref<Product[]>([])
const loading = ref(true)
const error = ref<string | null>(null)
const searchText = ref("")
const selectedCategory = ref("all")

const filteredProducts = computed(() => {
  const q = searchText.value.toLowerCase().trim()

  let result = products.value

  // category filter
  if (selectedCategory.value !== "all") {
    result = result.filter(
      (p) => p.category.toLowerCase() === selectedCategory.value
    )
  }

  // search filter
  if (q) {
    result = result.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    )
  }

  return result
})

function toggleDark() {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle("dark", isDark.value)
  saveTheme()
}

function saveTheme() {
  localStorage.setItem("theme", isDark.value ? "dark" : "light")
}

onMounted(async () => {
  const saved = localStorage.getItem("theme")
  if (saved === "dark") {
    isDark.value = true
    document.documentElement.classList.add("dark")
  }

  try {
    const data = await fetchProducts()
    products.value = data.products
  } catch (e) {
    console.error(e)
    error.value = e instanceof Error ? e.message : "Failed to load products"
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100">
    <!-- Top small bar -->
    <div class="border-b border-gray-200 dark:border-gray-800">
      <div class="mx-auto max-w-6xl px-4 py-2 flex items-center justify-between text-sm">
        <div class="flex items-center gap-2">
          <span class="font-semibold">TechNest</span>
          <span class="text-gray-500 dark:text-gray-400">Gadget Store</span>
        </div>

        <button
          class="rounded-md px-3 py-1 border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900"
          @click="toggleDark"
        >
          {{ isDark ? "Light" : "Dark" }} mode
        </button>
      </div>
    </div>

    <!-- Main Navbar -->
    <header class="sticky top-0 z-50 bg-white/90 dark:bg-gray-950/90 backdrop-blur border-b border-gray-200 dark:border-gray-800">
      <div class="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between gap-4">
        <!-- Logo -->
        <div class="flex items-center gap-3">
          <div class="h-9 w-9 rounded-xl bg-gray-900 dark:bg-gray-100"></div>
          <div>
            <p class="font-bold leading-none">TechNest</p>
            <p class="text-xs text-gray-500 dark:text-gray-400">Smart gadgets, better prices</p>
          </div>
        </div>

        <!-- Desktop Nav -->
        <nav class="hidden md:flex items-center gap-6 text-sm">
          <a class="hover:text-gray-700 dark:hover:text-gray-300" href="#">Home</a>
          <a class="hover:text-gray-700 dark:hover:text-gray-300" href="#">Categories</a>
          <a class="hover:text-gray-700 dark:hover:text-gray-300" href="#">Deals</a>
          <a class="hover:text-gray-700 dark:hover:text-gray-300" href="#">Support</a>
        </nav>

        <!-- Search + Cart -->
        <div class="hidden md:flex items-center gap-3">
          <div class="relative">
            <input
              v-model="searchText"
              class="w-72 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-900/20 dark:focus:ring-gray-100/20"
              placeholder="Search gadgets..."
            />
            <span class="absolute right-3 top-2.5 text-gray-400">⌕</span>
          </div>

          <button class="rounded-xl border border-gray-300 dark:border-gray-700 px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-900">
            Cart (0)
          </button>
        </div>

        <!-- Mobile Menu Button -->
        <button
          class="md:hidden rounded-lg border border-gray-300 dark:border-gray-700 px-3 py-2"
          @click="mobileMenuOpen = !mobileMenuOpen"
        >
          ☰
        </button>
      </div>

      <!-- Mobile menu -->
      <div v-if="mobileMenuOpen" class="md:hidden border-t border-gray-200 dark:border-gray-800">
        <div class="mx-auto max-w-6xl px-4 py-4 space-y-3">
          <input
            v-model="searchText"
            class="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-2 text-sm outline-none"
            placeholder="Search gadgets..."
          />

          <div class="grid grid-cols-2 gap-3 text-sm">
            <a class="rounded-xl border border-gray-300 dark:border-gray-700 px-3 py-2" href="#">Home</a>
            <a class="rounded-xl border border-gray-300 dark:border-gray-700 px-3 py-2" href="#">Categories</a>
            <a class="rounded-xl border border-gray-300 dark:border-gray-700 px-3 py-2" href="#">Deals</a>
            <a class="rounded-xl border border-gray-300 dark:border-gray-700 px-3 py-2" href="#">Support</a>
          </div>

          <button class="w-full rounded-xl border border-gray-300 dark:border-gray-700 px-4 py-2 text-sm">
            Cart (0)
          </button>
        </div>
      </div>
    </header>

    <!-- Hero -->
    <section class="border-b border-gray-200 dark:border-gray-800">
      <div class="mx-auto max-w-6xl px-4 py-10 md:py-14 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <p class="text-sm text-gray-500 dark:text-gray-400">Welcome to TechNest</p>
          <h2 class="mt-2 text-3xl md:text-4xl font-bold leading-tight">
            Find your next gadget with a clean, modern shopping experience.
          </h2>
          <p class="mt-3 text-gray-600 dark:text-gray-300">
            Browse phones, laptops, and accessories.
          </p>

          <div class="mt-6 flex flex-wrap gap-3">
            <button class="rounded-xl bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900 px-5 py-2.5 text-sm font-semibold">
              Browse Products
            </button>
            <button class="rounded-xl border border-gray-300 dark:border-gray-700 px-5 py-2.5 text-sm">
              View Deals
            </button>
          </div>
        </div>

        <div class="rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
          <p class="text-sm font-semibold">Quick stats</p>
          <div class="mt-4 grid grid-cols-3 gap-3 text-center">
            <div class="rounded-xl bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 p-4">
              <p class="text-xl font-bold">100+</p>
              <p class="text-xs text-gray-500 dark:text-gray-400">Products</p>
            </div>
            <div class="rounded-xl bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 p-4">
              <p class="text-xl font-bold">Top</p>
              <p class="text-xs text-gray-500 dark:text-gray-400">Brands</p>
            </div>
            <div class="rounded-xl bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 p-4">
              <p class="text-xl font-bold">Fast</p>
              <p class="text-xs text-gray-500 dark:text-gray-400">Search</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Products -->
    <main class="mx-auto max-w-6xl px-4 py-10">
      <h3 class="text-lg font-bold">Products</h3>

      <div class="flex flex-wrap gap-2 mt-4">
<!-- CATEGORY FILTER -->
<button
  @click="selectedCategory = 'all'"
  :class="selectedCategory === 'all'
    ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'
    : 'border border-gray-300 dark:border-gray-700'"
  class="px-4 py-2 rounded-xl text-sm"
>
All
</button>

<button
  @click="selectedCategory = 'smartphones'"
  :class="selectedCategory === 'smartphones'
    ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'
    : 'border border-gray-300 dark:border-gray-700'"
  class="px-4 py-2 rounded-xl text-sm"
>
Smartphones
</button>

<button
  @click="selectedCategory = 'laptops'"
  :class="selectedCategory === 'laptops'
    ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'
    : 'border border-gray-300 dark:border-gray-700'"
  class="px-4 py-2 rounded-xl text-sm"
>
Laptops
</button>

<button
  @click="selectedCategory = 'tablets'"
  :class="selectedCategory === 'tablets'
    ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'
    : 'border border-gray-300 dark:border-gray-700'"
  class="px-4 py-2 rounded-xl text-sm"
>
Tablets
</button>

<button
  @click="selectedCategory = 'mobile-accessories'"
  :class="selectedCategory === 'mobile-accessories'
    ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'
    : 'border border-gray-300 dark:border-gray-700'"
  class="px-4 py-2 rounded-xl text-sm"
>
Accessories
</button>

</div>

      <p v-if="loading" class="mt-6 text-sm text-gray-500 dark:text-gray-400">
        Loading products...
      </p>

      <p v-else-if="error" class="mt-6 text-sm text-red-500">
        {{ error }}
      </p>

      <div v-else class="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <router-link
      v-for="p in filteredProducts"
        :key="p.id"
        :to="`/product/${p.id}`"
          class="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-4 hover:shadow-lg transition"
        >
          <img
            :src="p.thumbnail"
            :alt="p.title"
            class="h-40 w-full object-cover rounded-xl bg-gray-100 dark:bg-gray-900"
          />

          <h4 class="mt-3 font-semibold line-clamp-1">
            {{ p.title }}
          </h4>

          <p class="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
            {{ p.brand }} • {{ p.category }}
          </p>

          <div class="mt-3 flex items-center justify-between">
            <p class="font-bold">
              ${{ p.price }}
            </p>

            <p class="text-sm text-gray-500 dark:text-gray-400">
              ⭐ {{ p.rating }}
            </p>
          </div>

          <button
            class="mt-4 w-full rounded-xl bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900 py-2 text-sm font-semibold hover:opacity-90"
          >
            Add to cart
          </button>
        </router-link>
      </div>
    </main>

    <footer class="border-t border-gray-200 dark:border-gray-800">
      <div class="mx-auto max-w-6xl px-4 py-6 text-sm text-gray-500 dark:text-gray-400">
        © {{ new Date().getFullYear() }} TechNest — Built with Vue 3 + Tailwind
      </div>
    </footer>
  </div>
</template>