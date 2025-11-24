# Deployment Guide

This guide explains how to deploy the UltraShip Employee Management System to production.

## Prerequisites

- GitHub account
- Vercel account (for frontend)
- Railway/Heroku account (for backend)
- PostgreSQL database (optional, for production)

## Frontend Deployment (Vercel)

### Option 1: Vercel CLI

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Login to Vercel**
```bash
vercel login
```

3. **Deploy**
```bash
cd ultraship
vercel
```

4. **Set Environment Variables**
```bash
vercel env add NEXT_PUBLIC_GRAPHQL_URL
# Enter your production GraphQL URL
```

5. **Deploy to Production**
```bash
vercel --prod
```

### Option 2: Vercel Dashboard

1. Visit [vercel.com](https://vercel.com)
2. Click "Import Project"
3. Connect your GitHub repository
4. Configure:
   - Framework Preset: Next.js
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `.next`
5. Add Environment Variables:
   - `NEXT_PUBLIC_GRAPHQL_URL`: Your backend GraphQL URL
6. Click "Deploy"

## Backend Deployment

### Option 1: Railway

1. **Install Railway CLI**
```bash
npm install -g @railway/cli
```

2. **Login**
```bash
railway login
```

3. **Initialize Project**
```bash
railway init
```

4. **Create Dockerfile**
Create `Dockerfile` in the backend directory:

```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 4000

CMD ["npm", "run", "backend:prod"]
```

5. **Deploy**
```bash
railway up
```

6. **Set Environment Variables**
```bash
railway variables set JWT_SECRET=your-super-secret-key-change-this
railway variables set PORT=4000
```

### Option 2: Heroku

1. **Install Heroku CLI**
```bash
npm install -g heroku
```

2. **Login**
```bash
heroku login
```

3. **Create App**
```bash
heroku create ultraship-backend
```

4. **Add Procfile**
Create `Procfile` in root:
```
web: npm run backend:prod
```

5. **Set Environment Variables**
```bash
heroku config:set JWT_SECRET=your-super-secret-key
heroku config:set NODE_ENV=production
```

6. **Deploy**
```bash
git push heroku main
```

### Option 3: Docker + AWS/DigitalOcean

1. **Create Docker Compose**
Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  backend:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "4000:4000"
    environment:
      - JWT_SECRET=${JWT_SECRET}
      - DATABASE_URL=${DATABASE_URL}
    restart: always

  postgres:
    image: postgres:15
    environment:
      - POSTGRES_DB=ultraship
      - POSTGRES_USER=admin
      - POSTGRES_PASSWORD=${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: always

volumes:
  postgres_data:
```

2. **Deploy to Server**
```bash
# SSH into your server
ssh user@your-server.com

# Clone repository
git clone your-repo-url
cd ultraship

# Set environment variables
export JWT_SECRET="your-secret"
export DB_PASSWORD="your-password"

# Start services
docker-compose up -d
```

## Database Setup (Production)

### PostgreSQL on Railway

1. **Add PostgreSQL Service**
```bash
railway add postgresql
```

2. **Get Connection String**
```bash
railway variables
# Copy DATABASE_URL
```

3. **Update Backend Code**
Replace the in-memory database with PostgreSQL:

```typescript
// backend/data/database.ts
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

export async function initializeDatabase() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS employees (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      age INTEGER,
      class VARCHAR(100),
      subjects JSONB,
      attendance DECIMAL(5,2),
      role VARCHAR(50),
      department VARCHAR(100),
      join_date DATE,
      phone VARCHAR(50),
      address TEXT,
      salary DECIMAL(10,2),
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    );
  `);

  // Insert sample data
  // ...
}
```

4. **Install PostgreSQL Driver**
```bash
npm install pg
npm install --save-dev @types/pg
```

## Environment Variables

### Frontend (.env.local)
```env
NEXT_PUBLIC_GRAPHQL_URL=https://your-backend-url.com
```

### Backend (.env)
```env
JWT_SECRET=your-super-secret-jwt-key-change-in-production
DATABASE_URL=postgresql://user:password@host:5432/database
PORT=4000
NODE_ENV=production
```

## SSL/HTTPS Setup

### Using Vercel (Automatic)
- Vercel provides automatic HTTPS
- Custom domains get free SSL certificates

### Using Nginx (Self-hosted)

1. **Install Nginx**
```bash
sudo apt update
sudo apt install nginx
```

2. **Configure Nginx**
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /graphql {
        proxy_pass http://localhost:4000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

3. **Install SSL with Let's Encrypt**
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

## CI/CD Pipeline

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '20'
      - run: npm install
      - run: npm run build
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID}}
          vercel-project-id: ${{ secrets.PROJECT_ID}}

  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm install
      - name: Deploy to Railway
        run: railway up
        env:
          RAILWAY_TOKEN: ${{ secrets.RAILWAY_TOKEN }}
```

## Health Checks

### Backend Health Endpoint

Add to `backend/server.ts`:

```typescript
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});
```

### Monitoring Setup

1. **UptimeRobot**
   - Monitor: https://your-app.com/health
   - Alert on downtime

2. **Sentry (Error Tracking)**
```bash
npm install @sentry/nextjs @sentry/node
```

3. **LogRocket (Session Replay)**
```bash
npm install logrocket
```

## Performance Optimization

### Enable Compression
```typescript
import compression from 'compression';
app.use(compression());
```

### Enable CORS
```typescript
import cors from 'cors';
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));
```

### Rate Limiting
```typescript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/graphql', limiter);
```

## Backup Strategy

### Database Backups
```bash
# Daily backup cron job
0 2 * * * pg_dump $DATABASE_URL > /backups/db_$(date +\%Y\%m\%d).sql
```

### Automated Backups on Railway
- Railway provides automatic daily backups
- Retention: 7 days (free tier)

## Scaling Considerations

### Horizontal Scaling
- Deploy multiple backend instances
- Use load balancer (Nginx, AWS ALB)
- Session management with Redis

### Vertical Scaling
- Increase server resources
- Optimize database queries
- Add database read replicas

## Post-Deployment Checklist

- [ ] Environment variables set correctly
- [ ] SSL certificate installed
- [ ] Database migrations run
- [ ] Health checks passing
- [ ] Error tracking configured
- [ ] Monitoring alerts set up
- [ ] Backup strategy in place
- [ ] CDN configured (if using)
- [ ] DNS records updated
- [ ] Performance testing completed
- [ ] Security audit passed
- [ ] Documentation updated

## Rollback Strategy

### Vercel
```bash
# List deployments
vercel ls

# Rollback to previous deployment
vercel rollback [deployment-url]
```

### Railway
```bash
# List deployments
railway status

# Rollback
railway rollback
```

## Support

For deployment issues:
1. Check server logs
2. Verify environment variables
3. Test GraphQL endpoint
4. Check database connection
5. Review Vercel/Railway logs

## Production URLs

After deployment, update:
- Frontend: https://your-app.vercel.app
- Backend: https://your-backend.railway.app
- GraphQL Playground: https://your-backend.railway.app/graphql

---

**Congratulations!** Your UltraShip application is now live! 🚀

