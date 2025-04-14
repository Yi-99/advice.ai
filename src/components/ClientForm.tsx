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
  const [file, setFile] = useState<File | null>(null);
  const [base64string, setBase64String] = useState<string | null>(null);
	const [value, setValue] = useState('');
  
  // Reset the form when submission is successful
  useEffect(() => {
    if (state.success) {
      setNameValue("");
      setResetTextarea(true);
      // Reset the flag after a brief delay
      setTimeout(() => setResetTextarea(false), 100);
      setFile(null);
      setBase64String(null);
    }
  }, [state.success]);

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      
      fileReader.onload = () => {
        const result = typeof fileReader.result === 'string' ? fileReader.result.split(',')[1] : '';
        resolve(result);
      };
      
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setFile(file);
      try {
        const base64 = await convertToBase64(file);
        setBase64String(base64);
      } catch (error) {
        console.error("Error converting file to base64:", error);
      }
    }
  };

  return (
    <form className="flex flex-col gap-4 w-1/2 justify-center items-stretch" action={formAction}>     
      <label htmlFor="name" className="text-xl">Name: </label>
      <input
        className="border-2 border-gray-300 focus:outline-none dark:border-gray-800 rounded-md p-2 focus:ring-gray-800 dark:focus:ring-gray-300 focus:ring-2"
        type="text"
        placeholder="Socrates"
        name="name"
        id="name"
        value={nameValue}
        onChange={(e) => setNameValue(e.target.value)}
        required
      />
      
      <label htmlFor="config" className="text-xl">Description: </label>
      <Textarea name="config" id="config" value={value} setValue={setValue} shouldReset={resetTextarea} />

      <label htmlFor="image" className="text-xl">Image: </label>
      <input
        className="w-1/2 border-2 border-gray-300 focus:outline-none dark:border-gray-800 rounded-md p-2 focus:ring-gray-800 dark:focus:ring-gray-300 focus:ring-2"
        type="file"
        name="image"
        id="image"
        onChange={handleChange}
        required
      />

      {base64string && (
        <>
          <input type="hidden" name="base64" value={base64string} />
          <div>
            <p>Preview:</p>
            <img 
              src={`data:image/jpeg;base64,${base64string}`} 
              alt="Uploaded file preview" 
              className="max-w-[300px] max-h-[300px] rounded-full"
              loading="lazy"
            />
          </div>
        </>
      )}
      
      <SubmitButton nameValue={nameValue} value={value} />
    </form>
  );
}

function SubmitButton({nameValue, value}: {nameValue: string, value: string}) {
  const { pending } = useFormStatus();
  
  return (
    <button
      className="w-1/2 self-center bg-white text-black border-2 border-gray-500 dark:border-none font-bold rounded-md p-2 cursor-pointer transition-colors hover:bg-black hover:text-white hover:border-white hover:border disabled:opacity-50"
      type="submit"
      disabled={pending || !nameValue || !value}
    >
      {pending ? 'Creating...' : 'Create'}
    </button>
  );
}