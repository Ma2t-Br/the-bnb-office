<script setup lang="ts">
import { ref } from 'vue';
import { useDark, useToggle } from '@vueuse/core';
import OpenSpaceView from './views/OpenSpaceView.vue';
import RoomsView from './views/RoomsView.vue';

const currentView = ref<'openspace' | 'rooms'>('openspace');
const isDark = useDark();
const toggleDark = useToggle(isDark);
</script>

<template>
  <div class="w-full min-h-screen bg-gray-100 dark:bg-gray-900">
    <nav class="bg-white dark:bg-gray-800 shadow mb-6">
      <div class="max-w-lg mx-auto px-4">
        <div class="flex items-center justify-between py-3">
          <div class="flex items-center space-x-3">
            <img src="/src/assets/vue.svg" alt="Logo" class="w-6 h-6" />
            <div class="flex space-x-4">
              <button
                @click="currentView = 'openspace'"
                class="px-3 py-2 rounded-md text-sm font-medium"
                :class="currentView === 'openspace' ? 'bg-blue-500 text-white' : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'"
              >
                Open Space
              </button>
              <button
                @click="currentView = 'rooms'"
                class="px-3 py-2 rounded-md text-sm font-medium"
                :class="currentView === 'rooms' ? 'bg-blue-500 text-white' : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'"
              >
                Salles
              </button>
            </div>
          </div>
          <button
            @click="toggleDark()"
            class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <svg
              v-if="isDark"
              class="w-5 h-5 text-gray-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
            <svg
              v-else
              class="w-5 h-5 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>

    <component :is="currentView === 'openspace' ? OpenSpaceView : RoomsView" />
  </div>
</template>