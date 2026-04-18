import { createRouter, createWebHistory } from "vue-router"
import HomePage from "../pages/HomePage.vue"
import ProductDetails from "../pages/ProductDetails.vue"

const routes = [
  {
    path: "/",
    component: HomePage,
  },
  {
    path: "/product/:id",
    component: ProductDetails,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router