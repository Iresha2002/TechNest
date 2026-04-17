import { createRouter, createWebHistory } from "vue-router"
import Home from "../App.vue"
import ProductDetails from "../pages/ProductDetails.vue"

const routes = [
  {
    path: "/",
    component: Home
  },
  {
    path: "/product/:id",
    component: ProductDetails
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router