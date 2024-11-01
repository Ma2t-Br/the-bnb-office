<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useBookingStore } from '../stores/bookingStore';
import type { Seat } from '../types';
import Cookies from 'js-cookie';
import BookingForm from '../components/BookingForm.vue';
import { 
  HomeModernIcon, 
  BeakerIcon,
  AcademicCapIcon 
} from '@heroicons/vue/24/outline';

const selectedSeat = ref<Seat | null>(null);
const userName = ref(Cookies.get('userName') || '');
const selectedDate = ref(new Date().toISOString().split('T')[0]);
const startTime = ref('09:00');
const endTime = ref('17:00');

const bookingStore = useBookingStore();

const meetingRooms: Seat[] = [
  { id: 'kitchen', name: 'Cuisine', type: 'kitchen' },
  { id: 'mattKlox', name: 'Matt&Klox', type: 'mattKlox' },
  { id: 'thibs', name: 'Thibs', type: 'thibs' },
];

const getRoomIcon = (type: string) => {
  switch (type) {
    case 'kitchen':
      return BeakerIcon;
    case 'mattKlox':
      return AcademicCapIcon;
    case 'thibs':
      return HomeModernIcon;
    default:
      return HomeModernIcon;
  }
};

const selectRoom = (room: Seat) => {
  selectedSeat.value = room;
};

const saveUserName = () => {
  if (userName.value) {
    Cookies.set('userName', userName.value, { expires: 365 });
  }
};

const bookRoom = async () => {
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
      <div class="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
        <div class="grid grid-cols-1 gap-3">
          <div
            v-for="room in meetingRooms"
            :key="room.id"
            class="cursor-pointer"
            @click="selectRoom(room)"
          >
            <div
              class="flex items-center gap-3 p-4 border rounded-lg transition-all duration-200"
              :class="[
                selectedSeat?.id === room.id
                  ? 'bg-blue-500 text-white border-blue-600'
                  : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-blue-50 dark:hover:bg-gray-600'
              ]"
            >
              <component
                :is="getRoomIcon(room.type)"
                class="w-6 h-6 flex-shrink-0"
              />
              <div class="flex-1">
                <h3 class="font-medium">{{ room.name }}</h3>
                <p class="text-sm opacity-75">1 place</p>
              </div>
            </div>
          </div>
        </div>
      </div>

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
        :on-book="bookRoom"
      />
    </div>
  </div>
</template>