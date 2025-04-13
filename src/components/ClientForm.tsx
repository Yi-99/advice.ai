"use client";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { useState, useEffect } from "react";
import Textarea from "@/components/Textarea";

type State = {
  success?: boolean;
  error?: string;
};

export default function ClientForm({ 
  createAdvisor 
}: { 
  createAdvisor: (prevState: State, formData: FormData) => Promise<State>
}) {
  const [state, formAction] = useActionState(createAdvisor, {});
  const [nameValue, setNameValue] = useState("");
  const [resetTextarea, setResetTextarea] = useState(false);
  
  // Reset the form when submission is successful
  useEffect(() => {
    if (state.success) {
      setNameValue("");
      setResetTextarea(true);
      // Reset the flag after a brief delay
      setTimeout(() => setResetTextarea(false), 100);
    }
  }, [state.success]);

  return (
    <form className="flex flex-col gap-4 w-1/2 justify-center items-stretch" action={formAction}>     
      <label htmlFor="name" className="text-xl">Name: </label>
      <input
        className="border-2 border-gray-800 rounded-md p-2 !focus:ring-gray-300 focus:ring-2"
        type="text"
        placeholder="Socrates"
        name="name"
        id="name"
        value={nameValue}
        onChange={(e) => setNameValue(e.target.value)}
        required
      />
      
      <label htmlFor="config" className="text-xl">Description: </label>
      <Textarea name="config" id="config" shouldReset={resetTextarea} />
      
      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  
  return (
    <button
      className="w-1/2 self-center bg-white text-black font-bold rounded-md p-2 cursor-pointer transition-colors hover:bg-black hover:text-white hover:border-white hover:border disabled:opacity-50"
      type="submit"
      disabled={pending}
    >
      {pending ? 'Creating...' : 'Create'}
    </button>
  );
}