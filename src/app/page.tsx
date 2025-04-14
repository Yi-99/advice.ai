import { prisma } from "@/lib/db";
import ClientForm from "@/components/ClientForm";
import Link from "next/link";
import { createAdvisor, State } from "@/app/actions";

export default function Home() {
  const initialState: State = {};

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