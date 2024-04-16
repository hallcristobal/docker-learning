import { PrismaClient } from "./generated/client";
import { ExpressApplication, Express } from ".";
import ApiRouter from "./routers/ApiRouter";

export default async function (prisma: PrismaClient, app: ExpressApplication, express: Express) {
  const PORT = process.env.EXPRESS_PORT || 8080
  app.use(express.json())

  app.use("/api", ApiRouter(prisma))
  const invalidEndpointRequested = (_req: any, res: any) => {
    res.status(500).json({ result: "ERROR", message: "Invalid endpoint requested" })
  }
  app.use("*", invalidEndpointRequested)

  app.listen(PORT, () => {
    console.log(`Listening on: ${PORT}`)
  })
}