// import { PrismaClient } from "@prisma/client";

// declare global {
//     var prisma: PrismaClient | undefined;
// };

// export const db = globalThis.prisma || new PrismaClient();

// if(process.env.NODE_ENV !== 'production') globalThis.prisma = db;


import { PrismaClient } from '@prisma/client'
import { PrismaLibSQL } from '@prisma/adapter-libsql'
import { createClient } from '@libsql/client'

// Create a new instance of the libSQL database client
const libsql = createClient({
  // @ts-expect-error
  url: process.env.NEXT_PUBLIC_DATABASE_URL,
  authToken: process.env.NEXT_PUBLIC_DATABASE_TOKEN 
})

// Create a Prisma "adapter" for libSQL
const adapter = new PrismaLibSQL(libsql)
// Pass the adapter option to the Prisma Client instance
// @ts-ignore
export const db = new PrismaClient({ adapter })
