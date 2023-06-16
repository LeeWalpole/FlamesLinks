"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { db } from "@/firebase/config"
import useAuth from "@/firebase/useAuth"
import { zodResolver } from "@hookform/resolvers/zod"
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { useFieldArray, useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
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

type ProfileFormValues = z.infer<typeof profileFormSchema>

const defaultValues: Partial<ProfileFormValues> = {
  weblinks: [{ linkUrl: "", linkText: "" }],
}

const profileFormSchema = z.object({
  weblinks: z
    .array(
      z.object({
        linkUrl: z.string().url({ message: "Please enter a valid URL." }),
        linkText: z.string(),
      })
    )
    .optional(),
})

export default function InputReactHookForm() {
  const router = useRouter()
  const user = useAuth()
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const { fields, append } = useFieldArray({
    name: "weblinks",
    control: form.control,
  })

  useEffect(() => {
    const getProfileData = async () => {
      try {
        if (user && user.uid) {
          const profileRef = doc(db, "profiles", user.uid)
          const profileSnapshot = await getDoc(profileRef)
          if (profileSnapshot.exists()) {
            const profileData = profileSnapshot.data()
            const { weblinks, ...rest } = profileData
            form.reset({ ...rest, weblinks })
          }
        }
      } catch (error) {
        console.error("Error retrieving profile data:", error)
      }
    }

    getProfileData()
  }, [form, user])

  async function onSubmit(data: ProfileFormValues) {
    try {
      if (user && user.uid) {
        setIsSubmitting(true)
        const profileRef = doc(db, "profiles", user.uid)
        await updateDoc(profileRef, {
          ...data,
        })
        setIsSubmitting(false)
        router.push("/account/add/gallery/")
      }
    } catch (error) {
      console.error("Error updating profile data:", error)
      setIsSubmitting(false)
    }
  }

  const removeLink = (index: number) => {
    const updatedLinks = [...(form.getValues("weblinks") || [])]
    updatedLinks.splice(index, 1)
    form.setValue("weblinks", updatedLinks)
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {fields.map((field, index) => (
            <>
              <div
                key={field.id}
                className="relative mb-2 flex flex-row gap-4 rounded border p-4"
              >
                <button
                  type="button"
                  className="absolute right-2 top-2  text-red-500"
                  onClick={() => removeLink(index)}
                >
                  <Icons.close className="h-5 w-5" />
                </button>

                <FormField
                  control={form.control}
                  name={`weblinks.${index}.linkText`}
                  render={({ field }) => (
                    <FormItem className="w-1/2">
                      <FormLabel>Link Title</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`weblinks.${index}.linkUrl`}
                  render={({ field }) => (
                    <FormItem className="w-1/2">
                      <FormLabel>URL</FormLabel>

                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </>
          ))}

          <Button
            type="button"
            variant="secondary"
            size="lg"
            className="w-full"
            onClick={() => append({ linkUrl: "", linkText: "" })}
          >
            <Icons.add className="mr-2 h-5 w-5" />
            Add more web links
          </Button>

          <section className="grid grid-cols-2 gap-4 border-t bg-background pt-4 align-middle">
            <Button size="lg" variant="secondary" onClick={() => router.back()}>
              Go back
            </Button>
            <Button size="lg" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving" : "Next"}
            </Button>
          </section>
        </form>
      </Form>
    </>
  )
}
