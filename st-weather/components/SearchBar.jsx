"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { Search, MapPin } from "lucide-react";

// Zod schema for validation
const formSchema = z.object({
  city: z.string().min(1, { message: "Please enter a city name." }),
});

const SearchBar = ({ onSearch, onGeoLocate }) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      city: "",
    },
  });

  const handleSubmit = (data) => {
    onSearch(data.city.trim());
    form.reset(); // optional: clear input after search
  };

  return (
    <div className="container mx-auto p-6">
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex items-center gap-2 w-full max-w-md mx-auto"
      >
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem className="flex-grow">
              <FormControl>
                <Input
                  placeholder="Enter city name"
                  autoComplete="off"
                  spellCheck="false"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" size="icon" placeholder="Search" variant="outline">
          <Search className="w-5 h-5" />
        </Button>

        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={onGeoLocate}
          placeholder="Use your location"
        >
          <MapPin className="w-5 h-5" />
        </Button>
      </form>
    </Form>
    </div>
  );
};

export default SearchBar;
