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

  return (
    <>
      <Button
        type="button"
        variant="link"
        size="sm"
        className="mt-1"
        onClick={() => append({ linkUrl: "", linkText: "" })}
      >
        Add Some Web Links
      </Button>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div>
            {fields.map((field, index) => (
              <>
                {" "}
                <div key={field.id} className="space-y-2">
                  <FormField
                    control={form.control}
                    name={`weblinks.${index}.linkUrl`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>URL</FormLabel>
                        <FormDescription>
                          Add the URL for the link.
                        </FormDescription>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`weblinks.${index}.linkText`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Link Text</FormLabel>
                        <FormDescription>
                          Add the text for the link.
                        </FormDescription>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Separator className="my-8" />
              </>
            ))}
          </div>

          <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
            <div>ID: {user ? user.uid : "No user"}</div>
          </section>

          <section className="fixed bottom-0 left-0 z-50 mt-48 flex h-24 w-full border-t bg-background align-middle">
            <div className="m-auto flex w-96 justify-between">
              <Button variant="secondary" onClick={() => router.back()}>
                Go back
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving Web Links..." : "Save Web Links"}
              </Button>
            </div>
          </section>
        </form>
      </Form>
    </>
  )
}
