export const constant = {
    ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 4000,
  URI: process.env.URL || 'http://localhost:3000',
  MONGODB_URL:
    process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/EventScheduler',
  JWT_SECRET: process.env.JWT_SECRET || 'dog**&&unning***GrassyField$$$Sunny%%%ay!!!',
}