import { z } from "zod";

import { publicProcedure, router } from "./trpc";
import { prisma } from "@/lib/db";

export const appRouter = router({
  getAdvisors: publicProcedure.query(async () => {
    return await prisma.advisor.findMany();
  }),
  createAdvisor: publicProcedure.input(z.object({
		name: z.string(),
		config: z.string(),
		data: z.string(),
	})).mutation(async (opts) => {
    await prisma.advisor.create({
			data: {
				name: opts.input.name,
				config: opts.input.name,
				data: opts.input.name,
			}
		});
    return true;
  }),
	askAdvisor: publicProcedure.input(z.object({
		name: z.string(),
		history: z.string(),
		prompt: z.string(),
	})).mutation(async (opts) => {
		await prisma.prompt.create({
			data: {
				content: opts.input.prompt,
				history: opts.input.history,
				name: opts.input.name,
			}
		})
	})
});

export type AppRouter = typeof appRouter;