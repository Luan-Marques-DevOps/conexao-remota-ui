import React, { useState } from "react";

interface SelectProps {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
}

export function Select({ value, onValueChange, children }: SelectProps) {
    const [open, setOpen] = useState(false);

    return (
        <div className="relative">
          {React.Children.map(children, (child: any) => {
            if (child.type === SelectTrigger) {
              return React.cloneElement(child, {
                onClick: () => setOpen(!open),
              });
            }
    
            if (child.type === SelectContent && !open) {
              return null;
            }
    
            if (child.type === SelectContent && open) {
              return child;
            }
    
            if (child.type === SelectItem) {
              return React.cloneElement(child, {
                onClick: () => {
                  onValueChange(child.props.value);
                  setOpen(false);
                },
              });
            }
    
            return child;
          })}
        </div>
      );
    }
    

export function SelectTrigger({ children, className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`border rounded px-3 py-2 cursor-pointer bg-gray-700 text-white ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function SelectValue({ placeholder }: { placeholder: string }) {
  return <span>{placeholder}</span>;
}

interface SelectContentProps {
  children: React.ReactNode;
  className?: string;
}

export function SelectContent({ children, className = "" }: SelectContentProps) {
  return (
    <div className={`mt-1 bg-gray-800 border border-gray-600 rounded p-2 ${className}`}>
      {children}
    </div>
  );
}

interface SelectItemProps {
  value: string;
  children: React.ReactNode;
}

export function SelectItem({ value, children }: SelectItemProps) {
  return (
    <div
      className="px-3 py-1.5 hover:bg-gray-700 cursor-pointer rounded"
      onClick={() => console.log("Selecionado:", value)} // você pode substituir isso por lógica real depois
    >
      {children}
    </div>
  );
}
