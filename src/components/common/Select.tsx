import React, { useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandItem,
} from "@/components/ui/command";
import { Check, ChevronDown } from "lucide-react";

interface SelectProps {
  options: string[];
  onSelect?: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function Select({
  options,
  onSelect,
  placeholder = "Selecciona...",
  className = "w-full",
}: SelectProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className={`${className} justify-between bg-white rounded-lg shadow-sm`}
        >
          <span>{value || placeholder}</span>
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        sideOffset={4}
        className="p-0 mt-2 w-full min-w-[280px] max-w-lg"
      >
        <Command className="w-full">
          <CommandInput placeholder="Buscar..." className="border-b px-3 py-2" />
          <CommandList className="max-h-60 overflow-auto">
            <CommandEmpty className="p-2 text-sm text-gray-500">
              No hay resultados.
            </CommandEmpty>
            {options.map((option) => (
              <CommandItem
                key={option}
                onSelect={() => {
                  setValue(option);
                  onSelect?.(option);
                  setOpen(false);
                }}
                className="flex items-center px-3 py-2 hover:bg-indigo-100 cursor-pointer"
              >
                <span className="flex-1">{option}</span>
                {value === option && (
                  <Check className="ml-2 h-4 w-4 text-indigo-600" />
                )}
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
