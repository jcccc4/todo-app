import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
async function getPosts() {
    const posts = await prisma.post.findMany();
    where: {
      published: true;
    }
    include: {
      author: {
        select: {
          name: true;
        }
      }
    }
    return posts;
  }
export default prisma;