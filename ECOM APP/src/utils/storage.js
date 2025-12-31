// LocalStorage utility functions

// Initialize default data
export const initializeData = () => {
  if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify([
      {
        id: '1',
        email: 'user@test.com',
        password: 'password123',
        name: 'John Doe',
        phone: '1234567890',
        role: 'user'
      },
      {
        id: '2',
        email: 'admin@test.com',
        password: 'admin123',
        name: 'Admin User',
        phone: '9876543210',
        role: 'admin'
      }
    ]));
  }

  if (!localStorage.getItem('hotels')) {
    localStorage.setItem('hotels', JSON.stringify([
      {
        id: '1',
        name: 'Grand Plaza Hotel',
        location: 'New York, USA',
        description: 'Experience luxury at its finest in the heart of Manhattan. Our 5-star hotel offers world-class amenities and breathtaking city views.',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
        startingPrice: 299,
        amenities: ['WiFi', 'Pool', 'Gym', 'Restaurant', 'Spa', 'Parking']
      },
      {
        id: '2',
        name: 'Seaside Resort',
        location: 'Miami Beach, USA',
        description: 'Relax and unwind at our beachfront paradise. Enjoy stunning ocean views and premium hospitality.',
        image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800',
        startingPrice: 249,
        amenities: ['WiFi', 'Beach Access', 'Pool', 'Restaurant', 'Bar']
      },
      {
        id: '3',
        name: 'Mountain View Lodge',
        location: 'Aspen, Colorado',
        description: 'Escape to the mountains and enjoy cozy comfort with spectacular alpine views.',
        image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800',
        startingPrice: 199,
        amenities: ['WiFi', 'Fireplace', 'Ski Storage', 'Restaurant', 'Hot Tub']
      },
      {
        id: '4',
        name: 'Urban Boutique Hotel',
        location: 'San Francisco, USA',
        description: 'Modern design meets classic comfort in the heart of the city.',
        image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
        startingPrice: 179,
        amenities: ['WiFi', 'Gym', 'Rooftop Bar', 'Parking']
      }
    ]));
  }

  if (!localStorage.getItem('rooms')) {
    localStorage.setItem('rooms', JSON.stringify([
      // Grand Plaza Hotel rooms
      {
        id: 'r1',
        hotelId: '1',
        type: 'Deluxe Room',
        price: 299,
        description: 'Spacious room with king bed and city view',
        image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800',
        capacity: 2
      },
      {
        id: 'r2',
        hotelId: '1',
        type: 'Executive Suite',
        price: 499,
        description: 'Luxury suite with separate living area',
        image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
        capacity: 4
      },
      // Seaside Resort rooms
      {
        id: 'r3',
        hotelId: '2',
        type: 'Ocean View Room',
        price: 249,
        description: 'Beautiful ocean view with private balcony',
        image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800',
        capacity: 2
      },
      {
        id: 'r4',
        hotelId: '2',
        type: 'Beach Villa',
        price: 399,
        description: 'Private villa with direct beach access',
        image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800',
        capacity: 4
      },
      // Mountain View Lodge rooms
      {
        id: 'r5',
        hotelId: '3',
        type: 'Cozy Cabin',
        price: 199,
        description: 'Rustic charm with mountain views',
        image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800',
        capacity: 2
      },
      {
        id: 'r6',
        hotelId: '3',
        type: 'Alpine Suite',
        price: 299,
        description: 'Luxury suite with fireplace and panoramic views',
        image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800',
        capacity: 3
      },
      // Urban Boutique Hotel rooms
      {
        id: 'r7',
        hotelId: '4',
        type: 'Modern Room',
        price: 179,
        description: 'Contemporary design with city views',
        image: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800',
        capacity: 2
      },
      {
        id: 'r8',
        hotelId: '4',
        type: 'Penthouse Suite',
        price: 349,
        description: 'Top floor luxury with rooftop access',
        image: 'https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800',
        capacity: 4
      }
    ]));
  }

  if (!localStorage.getItem('bookings')) {
    localStorage.setItem('bookings', JSON.stringify([]));
  }
};

// User functions
export const getUsers = () => {
  return JSON.parse(localStorage.getItem('users') || '[]');
};

export const addUser = (user) => {
  const users = getUsers();
  users.push(user);
  localStorage.setItem('users', JSON.stringify(users));
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('currentUser') || 'null');
};

export const setCurrentUser = (user) => {
  localStorage.setItem('currentUser', JSON.stringify(user));
};

export const logout = () => {
  localStorage.removeItem('currentUser');
};

// Hotel functions
export const getHotels = () => {
  return JSON.parse(localStorage.getItem('hotels') || '[]');
};

export const getHotelById = (id) => {
  const hotels = getHotels();
  return hotels.find(hotel => hotel.id === id);
};

export const addHotel = (hotel) => {
  const hotels = getHotels();
  hotels.push(hotel);
  localStorage.setItem('hotels', JSON.stringify(hotels));
};

export const updateHotel = (id, updatedHotel) => {
  const hotels = getHotels();
  const index = hotels.findIndex(hotel => hotel.id === id);
  if (index !== -1) {
    hotels[index] = { ...hotels[index], ...updatedHotel };
    localStorage.setItem('hotels', JSON.stringify(hotels));
  }
};

export const deleteHotel = (id) => {
  const hotels = getHotels();
  const filtered = hotels.filter(hotel => hotel.id !== id);
  localStorage.setItem('hotels', JSON.stringify(filtered));
  
  // Also delete associated rooms
  const rooms = getRooms();
  const filteredRooms = rooms.filter(room => room.hotelId !== id);
  localStorage.setItem('rooms', JSON.stringify(filteredRooms));
};

// Room functions
export const getRooms = () => {
  return JSON.parse(localStorage.getItem('rooms') || '[]');
};

export const getRoomsByHotelId = (hotelId) => {
  const rooms = getRooms();
  return rooms.filter(room => room.hotelId === hotelId);
};

export const getRoomById = (id) => {
  const rooms = getRooms();
  return rooms.find(room => room.id === id);
};

export const addRoom = (room) => {
  const rooms = getRooms();
  rooms.push(room);
  localStorage.setItem('rooms', JSON.stringify(rooms));
};

export const updateRoom = (id, updatedRoom) => {
  const rooms = getRooms();
  const index = rooms.findIndex(room => room.id === id);
  if (index !== -1) {
    rooms[index] = { ...rooms[index], ...updatedRoom };
    localStorage.setItem('rooms', JSON.stringify(rooms));
  }
};

export const deleteRoom = (id) => {
  const rooms = getRooms();
  const filtered = rooms.filter(room => room.id !== id);
  localStorage.setItem('rooms', JSON.stringify(filtered));
};

// Booking functions
export const getBookings = () => {
  return JSON.parse(localStorage.getItem('bookings') || '[]');
};

export const getBookingsByUserId = (userId) => {
  const bookings = getBookings();
  return bookings.filter(booking => booking.userId === userId);
};

export const addBooking = (booking) => {
  const bookings = getBookings();
  bookings.push(booking);
  localStorage.setItem('bookings', JSON.stringify(bookings));
  return booking;
};

export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};
