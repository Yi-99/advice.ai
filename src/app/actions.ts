'use server';

import { prisma } from "@/lib/db";

export type State = {
  success?: boolean;
  error?: string;
};

export async function createAdvisor(prevState: State, formData: FormData): Promise<State> {
  try {
    const name = formData.get('name') as string;
    const config = formData.get('config') as string;
    const data = formData.get('base64') as string;

    if (!name || !config) {
      return { error: "Name and config are required" };
    }

    await prisma.advisor.create({
      data: {
        name: name,
        config: config,
        data: data,
      }
    });

    return { success: true };
  } catch (error) {
    return { error: "Failed to create advisor" };
  }
}