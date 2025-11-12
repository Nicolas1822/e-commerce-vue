export const API_URL = {
  prod: {
    register: "http://18.222.23.127:3000/api/v1/customer/",
    login: "http://18.222.23.127:3000/api/v1/auth/login",
    products: {
      getProducts: "http://18.222.23.127:3000/api/v1/products/",
      getProductsById: "http://18.222.23.127:3000/api/v1/products/product-id?id=",
      createProduct: "http://18.222.23.127:3000/api/v1/products/",
      editProduct: "http://18.222.23.127:3000/api/v1/products/?id=",
      deleteProduct: "http://18.222.23.127:3000/api/v1/products/?id=",
    },
    orders: {
      createOrder: "http://18.222.23.127:3000/api/v1/orders/",
      addItemToOrder: "http://18.222.23.127:3000/api/v1/orders/add-item",
      showMyOrders: "http://18.222.23.127:3000/api/v1/profile/my-orders",
      deleteOrder: "http://18.222.23.127:3000/api/v1/orders/?id=",
    },
    categories: {
      getCategories: "http://18.222.23.127:3000/api/v1/categories/",
      getCategoryById: "http://18.222.23.127:3000/api/v1/categories/category-id?id=",
      createCategories: "http://18.222.23.127:3000/api/v1/categories/",
      modifyCategory: "http://18.222.23.127:3000/api/v1/categories/?id=",
      deleteCategory: "http://18.222.23.127:3000/api/v1/categories/?id=",
    }
  },

  dev: {
    register: "http://localhost:3000/api/v1/customer/",
    login: "http://localhost:3000/api/v1/auth/login",
    forgotPassword: "http://localhost:3000/api/v1/auth/recovery",
    resetPassword: "http://localhost:3000/api/v1/auth/change-password",
    products: {
      getProducts: "http://localhost:3000/api/v1/products/",
      getProductsById: "http://localhost:3000/api/v1/products/product-id?id=",
      createProduct: "http://localhost:3000/api/v1/products/",
      editProduct: "http://localhost:3000/api/v1/products/?id=",
      deleteProduct: "http://localhost:3000/api/v1/products/?id=",
    },
    orders: {
      createOrder: "http://localhost:3000/api/v1/orders/",
      addItemToOrder: "http://localhost:3000/api/v1/orders/add-item",
      showMyOrders: "http://localhost:3000/api/v1/profile/my-orders",
      deleteOrder: "http://localhost:3000/api/v1/orders/?id=",
    },
    categories: {
      getCategories: "http://localhost:3000/api/v1/categories/",
      getCategoryById: "http://localhost:3000/api/v1/categories/category-id?id=",
      createCategories: "http://localhost:3000/api/v1/categories/",
      modifyCategory: "http://localhost:3000/api/v1/categories/?id=",
      deleteCategory: "http://localhost:3000/api/v1/categories/?id=",
    }
  }
}
