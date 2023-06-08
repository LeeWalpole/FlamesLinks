"use client"

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import * as z from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/react-hook-form/form"

const profileFormSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    }),
  email: z
    .string({
      required_error: "Please select an email to display.",
    })
    .email(),
  bio: z.string().max(160).min(4),
  urls: z
    .array(
      z.object({
        value: z.string().url({ message: "Please enter a valid URL." }),
      })
    )
    .optional(),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

// This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = {
  username: "hardcoded_username",
  bio: "I own a computer.",
  urls: [{ value: "https://www.hardcoded_url.com" }],
}

// ...

export function ProfileForm() {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  })

  const { fields, append, remove } = useFieldArray<ProfileFormValues, "urls">({
    control: form.control,
    name: "urls",
  })

  function onSubmit(data: ProfileFormValues) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <Form
      {...form}
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-8"
    >
      <FormField
        control={form.control}
        name="username"
        render={({ field }) => (
          <FormItem className="mb-8">
            <FormLabel>Username</FormLabel>
            {/* 
            <FormDescription>This is your public display name.</FormDescription> */}
            <FormControl>
              <Input placeholder="Add username..." {...field} />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />

      <hr />

      <FormField
        control={form.control}
        name="display_name"
        render={({ field }) => (
          <FormItem className="mb-8">
            <FormLabel>Display Name</FormLabel>
            {/* 
            <FormDescription>This is your public display name.</FormDescription> */}
            <FormControl>
              <Input placeholder="Add display name..." {...field} />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />

      <div>
        {fields.map((field, index) => (
          <div key={field.id} className="flex space-x-4">
            <FormField
              control={form.control}
              name={`urls.${index}.value`}
              render={({ field }) => (
                <FormItem className="mb-4 w-full">
                  <FormLabel className={cn(index !== 0 && "sr-only")}>
                    Add Links / Websites
                  </FormLabel>
                  <FormDescription className={cn(index !== 0 && "sr-only")}>
                    Add links to your website, blog, or social media profiles.
                  </FormDescription>
                  <FormControl className="flex w-full">
                    <section className="flex w-full">
                      <Input {...field} className="flex-1" />
                      <div className="buttons ml-4">
                        <Button
                          type="button"
                          variant="link"
                          className="ml-2 flex-auto text-xs"
                          onClick={() => remove(index)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="h-6 w-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </Button>
                        <Button
                          type="button"
                          variant="link"
                          className="ml-2 flex-auto text-xs"
                          onClick={() => append({ value: "" })}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="h-6 w-6"
                          >
                            <path
                              fillRule="evenodd"
                              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </Button>
                      </div>
                    </section>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        ))}
      </div>

      <hr />

      <Button type="submit" className="mt-8">
        Submit
      </Button>
    </Form>
  )
}
