export interface Booking {
  id?: string;
  userName: string;
  date: string;
  startTime: string;
  endTime: string;
  seatId: string;
  roomType: 'mainTable' | 'kitchen' | 'mattKlox' | 'thibs';
}

export interface Seat {
  id: string;
  name: string;
  type: 'mainTable' | 'kitchen' | 'mattKlox' | 'thibs';
  position?: {
    x: number;
    y: number;
  };
}