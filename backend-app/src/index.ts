import { PrismaClient } from "./generated/client"
import express from "express"

const app = express()
export type Express = typeof express
export type ExpressApplication = typeof app
const prisma = new PrismaClient()

async function main() {
  (await import("./server")).default(prisma, app, express)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })