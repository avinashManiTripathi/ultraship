import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

interface JWTPayload {
  id: string;
  email: string;
  role: 'admin' | 'employee';
}

export function generateToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function authenticateToken(token: string): JWTPayload | null {
  try {
    if (!token || !token.startsWith('Bearer ')) {
      return null;
    }
    
    const actualToken = token.replace('Bearer ', '');
    const decoded = jwt.verify(actualToken, JWT_SECRET) as JWTPayload;
    return decoded;
  } catch (error) {
    return null;
  }
}

export function requireAuth(context: { user?: JWTPayload }) {
  if (!context.user) {
    throw new Error('Authentication required');
  }
  return context.user;
}

export function requireAdmin(context: { user?: JWTPayload }) {
  const user = requireAuth(context);
  if (user.role !== 'admin') {
    throw new Error('Admin access required');
  }
  return user;
}

