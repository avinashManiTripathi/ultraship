# UltraShip Backend - GraphQL API

## Overview
A GraphQL API built with Apollo Server for managing employee data with authentication and role-based access control.

## Features
- **GraphQL API** with Apollo Server
- **Authentication & Authorization** using JWT
- **Role-based Access Control** (Admin & Employee)
- **Pagination & Sorting** for queries
- **Filtering** capabilities
- **Performance Optimizations**

## Getting Started

### Run the Backend
```bash
npm run backend
```

The server will start at: `http://localhost:4000`

### Default Credentials
- **Admin**: `admin@ultraship.com` / `admin123`
- **Employee**: `john.smith@ultraship.com` / `employee123`

## GraphQL Schema

### Queries

#### Get all employees (with optional filters)
```graphql
query {
  employees(filter: {
    name: "John"
    department: "Engineering"
    minAge: 25
    maxAge: 35
  }) {
    id
    name
    email
    age
    department
    attendance
  }
}
```

#### Get single employee
```graphql
query {
  employee(id: "1") {
    id
    name
    email
    age
    class
    subjects
    attendance
    department
  }
}
```

#### Get paginated employees with sorting
```graphql
query {
  employeesPaginated(
    page: 1
    pageSize: 10
    sortField: name
    sortOrder: asc
    filter: { department: "Engineering" }
  ) {
    employees {
      id
      name
      department
      attendance
    }
    totalCount
    page
    pageSize
    totalPages
  }
}
```

#### Get current user
```graphql
query {
  me {
    id
    name
    email
    role
  }
}
```

### Mutations

#### Login
```graphql
mutation {
  login(email: "admin@ultraship.com", password: "admin123") {
    token
    user {
      id
      name
      email
      role
    }
  }
}
```

#### Register
```graphql
mutation {
  register(input: {
    name: "New Employee"
    email: "new@ultraship.com"
    password: "password123"
    age: 30
    class: "Mid-Level"
    subjects: ["Development", "Testing"]
    attendance: 95.0
    role: "employee"
    department: "Engineering"
    joinDate: "2024-01-01"
    phone: "+1-555-0120"
    address: "123 Main St"
    salary: 80000
  }) {
    token
    user {
      id
      name
      email
    }
  }
}
```

#### Add Employee (Admin only)
```graphql
mutation {
  addEmployee(input: {
    name: "Jane Doe"
    email: "jane@ultraship.com"
    password: "password123"
    age: 28
    class: "Mid-Level"
    subjects: ["Marketing", "Sales"]
    attendance: 96.5
    role: "employee"
    department: "Marketing"
    joinDate: "2024-01-15"
    phone: "+1-555-0125"
    address: "456 Oak Ave"
    salary: 75000
  }) {
    id
    name
    email
  }
}
```

#### Update Employee (Admin only)
```graphql
mutation {
  updateEmployee(id: "2", input: {
    name: "John Smith Updated"
    attendance: 97.0
  }) {
    id
    name
    attendance
  }
}
```

#### Delete Employee (Admin only)
```graphql
mutation {
  deleteEmployee(id: "2")
}
```

#### Update My Profile (Self-update)
```graphql
mutation {
  updateMyProfile(input: {
    phone: "+1-555-9999"
    address: "New Address"
  }) {
    id
    name
    phone
    address
  }
}
```

## Authentication

To access protected routes, include the JWT token in the Authorization header:

```
Authorization: Bearer YOUR_JWT_TOKEN
```

### Permission Levels

- **Public**: `login`, `register`
- **Authenticated**: `employees`, `employee`, `employeesPaginated`, `me`, `updateMyProfile`
- **Admin Only**: `addEmployee`, `updateEmployee`, `deleteEmployee`

## Performance Considerations

1. **In-Memory Database**: For demonstration, uses in-memory storage. In production, use PostgreSQL/MongoDB
2. **Pagination**: Implements cursor-based pagination to handle large datasets
3. **Field Filtering**: GraphQL allows clients to request only needed fields
4. **Indexing**: In production, add database indexes on frequently queried fields
5. **Caching**: Consider implementing Redis for caching frequently accessed data
6. **Query Complexity**: Limit query depth and complexity to prevent abuse

