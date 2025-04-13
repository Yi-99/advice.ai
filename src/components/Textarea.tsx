"use client";
import React, { useState, useEffect } from 'react';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

export default function Textarea({ 
  name, 
  id, 
  shouldReset = false,
	isChat = false,
}: { 
  name: string; 
  id: string; 
  shouldReset?: boolean,
	isChat?: boolean, 
}) {
  const [value, setValue] = useState('');
  const [charCount, setCharCount] = useState(0);
  
  // Reset when the shouldReset prop changes to true
  useEffect(() => {
    if (shouldReset) {
      setValue('');
      setCharCount(0);
    }
  }, [shouldReset]);
  
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    setCharCount(newValue.length);
  };

	const handleSubmit = () => {
		
	}
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="flex flex-col space-y-2">        
        <textarea
          id={id}
          name={name}
          value={value}
          onChange={handleChange}
          placeholder="Type your message here..."
          className="w-full px-4 py-3 text-black dark:text-white border-2 border-gray-300 dark:border-gray-800 rounded-lg focus:outline-none focus:ring-2 dark:focus:ring-gray-300 focus:border-transparent min-h-[200px] resize-y transition duration-200"
          rows={8}
        />
        
        <div className="flex justify-between items-center text-sm text-gray-500">
          <p>Character count: {charCount}</p>
          <div className="flex space-x-2">
            <button 
              onClick={(e) => { e.preventDefault(); setValue(''); setCharCount(0);}}
              className="px-3 py-1 text-gray-600 bg-gray-100 rounded hover:bg-gray-200 transition cursor-pointer"
            >
              Clear
            </button>
						{isChat && (
							<button 
								onClick={(e) => { e.preventDefault(); handleSubmit();}}
								className="px-3 py-1 text-gray-600 bg-gray-100 rounded hover:bg-gray-200 transition cursor-pointer"
							>
								<ArrowUpwardIcon />
							</button>
						)}
          </div>
        </div>
      </div>
    </div>
  );
}