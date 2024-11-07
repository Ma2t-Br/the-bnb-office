<script setup lang="ts">
import type { Booking } from '../types';
import { computed, ref } from 'vue';

const props = defineProps<{
  bookings: Booking[];
}>();

const TIMELINE_START = 8;
const TIMELINE_END = 19;
const TIMELINE_HOURS = TIMELINE_END - TIMELINE_START;

const colorPalette = [
  { bg: 'bg-blue-200', text: 'text-blue-700', darkBg: 'dark:bg-blue-900', darkText: 'dark:text-blue-200' },
  { bg: 'bg-green-200', text: 'text-green-700', darkBg: 'dark:bg-green-900', darkText: 'dark:text-green-200' },
  { bg: 'bg-purple-200', text: 'text-purple-700', darkBg: 'dark:bg-purple-900', darkText: 'dark:text-purple-200' },
  { bg: 'bg-yellow-200', text: 'text-yellow-700', darkBg: 'dark:bg-yellow-900', darkText: 'dark:text-yellow-200' },
  { bg: 'bg-pink-200', text: 'text-pink-700', darkBg: 'dark:bg-pink-900', darkText: 'dark:text-pink-200' },
  { bg: 'bg-indigo-200', text: 'text-indigo-700', darkBg: 'dark:bg-indigo-900', darkText: 'dark:text-indigo-200' },
  { bg: 'bg-orange-200', text: 'text-orange-700', darkBg: 'dark:bg-orange-900', darkText: 'dark:text-orange-200' },
  { bg: 'bg-teal-200', text: 'text-teal-700', darkBg: 'dark:bg-teal-900', darkText: 'dark:text-teal-200' }
];

const showTooltip = ref(false);
const tooltipContent = ref('');
const tooltipPosition = ref({ x: 0, y: 0 });

const getPositionAndWidth = (booking: Booking) => {
  const [startHour, startMinute] = booking.startTime.split(':').map(Number);
  const [endHour, endMinute] = booking.endTime.split(':').map(Number);
  
  const startPosition = ((startHour + startMinute / 60) - TIMELINE_START) / TIMELINE_HOURS * 100;
  const endPosition = ((endHour + endMinute / 60) - TIMELINE_START) / TIMELINE_HOURS * 100;
  
  return {
    left: `${Math.round(startPosition)}%`,
    width: `${Math.round(endPosition - startPosition)}%`
  };
};

const getBookingColor = (index: number) => {
  return colorPalette[index % colorPalette.length];
};

const timeLabels = computed(() => {
  return Array.from({ length: TIMELINE_HOURS + 1 }, (_, i) => {
    const hour = TIMELINE_START + i;
    return `${hour}:00`;
  });
});

const sortedBookings = computed(() => {
  return [...props.bookings].sort((a, b) => a.startTime.localeCompare(b.startTime));
});

const handleBookingHover = (booking: Booking, event: MouseEvent) => {
  tooltipContent.value = `${booking.userName}: ${booking.startTime} - ${booking.endTime}`;
  tooltipPosition.value = {
    x: event.clientX,
    y: event.clientY
  };
  showTooltip.value = true;
};

const handleBookingLeave = () => {
  showTooltip.value = false;
};
</script>

<template>
  <div class="mb-4">
    <div class="relative h-12 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
      <!-- Time markers -->
      <div class="absolute inset-0 flex">
        <div
          v-for="(time, index) in timeLabels"
          :key="time"
          class="flex-1 border-l border-gray-300 dark:border-gray-700"
          :class="{ 'border-l-0': index === 0 }"
        >
          <div class="text-xs text-gray-500 dark:text-gray-400 pl-1">
            {{ time }}
          </div>
        </div>
      </div>

      <!-- Booking blocks -->
      <div
        v-for="(booking, index) in sortedBookings"
        :key="booking.id"
        class="absolute top-5 h-6 rounded cursor-pointer transition-colors duration-200"
        :class="[
          getBookingColor(index).bg,
          getBookingColor(index).darkBg
        ]"
        :style="getPositionAndWidth(booking)"
        @mousemove="handleBookingHover(booking, $event)"
        @mouseleave="handleBookingLeave"
        @click="handleBookingHover(booking, $event)"
      >
        <div 
          class="px-1 text-xs truncate transition-colors duration-200"
          :class="[
            getBookingColor(index).text,
            getBookingColor(index).darkText
          ]"
        >
          {{ booking.userName }}
        </div>
      </div>

      <!-- Tooltip -->
      <div
        v-if="showTooltip"
        class="fixed z-50 px-2 py-1 text-xs text-white bg-gray-800 dark:bg-gray-700 rounded shadow-lg pointer-events-none"
        :style="{
          left: `${tooltipPosition.x + 10}px`,
          top: `${tooltipPosition.y - 25}px`
        }"
      >
        {{ tooltipContent }}
      </div>
    </div>
  </div>
</template>