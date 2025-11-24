import bcrypt from 'bcryptjs';
import { employees } from '../data/database';
import { generateToken, requireAuth } from '../auth/middleware';
import { EmployeeInput } from '../models/Employee';

interface Context {
  user?: {
    id: string;
    email: string;
    role: 'admin' | 'employee';
  };
}

export const authResolvers = {
  Query: {
    me: (_: any, __: any, context: Context) => {
      const user = requireAuth(context);
      const employee = employees.find((e) => e.id === user.id);
      
      if (!employee) {
        throw new Error('User not found');
      }

      // Don't return password
      const { password, ...employeeWithoutPassword } = employee;
      return employeeWithoutPassword;
    },
  },

  Mutation: {
    login: async (_: any, { email, password }: { email: string; password: string }) => {
      const employee = employees.find((e) => e.email === email);

      if (!employee) {
        throw new Error('Invalid credentials');
      }

      const isValid = await bcrypt.compare(password, employee.password);

      if (!isValid) {
        throw new Error('Invalid credentials');
      }

      const token = generateToken({
        id: employee.id,
        email: employee.email,
        role: employee.role,
      });

      const { password: _loginPass, ...employeeWithoutPassword } = employee;

      return {
        token,
        user: employeeWithoutPassword,
      };
    },

    register: async (_: any, { input }: { input: EmployeeInput }) => {
      // Check if email already exists
      const existingEmployee = employees.find((e) => e.email === input.email);

      if (existingEmployee) {
        throw new Error('Email already registered');
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(input.password, 10);

      // Create new employee
      const newEmployee = {
        id: String(employees.length + 1),
        ...input,
        password: hashedPassword,
        role: input.role as 'admin' | 'employee',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      employees.push(newEmployee);

      const token = generateToken({
        id: newEmployee.id,
        email: newEmployee.email,
        role: newEmployee.role,
      });

      const { password: _registerPass, ...employeeWithoutPassword } = newEmployee;

      return {
        token,
        user: employeeWithoutPassword,
      };
    },
  },
};

