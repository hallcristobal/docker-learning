import { PrismaClient } from "../generated/client";
import { Router } from "express";

export default function ApiRouter(prisma: PrismaClient) {
  const router = Router()

  router.get("/users", async (_req, res) => {
    const users = await prisma.user.findMany()
    res.json({ users })
  })

  router.get("/posts", async (req, res) => {
    const userId = typeof req.query.userId === "string" ? parseInt(req.query.userId) : undefined
    const posts = await prisma.post.findMany({
      where: {
        authorId: userId && !isNaN(userId) ? userId : undefined
      },
      include: { author: true }
    })
    res.json({ posts })
  })

  router.get("/feed", async (_req, res) => {
    const posts = await prisma.post.findMany({
      where: { published: true },
      include: { author: true }
    })

    res.json({ posts })
  })

  router.post("/post", async (req, res) => {
    const { title, content, authorEmail } = req.body
    const result = await prisma.post.create({
      data: {
        title,
        content,
        published: false,
        author: { connect: { email: authorEmail } }
      }
    })

    res.json(result)
  })

  router.put('/publish/:id', async (req, res) => {
    const { id } = req.params
    const post = await prisma.post.update({
      where: { id: Number(id) },
      data: { published: true },
    })
    res.json(post)
  })

  return router
}