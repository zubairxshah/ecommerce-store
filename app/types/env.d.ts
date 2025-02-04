declare global {
    namespace NodeJS {
      interface ProcessEnv {
        STRIPE_SECRET_KEY: string;
        STRIPE_WEBHOOK_SECRET: string;
        // other env variables...
      }
    }
  }
  
  export {}
  