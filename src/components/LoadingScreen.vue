<script setup lang="ts"></script>

<template>
  <div class="fixed inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-900">
    <div class="relative">
      <img
        src="/src/assets/BnBOffice_App.svg"
        alt="BnB Office Logo"
        class="w-24 h-24 animate-bounce"
      />
      <div class="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
        <div class="flex items-center space-x-2">
          <div class="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
          <div class="w-3 h-3 bg-blue-500 rounded-full animate-pulse" style="animation-delay: 0.2s"></div>
          <div class="w-3 h-3 bg-blue-500 rounded-full animate-pulse" style="animation-delay: 0.4s"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-bounce {
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(-5%);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  50% {
    transform: translateY(0);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
}

.animate-pulse {
  animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: .3;
  }
}
</style>