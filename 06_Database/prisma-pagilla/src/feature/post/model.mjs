import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const postFindMany = async () => prisma.film_post.findMany({});
export const postFindOne = async (post_id) => prisma.film_post.findUnique({
  where: {
    post_id
  }
});
export const postCreateOne = async (post) =>  prisma.film_post.create({
  data: post
});
export const postUpdateOne = async (id, post) =>  prisma.film_post.update({
  where: {
    post_id: id
  },
  data: post
});
export const postDeleteOne = async (post_id) => prisma.film_post.delete({
  where: {
    post_id
  }
});
