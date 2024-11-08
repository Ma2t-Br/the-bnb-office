<script setup lang="ts">
import { computed } from 'vue';
import type { Seat } from '../types';
import { useBookingStore } from '../stores/bookingStore';
import TimelineView from './TimelineView.vue';

const props = defineProps<{
  selectedSeat: Seat | null;
  userName: string;
  startTime: string;
  endTime: string;
  selectedDate: string;
  onBook: () => void;
}>();

const bookingStore = useBookingStore();

const existingBookings = computed(() => {
  if (!props.selectedSeat || !props.selectedDate) return [];
  return bookingStore.getBookingsForSeat(props.selectedSeat.id, props.selectedDate);
});

const hasTimeConflict = computed(() => {
  const start = props.startTime;
  const end = props.endTime;
  
  return existingBookings.value.some(booking => {
    const bookingStart = booking.startTime;
    const bookingEnd = booking.endTime;
    
    return (
      (start >= bookingStart && start < bookingEnd) ||
      (end > bookingStart && end <= bookingEnd) ||
      (start <= bookingStart && end >= bookingEnd)
    );
  });
});

const isValidTimeRange = computed(() => {
  return props.startTime < props.endTime;
});

const isBookingValid = computed(() => {
  return props.userName && 
         isValidTimeRange.value && 
         !hasTimeConflict.value;
});
</script>

<template>
  <div class="p-3 bg-blue-50 dark:bg-blue-900 rounded-lg">
    <h3 class="text-base font-semibold mb-2 dark:text-white">
      Réserver {{ selectedSeat?.name }}
    </h3>
    
    <div v-if="existingBookings.length > 0" class="mb-3">
      <p class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        Périodes réservées :
      </p>
      <TimelineView :bookings="existingBookings" />
    </div>

    <div class="flex gap-2 mb-2">
      <div class="flex-1">
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Début</label>
        <input
          :value="startTime"
          @input="e => $emit('update:startTime', (e.target as HTMLInputElement).value)"
          type="time"
          class="w-full p-2 border rounded text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>
      <div class="flex-1">
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Fin</label>
        <input
          :value="endTime"
          @input="e => $emit('update:endTime', (e.target as HTMLInputElement).value)"
          type="time"
          class="w-full p-2 border rounded text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>
    </div>

    <div v-if="!isValidTimeRange" class="text-sm text-red-600 dark:text-red-400 mb-2">
      L'heure de fin doit être après l'heure de début
    </div>
    
    <div v-if="hasTimeConflict" class="text-sm text-red-600 dark:text-red-400 mb-2">
      Cette période chevauche une réservation existante
    </div>

    <button
      @click="onBook"
      class="w-full bg-blue-500 text-white px-4 py-2 rounded text-sm font-medium hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-blue-600 dark:hover:bg-blue-700"
      :disabled="!isBookingValid"
    >
      Réserver
    </button>
  </div>
</template>