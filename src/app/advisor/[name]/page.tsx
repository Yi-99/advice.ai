"use client";
import Textarea from "@/components/Textarea";
import { use, useState } from 'react';

type Params = Promise<{ name: string }>

export default function AdvisorPage(props: { params: Params }) {
	const [value, setValue] = useState('');
	const params = use(props.params);
	const name = decodeURIComponent(params.name);

	return (
		<div className="flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
			<h1 className="text-3xl font-bold">Advisor: {name}</h1>
			<p className="text-lg">This is the advisor page for {name}.</p>
			<Textarea id="chat" name="chat" value={value} setValue={setValue} shouldReset={false} isChat={true}/>
		</div>
	)
}