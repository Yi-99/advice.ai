export default function AdvisorPage({ params }: { params: { name: string } }) {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
			<h1 className="text-3xl font-bold">Advisor: {params.name}</h1>
			<p className="text-lg">This is the advisor page for {params.name}.</p>
			{/* Add more content here */}
		</div>
	)
}