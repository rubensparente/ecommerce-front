<template>
  <Card class="mb-3 sm:mb-4 transition-all hover:shadow-lg">
    <template #content>
      <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center">
        <!-- Imagem -->
        <img 
          :src="'https://picsum.photos/seed/' + item.product.id + '/100/100'" 
          :alt="item.product.title"
          class="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg"
        />
        
        <!-- Informações -->
        <div class="flex-1 text-center sm:text-left">
          <h3 class="text-base sm:text-lg font-semibold text-gray-800 dark:text-white">
            {{ item.product.title }}
          </h3>
          <p class="text-xs sm:text-sm text-gray-500 dark:text-gray-400 hidden sm:block">
            {{ item.product.description }}
          </p>
          <div class="flex items-center justify-center sm:justify-start gap-2 mt-2">
            <span class="text-lg sm:text-xl md:text-2xl font-bold text-green-600 dark:text-green-400">
              {{ getItemTotal().toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}
            </span>
            <span v-if="item.product.discount > 0" class="text-xs sm:text-sm text-gray-500">
              ({{ (item.product.discount * 100).toFixed(0) }}% off)
            </span>
          </div>
        </div>
        
        <!-- Controles de quantidade -->
        <div class="flex items-center gap-2 sm:gap-3">
          <div class="flex items-center gap-1 sm:gap-2 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            <Button 
              icon="pi pi-minus" 
              @click="onDecrementItem(item.product)"
              severity="secondary"
              text
              rounded
              size="small"
              :disabled="item.quantity <= 1"
            />
            
            <span class="text-base sm:text-lg md:text-xl font-bold w-8 sm:w-12 text-center text-gray-800 dark:text-white">
              {{ item.quantity }}
            </span>
            
            <Button 
              icon="pi pi-plus" 
              @click="onIncrementItem(item.product)"
              severity="primary"
              text
              rounded
              size="small"
            />
          </div>
          
          <Button 
            icon="pi pi-trash" 
            @click="confirmRemove(item.product)"
            severity="danger"
            text
            rounded
            size="small"
          />
        </div>
      </div>
      
      <!-- Descrição mobile -->
      <p class="text-xs text-gray-500 dark:text-gray-400 mt-2 sm:hidden">
        {{ item.product.description }}
      </p>
    </template>
  </Card>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import { type ICartItem } from '@/model/cart.model'
import type { Product } from '@/model/product.model'

export default defineComponent({
  name: 'CartItem',
  props: {
    item: {
      type: Object as PropType<ICartItem>,
      required: true,
    },
  },
  emits: ['removeItem', 'decrementItem', 'incrementItem'],
  methods: {
    onDecrementItem(product: Product) {
      this.$emit('decrementItem', product)
    },
    onIncrementItem(product: Product) {
      this.$emit('incrementItem', product)
    },
    onRemoveItem(product: Product) {
      this.$emit('removeItem', product)
    },
    confirmRemove(product: Product) {
      if (confirm(`Deseja remover "${product.title}" do carrinho?`)) {
        this.onRemoveItem(product)
      }
    },
    getItemTotal(): number {
      const discountedPrice = this.item.product.price * (1 - this.item.product.discount)
      return discountedPrice * this.item.quantity
    }
  },
})
</script>