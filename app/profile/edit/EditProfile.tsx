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
import { Icons } from "@/components/icons"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/react-hook-form/form"

const EditProfileSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    }),
  display_name: z
    .string()
    .min(2, {
      message: "Display Name must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    }),
  socials_instagram: z
    .string()
    .min(2, {
      message: "Display Name must be at least 2 characters.",
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

type EditProfileValues = z.infer<typeof EditProfileSchema>

// This can come from your database or API.
const defaultValues: Partial<EditProfileValues> = {
  username: "",
  bio: "I own a computer.",
  urls: [{ value: "" }],
}

// ...

export function EditProfile() {
  const form = useForm<EditProfileValues>({
    resolver: zodResolver(EditProfileSchema),
    defaultValues,
    mode: "onChange",
  })

  const { fields, append, remove } = useFieldArray<EditProfileValues, "urls">({
    control: form.control,
    name: "urls",
  })

  function onSubmit(data: EditProfileValues) {
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
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8"
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

          <Button type="submit" className="mt-8">
            Save Profile
          </Button>
        </form>
      </Form>
    </>
  )
}
