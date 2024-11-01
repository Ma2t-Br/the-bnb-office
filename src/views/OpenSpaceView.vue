<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useBookingStore } from '../stores/bookingStore';
import type { Seat } from '../types';
import Cookies from 'js-cookie';
import TableLayout from '../components/TableLayout.vue';
import BookingForm from '../components/BookingForm.vue';
import { UserCircleIcon } from '@heroicons/vue/24/outline';

const selectedSeat = ref<Seat | null>(null);
const userName = ref(Cookies.get('userName') || '');
const selectedDate = ref(new Date().toISOString().split('T')[0]);
const startTime = ref('09:00');
const endTime = ref('17:00');

const bookingStore = useBookingStore();

const mainTableSeats: Seat[] = [
  { id: 'seat1', name: 'P1', type: 'mainTable', position: { x: 0, y: 1 } },
  { id: 'seat2', name: 'P2', type: 'mainTable', position: { x: 2, y: 0 } },
  { id: 'seat3', name: 'P3', type: 'mainTable', position: { x: 2, y: 1 } },
  { id: 'seat4', name: 'P4', type: 'mainTable', position: { x: 2, y: 2 } },
  { id: 'seat5', name: 'P5', type: 'mainTable', position: { x: 1, y: 1 } },
  { id: 'seat6', name: 'P6', type: 'mainTable', position: { x: 2, y: 3 } },
  { id: 'seat7', name: 'P7', type: 'mainTable', position: { x: 2, y: 4 } },
  { id: 'seat8', name: 'P8', type: 'mainTable', position: { x: 2, y: 5 } },
];

const selectSeat = (seat: Seat) => {
  selectedSeat.value = seat;
};

const saveUserName = () => {
  if (userName.value) {
    Cookies.set('userName', userName.value, { expires: 365 });
  }
};

const bookSeat = async () => {
  if (!selectedSeat.value || !userName.value) return;
  
  try {
    await bookingStore.addBooking({
      userName: userName.value,
      date: selectedDate.value,
      startTime: startTime.value,
      endTime: endTime.value,
      seatId: selectedSeat.value.id,
      roomType: selectedSeat.value.type
    });
    
    saveUserName();
    selectedSeat.value = null;
  } catch (error) {
    console.error('Erreur lors de la réservation:', error);
  }
};

watch(selectedDate, () => {
  bookingStore.fetchBookings(selectedDate.value);
});

onMounted(() => {
  bookingStore.fetchBookings(selectedDate.value);
});
</script>

<template>
  <div class="max-w-lg mx-auto p-3">
    <div class="mb-3 flex gap-2">
      <input
        v-model="userName"
        type="text"
        placeholder="Votre nom"
        class="flex-1 p-2 border rounded text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        @blur="saveUserName"
      />
      <input
        v-model="selectedDate"
        type="date"
        class="p-2 border rounded text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      />
    </div>

    <div class="space-y-3">
      <TableLayout
        :seats="mainTableSeats"
        :selected-seat-id="selectedSeat?.id ?? null"
        :on-seat-select="selectSeat"
        :selected-date="selectedDate"
      >
        <template #seat-content>
          <UserCircleIcon class="w-6 h-6" />
        </template>
      </TableLayout>

      <BookingForm
        v-if="selectedSeat"
        :selected-seat="selectedSeat"
        :user-name="userName"
        :start-time="startTime"
        :end-time="endTime"
        :selected-date="selectedDate"
        @update:user-name="userName = $event"
        @update:start-time="startTime = $event"
        @update:end-time="endTime = $event"
        :on-book="bookSeat"
      />
    </div>
  </div>
</template>