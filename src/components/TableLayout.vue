<script setup lang="ts">
import { computed } from 'vue';
import type { Seat } from '../types';
import { useBookingStore } from '../stores/bookingStore';

const props = defineProps<{
  seats: Seat[];
  selectedSeatId: string | null;
  selectedDate: string;
  onSeatSelect: (seat: Seat) => void;
}>();

const bookingStore = useBookingStore();

const seatStyle = computed(() => (seat: Seat) => {
  if (!seat.position) return {};
  
  const baseStyles = {
    position: 'absolute',
    transform: 'translate(-50%, -50%)',
  } as const;

  const positions = {
    '0,1': { left: '8%', top: '50%' },
    '2,0': { left: '25%', top: '88%' },
    '2,1': { left: '50%', top: '88%' },
    '2,2': { left: '75%', top: '88%' },
    '1,1': { left: '92%', top: '50%' },
    '2,3': { left: '25%', top: '12%' },
    '2,4': { left: '50%', top: '12%' },
    '2,5': { left: '75%', top: '12%' }
  };

  const key = `${seat.position.x},${seat.position.y}` as keyof typeof positions;
  return { ...baseStyles, ...positions[key] };
});

const isSelected = computed(() => (seatId: string) => props.selectedSeatId === seatId);

const isBooked = computed(() => (seatId: string) => {
  const bookings = bookingStore.getBookingsForSeat(seatId, props.selectedDate);
  return bookings.length > 0;
});
</script>

<template>
  <div class="relative w-full h-[280px] bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
    <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[70%] h-[50%] bg-amber-800 dark:bg-amber-900 rounded-lg shadow-md">
      <div class="absolute inset-2 border border-amber-700 dark:border-amber-800 rounded opacity-50"></div>
    </div>

    <div
      v-for="seat in seats"
      :key="seat.id"
      class="absolute w-12 h-12 sm:w-14 sm:h-14 cursor-pointer transition-all duration-200"
      :style="seatStyle(seat)"
      @click="onSeatSelect(seat)"
    >
      <div
        class="w-full h-full flex items-center justify-center rounded-full border-2 relative"
        :class="[
          isSelected(seat.id)
            ? 'bg-blue-500 text-white border-blue-600'
            : isBooked(seat.id)
            ? 'bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-200 border-red-300 dark:border-red-700'
            : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-blue-50 dark:hover:bg-gray-600'
        ]"
      >
        <slot name="seat-content">
          {{ seat.name }}
        </slot>
      </div>
    </div>
  </div>
</template>