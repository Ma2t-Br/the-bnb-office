import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { collection, addDoc, query, where, getDocs, Timestamp } from 'firebase/firestore';
import { db } from '../firebase';
import type { Booking } from '../types';

export const useBookingStore = defineStore('booking', () => {
  const bookings = ref<Booking[]>([]);
  const loading = ref(false);

  const fetchBookings = async (date: string) => {
    loading.value = true;
    try {
      const q = query(
        collection(db, 'bookings'),
        where('date', '==', date)
      );
      const querySnapshot = await getDocs(q);
      bookings.value = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Booking));
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      loading.value = false;
    }
  };

  const addBooking = async (booking: Omit<Booking, 'id'>) => {
    try {
      await addDoc(collection(db, 'bookings'), booking);
      await fetchBookings(booking.date);
    } catch (error) {
      console.error('Error adding booking:', error);
      throw error;
    }
  };

  const getBookingsForSeat = (seatId: string, date: string) => {
    return bookings.value.filter(b => b.seatId === seatId && b.date === date);
  };

  return {
    bookings,
    loading,
    fetchBookings,
    addBooking,
    getBookingsForSeat
  };
});