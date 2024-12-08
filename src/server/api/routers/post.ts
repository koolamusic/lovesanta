import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: protectedProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.post.create({
        data: {
          name: input.name,
          createdBy: { connect: { id: ctx.session.user.id } },
        },
      });
    }),

  updateWishlist: protectedProcedure
    .input(z.object({ bio: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      const withExistingEvent = await ctx.db.participant.findFirst({
        where: {
          userId: ctx.session.user.id,
        },
      });

      if (withExistingEvent) {
        return ctx.db.participant.update({
          where: { id: withExistingEvent.id },
          data: {
            wishlist: input.bio,
          },
        });
      }
      return ctx.db.user.update({
        where: { id: ctx.session.user.id },
        data: {
          bio: input.bio,
        },
      });
    }),

  getLatest: protectedProcedure.query(async ({ ctx }) => {
    const post = await ctx.db.post.findFirst({
      orderBy: { createdAt: "desc" },
      where: { createdBy: { id: ctx.session.user.id } },
    });

    return post ?? null;
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
