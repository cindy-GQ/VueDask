<script setup lang="ts">
interface Props {
  variant?: 'default' | 'ghost' | 'primary'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
}

withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'md',
  disabled: false,
})

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

function handleClick(event: MouseEvent) {
  emit('click', event)
}
</script>

<template>
  <button
    class="inline-flex items-center justify-center rounded-md transition-colors disabled:cursor-not-allowed disabled:opacity-50"
    :class="{
      'bg-green-500 text-slate-950 hover:bg-green-400': variant === 'primary',
      'bg-slate-800 text-slate-100 hover:bg-slate-700': variant === 'default',
      'bg-transparent text-slate-300 hover:bg-slate-800': variant === 'ghost',
      'h-8 px-3 text-sm': size === 'sm',
      'h-10 px-4 text-sm': size === 'md',
      'h-12 px-6 text-base': size === 'lg',
    }"
    :disabled="disabled"
    @click="handleClick"
  >
    <slot />
  </button>
</template>
