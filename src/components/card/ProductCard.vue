<template>
  <div class="transform transition-all duration-300 hover:scale-105 h-full">
    <Card class="!border-0 shadow-lg hover:shadow-xl transition-shadow h-full flex flex-col">
      <template #header>
        <div class="relative overflow-hidden rounded-t-lg">
          <img 
            :src="'https://picsum.photos/seed/' + product?.id + '/400/300'" 
            :alt="product?.title"
            class="w-full h-36 sm:h-40 md:h-48 object-cover hover:scale-110 transition-transform duration-300"
          />
          <div v-if="product?.discount > 0" class="absolute top-2 right-2">
            <span class="bg-red-500 text-white px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-bold">
              {{ (product.discount * 100).toFixed(0) }}% OFF
            </span>
          </div>
        </div>
      </template>
      
      <template #title>
        <h3 class="text-base sm:text-lg md:text-xl font-bold text-gray-800 dark:text-white line-clamp-1">
          {{ product?.title }}
        </h3>
      </template>
      
      <template #subtitle>
        <div class="flex items-center gap-2 mt-1">
          <span class="text-lg sm:text-xl md:text-2xl font-bold text-green-600 dark:text-green-400">
            R$ {{ getDiscountedPrice().toFixed(2).replace('.', ',') }}
          </span>
          <span v-if="product?.discount > 0" class="text-xs sm:text-sm text-gray-500 line-through">
            R$ {{ product?.price.toFixed(2).replace('.', ',') }}
          </span>
        </div>
      </template>
      
      <template #content>
        <p class="text-gray-600 dark:text-gray-300 text-xs sm:text-sm line-clamp-2 sm:line-clamp-3">
          {{ product?.description }}
        </p>
      </template>
      
      <template #footer>
        <div class="flex gap-2 mt-auto">
          <Button 
            @click="addItem(product!)" 
            label="Adicionar"
            icon="pi pi-shopping-cart"
            class="w-full text-sm sm:text-base"
            severity="primary"
            size="small"
          />
        </div>
      </template>
    </Card>
  </div>
</template>

<script lang="ts">
import { Product } from '@/model/product.model'
import { defineComponent, type PropType } from 'vue'

export default defineComponent({
  name: 'ProductCard',
  props: {
    product: {
      type: Object as PropType<Product>,
      required: true,
    },
  },
  emits: ['onClick'],
  methods: {
    addItem(product: Product) {
      this.$emit('onClick', product)
    },
    getDiscountedPrice(): number {
      if (!this.product) return 0
      return this.product.price * (1 - this.product.discount)
    }
  },
})
</script>