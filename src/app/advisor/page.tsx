import { prisma } from "@/lib/db";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function Home() {
	const advisors = await prisma.advisor.findMany();

	advisors.forEach((a) => {
		console.log(a.data);
	})

	return (
		<div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
			<h1 className="text-3xl font-bold">
				Total # of Advisors: {advisors.length}
			</h1>
			<div className="flex flex-col justify-center items-center gap-8">
				{
					advisors.map((advisor: any) => (
						<Link key={advisor.id} href={`/advisor/${advisor.name}`} className="text-center max-h-[500px] gap-4 flex flex-col justify-center items-center shadow-md shadow-gray-800">
							<Image
								data={advisor.data}
								alt={advisor.name}
								width={200}
								height={200}
								/>
							<h2 className="text-xl">{advisor.name}</h2>
							<p className="text-lg"></p>
						</Link>
					))
				}
			</div>
		</div>
	);
}

export interface ImageProps {
	data: string;
	alt: string;
	width: number;
	height: number;
}

function Image({ data, alt, width, height }: ImageProps) {
	return (
			<img
				className="object-cover w-[300px] max-h-[300px] rounded-full"
				src={`data:image/jpeg;base64,${data}`}
				alt={alt}
				width={width}
				height={height}
			/>
	);
}