import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
})

export const connectToDB = async () => {
  await prisma.$connect()
  console.log("Successfully connected to Database")
}

export const disconnectDB = async () => {
  try {
    await prisma.$disconnect()

    const msg = "Succesfully disconnected from Database"

    return [null, msg] as const
  } catch (error) {
    return [error, null] as const
  }
}

