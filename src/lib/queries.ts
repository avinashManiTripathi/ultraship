import { gql } from '@apollo/client';

export const GET_EMPLOYEES_PAGINATED = gql`
  query GetEmployeesPaginated(
    $page: Int
    $pageSize: Int
    $sortField: SortField
    $sortOrder: SortOrder
    $filter: EmployeeFilter
  ) {
    employeesPaginated(
      page: $page
      pageSize: $pageSize
      sortField: $sortField
      sortOrder: $sortOrder
      filter: $filter
    ) {
      employees {
        id
        name
        email
        age
        class
        subjects
        attendance
        role
        department
        joinDate
        phone
        address
        salary
        createdAt
        updatedAt
      }
      totalCount
      page
      pageSize
      totalPages
    }
  }
`;

export const GET_EMPLOYEE = gql`
  query GetEmployee($id: ID!) {
    employee(id: $id) {
      id
      name
      email
      age
      class
      subjects
      attendance
      role
      department
      joinDate
      phone
      address
      salary
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_EMPLOYEE = gql`
  mutation DeleteEmployee($id: ID!) {
    deleteEmployee(id: $id)
  }
`;

export const ADD_EMPLOYEE = gql`
  mutation AddEmployee($input: EmployeeInput!) {
    addEmployee(input: $input) {
      id
      name
      email
      age
      class
      department
      role
    }
  }
`;

export const UPDATE_EMPLOYEE = gql`
  mutation UpdateEmployee($id: ID!, $input: UpdateEmployeeInput!) {
    updateEmployee(id: $id, input: $input) {
      id
      name
      email
      age
      class
      subjects
      attendance
      role
      department
      joinDate
      phone
      address
      salary
      updatedAt
    }
  }
`;

