# 🚀 Quick Start Guide

Get the UltraShip Employee Management System running in 5 minutes!

## 📋 Prerequisites

- Node.js 18 or higher
- npm or yarn
- A terminal/command prompt

## ⚡ Quick Setup

### 1️⃣ Install Dependencies

```bash
npm install
```

This installs all required packages for both frontend and backend.

### 2️⃣ Start the Backend

Open a terminal and run:

```bash
npm run backend
```

You should see:
```
✅ Database initialized with 12 employees
🔐 Admin credentials: admin@ultraship.com / admin123
🔐 Employee credentials: john.smith@ultraship.com / employee123
🚀 Server ready at: http://localhost:4000
📊 GraphQL Playground: http://localhost:4000
```

**Keep this terminal running!**

### 3️⃣ Start the Frontend

Open a **NEW** terminal and run:

```bash
npm run dev
```

You should see:
```
   ▲ Next.js 16.0.3
   - Local:        http://localhost:3000
   - Environments: .env.local

 ✓ Starting...
 ✓ Ready in 2.5s
```

### 4️⃣ Open Your Browser

Visit: **http://localhost:3000**

## 🔐 Login

### Admin Account (Full Access)
- **Email**: `admin@ultraship.com`
- **Password**: `admin123`

**Capabilities:**
- ✅ View all employees
- ✅ Add new employees
- ✅ Update any employee
- ✅ Delete employees

### Employee Account (Limited Access)
- **Email**: `john.smith@ultraship.com`
- **Password**: `employee123`

**Capabilities:**
- ✅ View all employees
- ✅ Update own profile
- ❌ Cannot add/delete employees

## 🎯 What to Try

1. **Login** with either admin or employee account
2. **Toggle Views** between Grid and Tile layouts
3. **Search** for employees by name, email, or department
4. **Filter** by department
5. **Sort** by different fields (name, age, attendance)
6. **Click** on any employee to view full details
7. **Use Options Menu** (three dots) for actions
8. **Navigate** using hamburger menu and horizontal tabs
9. **Test Permissions** - Try to delete as employee vs admin

## 📂 Project Structure

```
ultraship/
├── backend/           # GraphQL API
│   ├── server.ts     # Apollo Server
│   ├── schema.ts     # GraphQL Schema
│   ├── resolvers/    # Query & Mutation handlers
│   └── data/         # Sample data
│
├── src/
│   ├── app/          # Next.js pages
│   ├── components/   # React components
│   ├── contexts/     # State management
│   └── lib/          # Utilities
│
└── Documentation
    ├── README.md          # Overview
    ├── QUICKSTART.md      # This file
    ├── FEATURES.md        # Feature list
    ├── PERFORMANCE.md     # Optimizations
    └── DEPLOYMENT.md      # Deploy guide
```

## 🛠️ Common Issues

### Port Already in Use

**Backend (Port 4000):**
```bash
# Kill process on port 4000
lsof -ti:4000 | xargs kill -9

# Or use a different port
PORT=4001 npm run backend
```

**Frontend (Port 3000):**
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or Next.js will auto-assign next available port
```

### Cannot Connect to Backend

Make sure:
1. Backend is running on port 4000
2. Check terminal for errors
3. Verify GraphQL endpoint: http://localhost:4000

### Login Not Working

1. Check backend console for errors
2. Open browser DevTools (F12) > Console
3. Verify network requests
4. Clear localStorage and try again:
   ```javascript
   localStorage.clear()
   location.reload()
   ```

## 📊 Test the GraphQL API

Open **http://localhost:4000** in your browser to access GraphQL Playground.

### Sample Query
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

### Sample Mutation (Login)
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

## 🎨 UI Features to Explore

- **🍔 Hamburger Menu** - Click top-left icon on mobile
- **📊 Grid View** - Table with 10+ columns
- **🎴 Tile View** - Beautiful card layout
- **🔍 Search** - Real-time filtering
- **⚙️ Filters** - Department, sorting options
- **📄 Detail View** - Click any employee
- **⋮ Options Menu** - Three dots on each card/row
- **📱 Responsive** - Try on different screen sizes

## 🚀 Next Steps

1. **Explore the Code**
   - Check `src/components/` for UI components
   - Review `backend/resolvers/` for API logic
   - Look at `backend/schema.ts` for data structure

2. **Read Documentation**
   - [FEATURES.md](./FEATURES.md) - Complete feature list
   - [PERFORMANCE.md](./PERFORMANCE.md) - Optimization strategies
   - [DEPLOYMENT.md](./DEPLOYMENT.md) - Deploy to production

3. **Customize**
   - Add more employee fields
   - Create new views
   - Implement additional features

4. **Deploy**
   - Deploy frontend to Vercel
   - Deploy backend to Railway/Heroku
   - Set up production database

## 📚 Additional Resources

- **Next.js**: https://nextjs.org/docs
- **GraphQL**: https://graphql.org/learn/
- **Apollo Server**: https://www.apollographql.com/docs/apollo-server/
- **TailwindCSS**: https://tailwindcss.com/docs

## ❓ Need Help?

Check the comprehensive documentation:
- README.md - Project overview
- FEATURES.md - All features explained
- DEPLOYMENT.md - Production deployment
- PERFORMANCE.md - Optimization details

## 🎉 You're All Set!

Enjoy exploring the UltraShip Employee Management System!

---

**Built with ❤️ using Next.js, GraphQL, and TypeScript**

