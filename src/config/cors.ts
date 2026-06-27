import type { CorsOptions } from "cors";

const allowedOrigins = ['http://example.com', 'http://localhost:3001'];

const corsOptions: CorsOptions = {
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }

  }
}


export { corsOptions }
