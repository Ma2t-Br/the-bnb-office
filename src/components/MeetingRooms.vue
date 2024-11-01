<script setup lang="ts">
import type { Seat } from '../types';

defineProps<{
  rooms: Seat[];
  selectedSeatId: string | null;
  onRoomSelect: (room: Seat) => void;
}>();
</script>

<template>
  <div class="bg-gray-50 p-3 rounded-lg">
    <h2 class="text-lg font-semibold mb-2">Salles</h2>
    <div class="grid grid-cols-3 gap-2">
      <div
        v-for="room in rooms"
        :key="room.id"
        class="aspect-[4/3] cursor-pointer"
        @click="onRoomSelect(room)"
      >
        <div
          class="h-full flex flex-col items-center justify-center p-1 border rounded-lg transition-all duration-200"
          :class="[
            selectedSeatId === room.id
              ? 'bg-blue-500 text-white border-blue-600'
              : 'bg-white text-gray-800 border-gray-300 hover:bg-blue-50'
          ]"
        >
          <span class="text-sm font-medium">{{ room.name }}</span>
          <span class="text-xs opacity-75">1 place</span>
        </div>
      </div>
    </div>
  </div>
</template>