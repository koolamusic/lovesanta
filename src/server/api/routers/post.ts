import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { matchParticipant, rematchParticipant } from "~/server/methods";

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

  fetchGiverEnrollment: protectedProcedure
    .input(
      z.object({
        eventId: z.string().min(1),
      }),
    )
    .query(async ({ ctx, input }) => {
      //  fetch the user from the database based on session data

      const user = await ctx.db.user.findFirstOrThrow({
        where: {
          id: ctx.session.user.id,
        },
      });

      // fetch the participant data

      const giver = await ctx.db.participant.findFirstOrThrow({
        where: {
          eventId: input.eventId,
          userId: user.id,
        },
        include: {
          user: true,
          event: true,
        },
      });

      // fetch giver match

      const match = await ctx.db.match.findFirstOrThrow({
        where: {
          eventId: input.eventId,
          giverId: giver.id,
        },
      });

      /**
       * @operation to update the match every time we query it
       * Ideally we should have created a model called viewCount
       *
       * Which will then act as the buffer for how many times this data
       * has been queried
       */
      await ctx.db.match.update({
        where: {
          id: match.id,
        },
        data: {
          updatedAt: new Date(),
        },
      });

      // fetch receiver profile from match information
      const receiver = await ctx.db.participant.findFirstOrThrow({
        where: {
          id: match.receiverId,
        },
        include: {
          user: true,
        },
      });

      const history = await ctx.db.matchHistory.findMany({
        where: {
          giverUserId: giver.userId,
          eventId: input.eventId,
        },
        include: {
          receiver: true,
        },
      });

      return {
        isNewPair: match.createdAt === match.updatedAt,
        attemptCount: history.length,
        participants: {
          giver,
          receiver,
        },
        metadata: {
          history,
          matchInfo: match,
          event: giver.event,
        },
      };
    }),

  enrollForEvent: protectedProcedure
    .input(
      z.object({
        eventId: z.string().min(1),
        userId: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const event = await ctx.db.participant.findFirst({
        where: {
          eventId: input.eventId,
          userId: input.userId,
        },
      });

      const user = await ctx.db.user.findFirstOrThrow({
        where: {
          id: input.userId,
        },
      });

      if (!event) {
        return await ctx.db.participant.create({
          data: {
            eventId: input.eventId,
            userId: input.userId,
            hasJoined: true,
            region: user.region,
            wishlist: user.bio,
            budget: 100,
          },
        });
      }

      return event;
    }),

  generateNewPair: protectedProcedure
    .input(
      z.object({
        eventId: z.string().min(1),
        participantId: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const match = await ctx.db.match.findFirst({
        where: {
          eventId: input.eventId,
          giverId: input.participantId,
        },
      });

      if (!match) {
        const participant = await ctx.db.participant.findFirstOrThrow({
          where: {
            id: input.participantId,
          },
        });

        return await matchParticipant({
          participant,
          prisma: ctx.db,
          eventId: input.eventId,
        });
      }

      return match;
    }),

  regenerateGiverPair: protectedProcedure
    .input(
      z.object({
        eventId: z.string().min(1),
        participantId: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {

      const participant = await ctx.db.participant.findFirstOrThrow({
        where: {
          id: input.participantId,
        },
      });

     return rematchParticipant({
        prisma: ctx.db,
        eventId: input.eventId,
        participant: participant,
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
