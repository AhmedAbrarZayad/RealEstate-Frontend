# 🏡 Real Estate Management System

A modern, full-stack real estate platform built with the **MERN stack**, enabling users to browse, search, list properties, and manage their real estate portfolio with advanced analytics and admin controls.

## 🚀 Live Demo

**Frontend:** https://neon-cendol-9e4ab4.netlify.app/  
**Backend API:** https://realestate-jet-chi.vercel.app/

## 📋 Overview

This is a comprehensive Real Estate Management System that connects property buyers, sellers, and administrators. The application features property listings, user dashboards with analytics, review systems, and a powerful admin panel for platform management. Built with modern technologies and best practices, it provides an intuitive and responsive user experience.

## 🛠️ Technologies Used

### Frontend
- **React** (v18) - UI library
- **Vite** - Lightning-fast build tool
- **React Router DOM** (v6) - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations
- **Recharts** - Data visualization
- **Firebase** (v10) - Authentication
- **Headless UI** - Accessible components
- **React Icons** - Icon library
- **React Toastify** - Notifications

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Firebase Admin SDK** - Authentication
- **CORS** - Cross-origin support

## ✨ Core Features

### 🔐 Authentication & Authorization
- Email/password authentication with Firebase
- Google OAuth integration
- Role-based access control (User/Admin)
- Protected routes and persistent sessions

### 🏠 Property Management
- Browse properties with advanced search and filters
- Sort by price, date, and popularity
- Detailed property views with galleries
- Add, edit, and delete properties
- Property categorization (Sale/Rent)
- Location-based filtering

### ⭐ Review & Rating System
- Star-based property ratings
- Detailed text reviews
- Edit and manage own reviews
- Property-specific review display
- User review history

### 📊 Analytics Dashboard
- Personal statistics overview
- Property performance metrics
- Monthly activity charts (views, inquiries)
- Property distribution visualization
- Revenue tracking
- Trend indicators with percentage changes

### 👤 Profile Management
- User profile customization
- Role display (User/Admin)
- Account information
- Member since tracking

### 🛡️ Admin Panel
- System-wide statistics
- User management dashboard
- Property oversight (view/delete any property)
- Review moderation
- Platform health monitoring
- Tabbed interface for data organization

### 🎨 UI/UX Features
- Dark mode with theme toggle
- Fully responsive (mobile-first design)
- Smooth page transitions
- Dynamic hero sections
- Sticky navigation
- Loading states and error boundaries
- Toast notifications

## 📦 Key Dependencies

### Frontend
```json
{
  "firebase": "^10.7.1",
  "framer-motion": "^10.16.16",
  "react": "^18.2.0",
  "react-router-dom": "^6.21.0",
  "react-toastify": "^9.1.3",
  "recharts": "^2.10.3",
  "tailwindcss": "^3.4.0"
}
```

### Backend
```json
{
  "express": "^4.18.2",
  "mongodb": "^6.3.0",
  "firebase-admin": "^12.0.0",
  "cors": "^2.8.5"
}
```

## 🚀 Local Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB account
- Firebase project

### Backend Setup

1. **Navigate to Backend directory**
   ```bash
   cd Backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create `.env` file**
   ```env
   PORT=4000
   MONGODB_URI=your_mongodb_connection_string
   MONGODB_PASS=your_mongodb_password
   FB_SERVICE_KEY=your_base64_encoded_firebase_key
   NODE_ENV=development
   ```

4. **Start the server**
   ```bash
   node index.js
   ```
   Server runs on `http://localhost:4000`

### Frontend Setup

1. **Navigate to RealEstate directory**
   ```bash
   cd RealEstate
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create `.env` file**
   ```env
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

4. **Update API configuration**
   - Open `src/config/api.js`
   - Set backend URL (default: `http://localhost:4000`)

5. **Start development server**
   ```bash
   npm run dev
   ```
   Application runs on `http://localhost:5173`

6. **Build for production**
   ```bash
   npm run build
   ```

## 📁 Project Structure

```
Assignment/
├── Backend/
│   ├── index.js              # Main server file
│   ├── encode.js             # Firebase key encoder
│   ├── package.json
│   └── .env                  # Environment variables
│
└── RealEstate/
    ├── public/
    │   └── _redirects        # Netlify config
    ├── src/
    │   ├── assets/           # Images
    │   ├── auth/             # Auth context
    │   ├── components/       # React components
    │   ├── config/           # Configuration
    │   ├── context/          # React contexts
    │   ├── pages/            # Page layouts
    │   ├── router/           # Routing
    │   ├── App.jsx
    │   └── main.jsx
    ├── package.json
    └── tailwind.config.js
```

## 🎯 Main Routes

| Route | Description | Access |
|-------|-------------|--------|
| `/` | Home page | Public |
| `/all-properties` | Browse properties | Public |
| `/property/:id` | Property details | Private |
| `/add-property` | Add new property | Private (User) |
| `/my-properties` | Manage properties | Private (User) |
| `/my-ratings` | User reviews | Private (User) |
| `/dashboard` | Analytics | Private (User) |
| `/profile` | User profile | Private (User) |
| `/admin` | Admin panel | Private (Admin) |
| `/login` | Login | Public |
| `/signup` | Register | Public |

## 🔐 User Roles

### Regular User
- Browse and search properties
- Add, edit, delete own properties
- Leave and manage reviews
- Access personal dashboard and analytics

### Admin
- All user permissions
- View all users and properties
- Delete any property or review
- Access system-wide statistics
- Platform management tools

## 📱 Responsive Design

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🎨 Color Palette

- **Primary**: Blue (#3b82f6)
- **Secondary**: Purple (#7c3aed)
- **Success**: Green (#10b981)
- **Warning**: Orange (#f59e0b)
- **Error**: Red (#ef4444)

## 🔒 Security Features

- JWT token authentication
- Role-based access control
- Protected API routes
- CORS configuration
- MongoDB injection prevention
- Email verification for operations

## 📝 API Highlights

### Public Endpoints
- Get all properties with filters
- Property details
- Property reviews

### Protected Endpoints
- User CRUD operations
- Property management
- Review system
- Dashboard analytics

### Admin Endpoints
- User management
- Property moderation
- Review oversight
- System statistics

## 🚀 Deployment

### Frontend (Netlify)
1. Build: `npm run build`
2. Deploy `dist` folder
3. Add environment variables
4. Configure redirects

### Backend (Vercel)
1. Connect repository
2. Add environment variables
3. Deploy automatically

## 🐛 Known Issues

None at the moment. Feel free to report issues!

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/NewFeature`
3. Commit changes: `git commit -m 'Add NewFeature'`
4. Push: `git push origin feature/NewFeature`
5. Open Pull Request

## 📄 License

MIT License

## 📞 Contact

For questions or support, please contact the development team.

---

**Built with ❤️ using MERN Stack**
