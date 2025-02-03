'use client'
import { Category } from "@/sanity.types";


import { useRouter } from 'next/navigation';
import React from 'react';
import { ChevronsUpDown, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';


interface CategorySelectorProps {
  categories: Category[];
  
}

const CategorySelectorComponent: React.FC<CategorySelectorProps> = ({categories}) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<string | null>("");
  const router = useRouter();

  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button 
          variant={'outline'}
          role='combobox'
          aria-expanded={open}
          className='w-full max-w-full relative flex justify-center sm:justify-start sm:flex-none 
          items-center space-x-2 bg-blue-500 hover:bg-blue-700 hover:text-white 
          text-white font-bold py-2 px-4 rounded'>
            {value ?
              categories.find((category)=> category._id === value)?.title : "Filter by Category"
            }
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
          </PopoverTrigger>

          <PopoverContent className='w-full p-0'>
            <Command>
              <CommandInput placeholder='Search Category' 
              className='h-9' 
              onKeyDown={(e) => {if (e.key === 'Enter'){
                const selectedCategory = categories.find((category) => category.title && 
                category.title.toLowerCase() === e.currentTarget.value.toLowerCase());
                if (selectedCategory) {
                  setValue(selectedCategory._id);
                  setOpen(false);
                  router.push(`/category/${selectedCategory._id}`);
                }
              }}}/>
              <CommandList>
              <CommandEmpty>No Category Found</CommandEmpty>
                <CommandGroup>
                  {categories.map((category) => (
                    <CommandItem
                      key={category._id}
                      value={category.title}
                      onSelect={(currentValue) => {
                        setValue(currentValue === category._id ? "" : category._id);
                        setOpen(false);
                        router.push(`/categories/${category.slug?.current}`); // fixed
                      }}
                    >
                      <Check
                        className={cn(
                          'ml-auto h-4 w-4',
                          value === category._id ? 'opacity-100' : 'opacity-0'
                        )}
                        />
                        {category.title}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
          </Popover>
    </div>
  );
};

export default CategorySelectorComponent;
