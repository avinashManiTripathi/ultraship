# UltraShip - Employee Management System

A modern, full-stack employee management system built with **Next.js**, **GraphQL**, **Apollo Server**, and **TypeScript**.

## ✨ Features

### Frontend
- 🎨 **Beautiful & Modern UI** with TailwindCSS v4
- 🍔 **Hamburger Menu** with one-level deep sub-menus
- 📊 **Horizontal Navigation** with quick access items
- 📋 **Grid View** displaying 10+ employee data columns
- 🎴 **Tile View** showing key employee information with smooth animations
- 🔍 **Detail View** with expandable modal for complete employee information
- 🔄 **Seamless Toggle** between grid and tile views
- 🎯 **Options Menu** (Edit, Flag, Delete) for each employee
- 🔐 **Authentication** with JWT tokens
- 📱 **Fully Responsive** design for all devices
- ⚡ **Performance Optimized** with pagination and lazy loading

### Backend
- 🚀 **GraphQL API** with Apollo Server
- 🔒 **Authentication & Authorization** using JWT
- 👥 **Role-Based Access Control** (Admin & Employee)
- 📄 **Pagination & Sorting** for efficient data handling
- 🔍 **Advanced Filtering** by department, age, attendance, etc.
- 🎯 **CRUD Operations** for employee management
- 💾 **In-Memory Database** (easily replaceable with PostgreSQL/MongoDB)
- 📊 **12+ Sample Employees** with realistic data

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd ultraship

# Install dependencies
npm install
```

### Running the Application

#### Option 1: Run Both Together (Recommended - Single Command)
```bash
npm run dev
```
This will start both the backend (port 4000) and frontend (port 3000) simultaneously!

#### Option 2: Run Separately
**Terminal 1 - Backend:**
```bash
npm run backend
```
The GraphQL server will start at: `http://localhost:4000`

**Terminal 2 - Frontend:**
```bash
npm run frontend
```
The Next.js app will start at: `http://localhost:3000`

### Default Login Credentials

**Admin Account:**
- Email: `admin@ultraship.com`
- Password: `admin123`
- Access: Full CRUD operations

**Employee Account:**
- Email: `john.smith@ultraship.com`
- Password: `employee123`
- Access: View-only (can update own profile)

## 📁 Project Structure

```
ultraship/
├── backend/                  # GraphQL API Server
│   ├── auth/                # Authentication middleware
│   ├── data/                # Database (in-memory)
│   ├── models/              # TypeScript interfaces
│   ├── resolvers/           # GraphQL resolvers
│   ├── schema.ts            # GraphQL schema definitions
│   ├── server.ts            # Apollo Server setup
│   └── index.ts             # Entry point
│
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── dashboard/       # Dashboard page
│   │   ├── layout.tsx       # Root layout with providers
│   │   ├── page.tsx         # Login page
│   │   └── globals.css      # Global styles
│   │
│   ├── components/          # React components
│   │   ├── HamburgerMenu.tsx    # Sidebar navigation
│   │   ├── HorizontalMenu.tsx   # Top navigation
│   │   ├── LoginForm.tsx        # Authentication form
│   │   ├── EmployeeGrid.tsx     # Table view
│   │   ├── EmployeeTiles.tsx    # Card view
│   │   └── EmployeeDetail.tsx   # Detail modal
│   │
│   ├── contexts/            # React contexts
│   │   └── AuthContext.tsx  # Authentication state
│   │
│   └── lib/                 # Utilities
│       ├── apollo-client.ts # Apollo Client setup
│       └── queries.ts       # GraphQL queries
│
└── package.json
```

## 🎯 Key Features Demonstrated

### Frontend Requirements ✅
- [x] Hamburger menu with one-level sub-menu
- [x] Horizontal menu with sample items
- [x] Grid view with 10+ columns of employee data
- [x] Tile view with essential fields
- [x] Options button (bun button) with edit/flag/delete
- [x] Detailed view on tile click
- [x] Navigation back to tile/grid view
- [x] Connected to GraphQL API

### Backend Requirements ✅
- [x] GraphQL API with Apollo Server
- [x] Employee data model (ID, name, age, class, subjects, attendance, etc.)
- [x] Queries: List with filters, single employee, pagination
- [x] Mutations: Add, update, delete employees
- [x] Pagination & Sorting implementation
- [x] Authentication with JWT
- [x] Role-based authorization (admin/employee)
- [x] Performance considerations

## 🔧 Technology Stack

### Frontend
- **Next.js 16** - React framework
- **React 19** - UI library
- **TypeScript** - Type safety
- **TailwindCSS v4** - Styling
- **Apollo Client** - GraphQL client
- **Lucide React** - Icons

### Backend
- **Apollo Server** - GraphQL server
- **GraphQL** - API query language
- **TypeScript** - Type safety
- **JWT** - Authentication
- **bcryptjs** - Password hashing

## 📊 API Documentation

Access the GraphQL Playground at `http://localhost:4000` when the backend is running.

### Sample Queries

**Get All Employees:**
```graphql
query {
  employees {
    id
    name
    email
    department
    attendance
  }
}
```

**Get Paginated Employees:**
```graphql
query {
  employeesPaginated(page: 1, pageSize: 10, sortField: name) {
    employees {
      id
      name
      email
      department
    }
    totalCount
    totalPages
  }
}
```

**Login:**
```graphql
mutation {
  login(email: "admin@ultraship.com", password: "admin123") {
    token
    user {
      id
      name
      role
    }
  }
}
```

See [backend/README.md](backend/README.md) for complete API documentation.

## 🎨 Design Highlights

- **Modern Gradient UI** with smooth transitions
- **Glass-morphism effects** for depth
- **Micro-interactions** for better UX
- **Responsive grid system** adapting to all screen sizes
- **Custom animations** for engaging user experience
- **Color-coded attendance** indicators
- **Department badges** with distinct colors
- **Beautiful modal overlays** with backdrop blur

## 🚀 Performance Optimizations

1. **Pagination** - Load data in chunks
2. **Query Optimization** - Fetch only required fields
3. **Client-side Caching** - Apollo Client InMemoryCache
4. **Lazy Loading** - Load components on demand
5. **Memoization** - Prevent unnecessary re-renders
6. **Efficient Filtering** - Filter on client-side for instant results
7. **Optimistic UI** - Immediate feedback on actions

## 🔐 Security Features

- JWT-based authentication
- Password hashing with bcryptjs
- Role-based access control
- Protected GraphQL mutations
- Secure HTTP headers
- Input validation

## 📝 Scripts

```bash
# Development
npm run dev          # Start BOTH backend + frontend (recommended!)
npm run frontend     # Start Next.js dev server only
npm run backend      # Start GraphQL server only

# Production
npm run build        # Build Next.js app
npm run start        # Start production server
npm run backend:prod # Start GraphQL server (production)

# Utilities
npm run lint         # Run ESLint
```

## 🌐 Deployment

### Frontend (Vercel)
```bash
vercel deploy
```

### Backend (Railway/Heroku)
```bash
# Add DATABASE_URL to environment variables
# Deploy using platform CLI
```

## 📸 Screenshots

*(Add screenshots of your application here)*

## 🤝 Contributing

This is a demo project for interview purposes. Feel free to fork and modify as needed.

## 📄 License

MIT License - feel free to use this project for learning purposes.

## 👨‍💻 Author

Built with ❤️ for UltraShip Interview

---

**Note:** This is a demonstration project showcasing full-stack development skills, clean code architecture, beautiful UI design, and scalable GraphQL API implementation.
