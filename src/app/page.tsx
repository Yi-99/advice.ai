import { prisma } from "@/lib/db";
import ClientForm from "@/components/ClientForm";
import Link from "next/link";

type State = {
  success?: boolean;
  error?: string;
};

export default function Home() {
  const initialState: State = {};

  async function createAdvisor(prevState: State, formData: FormData): Promise<State> {
    "use server";

    try {
      const name = formData.get('name') as string;
      const config = formData.get('config') as string;

      if (!name || !config) {
        return { error: "Name and config are required" };
      }

      await prisma.advisor.create({
        data: {
          name: name,
          config: config,
        }
      });

      return { success: true };
    } catch (error) {
      return { error: "Failed to create advisor" };
    }
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-3xl font-bold">
        Advisor.AI
      </h1>
      <ClientForm createAdvisor={createAdvisor} />
			<Link href="/advisor" className="text-black bg-white border-white border p-2 rounded-md transition-colors hover:bg-black hover:text-white hover:border-white hover:border">Go to Advisors</Link>
    </div>
  );
}
