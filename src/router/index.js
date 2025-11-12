import { createRouter, createWebHistory } from 'vue-router'
import RegisterView from '@/views/auth/RegisterView.vue'
import DashboardView from '@/views/DashboardView.vue'
import LoginView from '@/views/auth/LoginView.vue'
import GetProductView from '@/views/products/GetProductView.vue'
import CreateOrdersView from '@/views/orders/CreateOrdersView.vue'
import MainLayaout from '@/layaouts/MainLayaout.vue'
import CreateCategoriesViews from '@/views/categories/CreateCategoriesViews.vue'
import GetCategoriesView from '@/views/categories/GetCategoriesView.vue'
import EditCategoryView from '@/views/categories/EditCategoryView.vue'
import CreateProductView from '@/views/products/CreateProductView.vue'
import ManageProductsView from '@/views/products/ManageProductsView.vue'
import EditProductView from '@/views/products/EditProductView.vue'
import ForgotPasswordView from '@/views/auth/ForgotPasswordView.vue'
import RecoveryPasswordView from '@/views/auth/RecoveryPasswordView.vue'

const isAuthenticated = () => {
  const token = localStorage.getItem('access_token')
  return !!token
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'register',
      component: RegisterView,
      beforeEnter: (to, from, next) => {
        if (isAuthenticated()) {
          next({ name: 'dashboard' })
        } else {
          next()
        }
      },
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: ForgotPasswordView,
      beforeEnter: (to, from, next) => {
        if (isAuthenticated()) {
          next({ name: 'dashboard' })
        } else {
          next()
        }
      },
    },
    {
      path: '/recovery-password',
      name: 'recovery-password',
      component: RecoveryPasswordView,
      beforeEnter: (to, from, next) => {
        if (isAuthenticated()) {
          next({ name: 'dashboard' })
        } else {
          next()
        }
      },
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      beforeEnter: (to, from, next) => {
        if (isAuthenticated()) {
          next({ name: 'dashboard' })
        } else {
          next()
        }
      },
    },
    {
      path: '/',
      component: MainLayaout,
      beforeEnter: (to, from, next) => {
        if (!isAuthenticated()) {
          next({ name: 'register' })
        } else {
          next()
        }
      },
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          component: DashboardView,
        },
        {
          path: '/products',
          name: 'products',
          component: GetProductView,
        },
        {
          path: '/products/create',
          name: 'createProducts',
          component: CreateProductView,
        },
        {
          path: '/products/manage',
          name: 'manageProducts',
          component: ManageProductsView,
        },
        {
          path: '/products/edit',
          name: 'editProduct',
          component: EditProductView,
        },
        {
          path: '/orders',
          name: 'createOrders',
          component: CreateOrdersView,
        },
        {
          path: '/categories/create',
          name: 'createCategories',
          component: CreateCategoriesViews,
        },
        {
          path: '/categories/',
          name: 'getCategories',
          component: GetCategoriesView,
        },
        {
          path: 'categories/edit',
          name: 'editCategory',
          component: EditCategoryView
        }
      ]
    },
  ],
})

export default router
