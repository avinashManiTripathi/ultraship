export const typeDefs = `#graphql
  type Employee {
    id: ID!
    name: String!
    email: String!
    age: Int!
    class: String!
    subjects: [String!]!
    attendance: Float!
    role: String!
    department: String!
    joinDate: String!
    phone: String!
    address: String!
    salary: Float
    createdAt: String!
    updatedAt: String!
  }

  type AuthPayload {
    token: String!
    user: Employee!
  }

  type PaginatedEmployees {
    employees: [Employee!]!
    totalCount: Int!
    page: Int!
    pageSize: Int!
    totalPages: Int!
  }

  enum SortField {
    name
    age
    class
    attendance
    joinDate
    salary
  }

  enum SortOrder {
    asc
    desc
  }

  input EmployeeFilter {
    name: String
    class: String
    department: String
    minAge: Int
    maxAge: Int
    minAttendance: Float
    maxAttendance: Float
  }

  input EmployeeInput {
    name: String!
    email: String!
    password: String!
    age: Int!
    class: String!
    subjects: [String!]!
    attendance: Float!
    role: String!
    department: String!
    joinDate: String!
    phone: String!
    address: String!
    salary: Float
  }

  input UpdateEmployeeInput {
    name: String
    email: String
    age: Int
    class: String
    subjects: [String!]
    attendance: Float
    role: String
    department: String
    phone: String
    address: String
    salary: Float
  }

  type Query {
    # Get all employees with optional filters
    employees(filter: EmployeeFilter): [Employee!]!
    
    # Get single employee by ID
    employee(id: ID!): Employee
    
    # Get employees with pagination and sorting
    employeesPaginated(
      page: Int = 1
      pageSize: Int = 10
      sortField: SortField = name
      sortOrder: SortOrder = asc
      filter: EmployeeFilter
    ): PaginatedEmployees!
    
    # Get current user
    me: Employee
  }

  type Mutation {
    # Authentication
    login(email: String!, password: String!): AuthPayload!
    register(input: EmployeeInput!): AuthPayload!
    
    # Employee management (admin only)
    addEmployee(input: EmployeeInput!): Employee!
    updateEmployee(id: ID!, input: UpdateEmployeeInput!): Employee!
    deleteEmployee(id: ID!): Boolean!
    
    # Self-update (employee can update own profile)
    updateMyProfile(input: UpdateEmployeeInput!): Employee!
  }
`;

