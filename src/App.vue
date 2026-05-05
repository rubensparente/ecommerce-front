<script lang="ts">
import { Product } from './model/product.model'
import { Cart } from './model/cart.model'
import ProductCard from './components/card/ProductCard.vue'
import CartItem from './components/card/CartItem.vue'

export default {
  name: 'App',
  components: { ProductCard, CartItem },
  data() {
    return {
      cart: new Cart(),
      isDarkMode: false,
      isMobileMenuOpen: false,
      products: [
        new Product('1', 'Guitarra Stratocaster', '22 trastes, corpo em alder, captadores single-coil', 200, 0.05),
        new Product('2', 'Guitarra Les Paul', '22 trastes, corpo em mogno, captadores humbucker', 250, 0.10),
        new Product('3', 'Baixo Jazz Bass', '20 trastes, corpo em amieiro, captadores single-coil', 300, 0.15),
        new Product('4', 'Bateria Eletrônica', 'Kit completo com 5 pads, módulo com 500 sons', 1500, 0.20),
        new Product('5', 'Teclado Digital', '88 teclas sensitivas, 700 timbres, 200 ritmos', 800, 0.10),
        new Product('6', 'Microfone Condensador', 'Padrão cardioide, resposta de frequência 20Hz-20kHz', 350, 0.05),
        new Product('7', 'Amplificador Valvulado', '15 watts, reverb e tremolo', 1200, 0.15),
        new Product('8', 'Pedal de Distorção', 'Overdrive com 3 bandas de EQ', 350, 0.10),
      ],
    }
  },
  mounted() {
    const darkModePreference = window.matchMedia('(prefers-color-scheme: dark)').matches
    this.isDarkMode = darkModePreference
    this.applyDarkMode()
    
    window.addEventListener('resize', this.handleResize)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    addItem(item: Product) {
      this.cart.addItem(item)
      this.showNotification(`${item.title} adicionado ao carrinho!`)
    },
    incItem(item: Product) {
      this.cart.incrementItem(item)
    },
    decItem(item: Product) {
      this.cart.decrementItem(item)
    },
    removeItem(item: Product) {
      this.cart.removeItem(item)
      this.showNotification(`${item.title} removido do carrinho!`, 'warning')
    },
    clearCart() {
      if (confirm('Tem certeza que deseja limpar todo o carrinho?')) {
        this.cart.list = []
        this.cart.totalPrice = 0
        this.showNotification('Carrinho limpo com sucesso!', 'info')
      }
    },
    checkout() {
      if (this.cart.list.length === 0) {
        this.showNotification('Adicione itens ao carrinho antes de finalizar!', 'warning')
        return
      }
      alert(`Compra finalizada! Total: ${this.cart.getTotalPrice()}`)
      this.cart.list = []
      this.cart.totalPrice = 0
    },
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode
      this.applyDarkMode()
    },
    applyDarkMode() {
      if (this.isDarkMode) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    },
    scrollToCart() {
      const cartSection = document.getElementById('cart-section')
      if (cartSection) {
        cartSection.scrollIntoView({ behavior: 'smooth' })
      }
      this.isMobileMenuOpen = false
    },
    scrollToProducts() {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      this.isMobileMenuOpen = false
    },
    handleResize() {
      if (window.innerWidth > 768) {
        this.isMobileMenuOpen = false
      }
    },
    showNotification(message: string, type: 'success' | 'warning' | 'info' = 'success') {
      console.log(`[${type.toUpperCase()}] ${message}`)
    }
  },
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
    <!-- Header -->
    <header class="bg-white dark:bg-gray-800 shadow-lg sticky top-0 z-50 transition-colors duration-200">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-3 sm:py-4">
          <!-- Logo -->
          <h1 @click="scrollToProducts" class="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            🛒 Meu E-commerce
          </h1>
          
          <!-- Menu Desktop (visível apenas em telas médias e grandes) -->
          <div class="hidden md:flex items-center gap-4 lg:gap-6">
            <button 
              @click="scrollToProducts"
              class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Produtos
            </button>
            <button 
              @click="scrollToCart"
              class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Carrinho
            </button>
            
            <!-- Ícone do Carrinho Desktop -->
            <div class="relative">
              <Button 
                icon="pi pi-shopping-cart" 
                severity="secondary" 
                rounded
                @click="scrollToCart"
              />
              <span 
                v-if="cart.getItemCount() > 0"
                class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold"
              >
                {{ cart.getItemCount() }}
              </span>
            </div>
            
            <!-- Botão Dark Mode Desktop -->
            <Button 
              :icon="isDarkMode ? 'pi pi-sun' : 'pi pi-moon'" 
              severity="secondary" 
              rounded
              @click="toggleDarkMode"
            />
          </div>
          
          <!-- Botão do Menu Mobile (visível apenas em telas pequenas) -->
          <div class="flex items-center gap-2 md:hidden">
            <button 
              @click="isMobileMenuOpen = !isMobileMenuOpen"
              class="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <i :class="isMobileMenuOpen ? 'pi pi-times' : 'pi pi-bars'" class="text-xl"></i>
            </button>
          </div>
        </div>
        
        <!-- Menu Mobile Dropdown (visível apenas quando aberto) -->
        <div 
          v-if="isMobileMenuOpen"
          class="md:hidden border-t border-gray-200 dark:border-gray-700 py-4 space-y-3 transition-all duration-300"
        >
          <button 
            @click="scrollToProducts"
            class="block w-full text-left px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            📦 Produtos
          </button>
          <button 
            @click="scrollToCart"
            class="block w-full text-left px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            🛒 Carrinho 
            <span v-if="cart.getItemCount() > 0" class="ml-2 bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
              {{ cart.getItemCount() }}
            </span>
          </button>
          <button 
            @click="toggleDarkMode"
            class="block w-full text-left px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <i :class="isDarkMode ? 'pi pi-sun' : 'pi pi-moon'" class="mr-2"></i>
            {{ isDarkMode ? 'Modo Claro' : 'Modo Escuro' }}
          </button>
        </div>
      </div>
    </header>

    <main class="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
      <!-- Seção de Produtos -->
      <section>
        <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 dark:text-white mb-6 sm:mb-8 lg:mb-12">
          Nossos Produtos
        </h2>
        
        <div class="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
          <ProductCard 
            v-for="product in products" 
            :key="product.id"
            :product="product" 
            @onClick="addItem" 
          />
        </div>
      </section>

      <hr class="my-8 sm:my-12 lg:my-16 border-gray-200 dark:border-gray-700">

      <!-- Seção do Carrinho -->
      <section id="cart-section">
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
          <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 dark:text-white">
            Meu Carrinho
          </h2>
          <div class="text-left sm:text-right w-full sm:w-auto">
            <p class="text-sm sm:text-base text-gray-600 dark:text-gray-300">Total do Carrinho</p>
            <p class="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-600 dark:text-green-400">
              {{ cart.getTotalPrice() }}
            </p>
          </div>
        </div>

        <div v-if="cart.list.length > 0" class="space-y-4">
          <CartItem 
            v-for="item in cart.list" 
            :key="item.product.id"
            :item="item" 
            @decrementItem="decItem"
            @incrementItem="incItem"
            @removeItem="removeItem"
          />
          
          <div class="flex flex-col sm:flex-row justify-end gap-3 mt-6 sm:mt-8">
            <Button 
              label="Limpar Carrinho" 
              icon="pi pi-trash" 
              severity="danger" 
              outlined
              class="w-full sm:w-auto"
              @click="clearCart"
            />
            <Button 
              label="Finalizar Compra" 
              icon="pi pi-check" 
              severity="success"
              class="w-full sm:w-auto"
              @click="checkout"
            />
          </div>
        </div>

        <div v-else>
          <Card class="text-center py-8 sm:py-12 lg:py-16">
            <template #content>
              <div class="flex flex-col items-center gap-3 sm:gap-4">
                <i class="pi pi-shopping-cart text-5xl sm:text-6xl lg:text-7xl text-gray-400"></i>
                <h3 class="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-600 dark:text-gray-300">
                  Seu carrinho está vazio
                </h3>
                <p class="text-sm sm:text-base text-gray-500 px-4">
                  Que tal adicionar alguns produtos incríveis?
                </p>
                <Button 
                  label="Ver Produtos" 
                  icon="pi pi-shopping-bag" 
                  severity="primary"
                  class="mt-2"
                  @click="scrollToProducts"
                />
              </div>
            </template>
          </Card>
        </div>
      </section>
    </main>

    <footer class="bg-white dark:bg-gray-800 mt-12 sm:mt-16 lg:mt-20 py-6 sm:py-8 border-t border-gray-200 dark:border-gray-700">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center text-gray-600 dark:text-gray-400 text-sm sm:text-base">
          <p>&copy; 2026 Meu E-commerce. Todos os direitos reservados.</p>
          <p class="mt-2 text-xs sm:text-sm">Desenvolvido com Vue 3 + PrimeVue + Tailwind CSS</p>
        </div>
      </div>
    </footer>
  </div>
</template>