import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
}

export default function Button({ text, className = '', ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={`bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition ${className}`}
    >
      {text}
    </button>
  );
}
