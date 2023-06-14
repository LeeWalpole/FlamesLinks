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

const EditSocialsSchema = z.object({
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

type EditSocialsValues = z.infer<typeof EditSocialsSchema>

// This can come from your database or API.
const defaultValues: Partial<EditSocialsValues> = {
  username: "",
  bio: "I own a computer.",
  urls: [{ value: "" }],
}

// ...

export function EditSocials() {
  const form = useForm<EditSocialsValues>({
    resolver: zodResolver(EditSocialsSchema),
    defaultValues,
    mode: "onChange",
  })

  const { fields, append, remove } = useFieldArray<EditSocialsValues, "urls">({
    control: form.control,
    name: "urls",
  })

  function onSubmit(data: EditSocialsValues) {
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
            name="socials_instagram"
            render={({ field }) => (
              <FormItem className="mb-8">
                <FormLabel className="flex justify-between">
                  <span className="flex items-center justify-between">
                    <Icons.instagram className="mr-2 h-4 w-4 p-0" />
                    Instagram
                  </span>
                  <span className="text-right text-xs text-muted-foreground">
                    Example: instagram_username
                  </span>
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-xs text-muted-foreground ">
                      @
                    </span>
                    <Input
                      placeholder="Add Instagram username"
                      {...field}
                      className="pl-8"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="socials_instagram"
            render={({ field }) => (
              <FormItem className="mb-8">
                <FormLabel className="flex justify-between">
                  <span className="flex items-center justify-between">
                    <Icons.twitter className="mr-2 h-4 w-4 p-0" />
                    Twitter
                  </span>
                  <span className="text-right text-xs text-muted-foreground">
                    Example: twitter_handle
                  </span>
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-xs text-muted-foreground ">
                      @
                    </span>
                    <Input
                      placeholder="Add Twitter handle"
                      {...field}
                      className="pl-8"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="mt-8">
            Save Social Icons
          </Button>
        </form>
      </Form>
    </>
  )
}
