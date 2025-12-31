# Hotel Booking Mobile App

A modern, mobile-first hotel booking application built with React. This is a **frontend-only** application that works completely offline using localStorage for data persistence.

## 🎯 Features

### User Features
- ✅ User authentication (Login/Signup) using localStorage
- ✅ Browse hotels with beautiful card layouts
- ✅ View hotel details with amenities
- ✅ Browse available rooms for each hotel
- ✅ Date selection (check-in/check-out) with automatic price calculation
- ✅ Guest selection
- ✅ Dummy payment system (enter exact amount to confirm)
- ✅ Booking confirmation screen
- ✅ View booking history with status (upcoming/active/completed)

### Admin Features
- ✅ Admin dashboard with statistics
- ✅ Manage hotels (Add/Edit/Delete)
- ✅ Manage rooms (Add/Edit/Delete)
- ✅ View all bookings
- ✅ View all users

## 📱 Mobile-First Design

This app is designed to look and feel like a **native mobile application** even when opened on desktop:
- Fixed mobile width (390px max)
- Centered on desktop with dark background
- No horizontal scrolling
- Zoom disabled
- Android mobile app aesthetic

## 🚀 Getting Started

### Prerequisites
- Node.js installed on your system

### Installation

1. The project is already set up in this directory
2. Dependencies are already installed

### Running the App

```bash
npm run dev
```

The app will open at `http://localhost:5173/`

## 🔑 Demo Credentials

### User Account
- **Email:** user@test.com
- **Password:** password123

### Admin Account
- **Email:** admin@test.com
- **Password:** admin123

## 💾 Data Storage

All data is stored in **localStorage**:
- `users` - User accounts
- `hotels` - Hotel information
- `rooms` - Room details
- `bookings` - Booking records
- `currentUser` - Currently logged-in user

## 🎨 Tech Stack

- **React** - UI framework
- **React Router** - Navigation
- **Vite** - Build tool
- **localStorage** - Data persistence
- **CSS** - Styling (no external UI libraries)

## 📂 Project Structure

```
src/
├── pages/
│   ├── Login.jsx              # Login page
│   ├── Signup.jsx             # Signup page
│   ├── Home.jsx               # Hotel listing
│   ├── HotelDetail.jsx        # Hotel details
│   ├── RoomDetail.jsx         # Room booking
│   ├── Payment.jsx            # Payment screen
│   ├── BookingSuccess.jsx     # Confirmation
│   ├── MyBookings.jsx         # User bookings
│   └── admin/
│       ├── AdminDashboard.jsx # Admin home
│       ├── ManageHotels.jsx   # Hotel CRUD
│       ├── ManageRooms.jsx    # Room CRUD
│       ├── ViewBookings.jsx   # All bookings
│       └── ViewUsers.jsx      # All users
├── utils/
│   └── storage.js             # localStorage utilities
├── App.jsx                    # Main app with routing
├── main.jsx                   # Entry point
└── index.css                  # Global styles
```

## 🎯 User Flow

1. **Login/Signup** → User creates account or logs in
2. **Browse Hotels** → View available hotels
3. **Hotel Details** → See hotel info and rooms
4. **Select Room** → Choose a room type
5. **Pick Dates** → Select check-in/check-out dates
6. **Payment** → Enter exact amount to confirm
7. **Success** → View booking confirmation
8. **My Bookings** → See all bookings

## 👨‍💼 Admin Flow

1. **Admin Login** → Login with admin credentials
2. **Dashboard** → View statistics
3. **Manage Hotels** → Add/Edit/Delete hotels
4. **Manage Rooms** → Add/Edit/Delete rooms
5. **View Bookings** → See all customer bookings
6. **View Users** → See all registered users

## 🎨 Design Features

- Clean, modern UI with card-based layouts
- Gradient backgrounds
- Smooth shadows and transitions
- Status badges (upcoming/active/completed)
- Mobile-optimized bottom navigation
- Responsive forms
- Empty states
- Loading states

## 🔒 No Backend Required

This app runs entirely in the browser:
- ❌ No Firebase
- ❌ No API calls
- ❌ No real payment processing
- ✅ Works offline
- ✅ All data in localStorage
- ✅ Dummy data included

## 📝 Notes

- The payment system is a dummy implementation - just enter the exact total amount shown
- All images use placeholder URLs (Unsplash)
- Data persists in localStorage until cleared
- Refresh the page to reset data (or clear localStorage)

## 🛠️ Development

To build for production:
```bash
npm run build
```

To preview production build:
```bash
npm run preview
```

---

**Enjoy your hotel booking experience! 🏨**
