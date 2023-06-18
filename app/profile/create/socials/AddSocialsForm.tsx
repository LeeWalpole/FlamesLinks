"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { db } from "@/lib/firebase/config"
import useAuth from "@/lib/firebase/useAuth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/react-hook-form/form"

// This can come from your database or API.
type AddSocialsForm = z.infer<typeof FormSchema>

const defaultValues: Partial<AddSocialsForm> = {
  socials: {
    instagram: "",
    twitter: "",
  },
}

const FormSchema = z.object({
  socials: z.object({
    instagram: z.string().min(2, {
      message: "instagram",
    }),
    twitter: z.string().min(2, {
      message: "twitter",
    }),
  }),
})

export default function InputReactHookForm({ pushURL }: { pushURL: string }) {
  const router = useRouter()
  const user = useAuth()
  const form = useForm<AddSocialsForm>({
    resolver: zodResolver(FormSchema),
    defaultValues,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const getProfileData = async () => {
      try {
        if (user && user.uid) {
          const profileRef = doc(db, "profiles", user.uid)
          const profileSnapshot = await getDoc(profileRef)
          if (profileSnapshot.exists()) {
            const profileData = profileSnapshot.data()
            const { socials, ...rest } = profileData // Extract the socials object
            form.reset({ ...rest, socials }) // Pass the socials object separately
          }
        }
      } catch (error) {
        console.error("Error retrieving profile data:", error)
      }
    }

    getProfileData()
  }, [form, user])

  async function onSubmit(data: AddSocialsForm) {
    try {
      if (user && user.uid) {
        setIsSubmitting(true)
        const profileRef = doc(db, "profiles", user.uid)
        const socialsData = data.socials // Extract the socials data
        // delete data.socials // Remove the socials field from the main data object
        await updateDoc(profileRef, { ...data, socials: socialsData }) // Update the document with socials as a nested object
        setIsSubmitting(false)
        router.push(pushURL)
      }
    } catch (error) {
      console.error("Error updating profile data:", error)
      setIsSubmitting(false)
    }
  }

  return (
    <>
      {user && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="socials.instagram" // Update the field name to reflect the nested structure
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Instagram</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your Instagram handle.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="socials.twitter" // Update the field name to reflect the nested structure
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Twitter</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your Twitter handle.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <section className="grid grid-cols-2 gap-4 border-t bg-background pt-4 align-middle">
              <Button
                size="lg"
                variant="secondary"
                onClick={() => router.back()}
              >
                Go back
              </Button>
              <Button size="lg" type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving socials..." : "Next"}
              </Button>
            </section>
          </form>
        </Form>
      )}
    </>
  )
}
