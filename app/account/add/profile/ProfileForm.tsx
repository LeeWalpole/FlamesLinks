"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { db } from "@/firebase/config"
import useAuth from "@/firebase/useAuth"
import { zodResolver } from "@hookform/resolvers/zod"
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { useForm } from "react-hook-form"
import * as z from "zod"

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
type ProfileFormValues = z.infer<typeof FormSchema>

const defaultValues: Partial<ProfileFormValues> = {
  username: "",
  displayName: "",
}

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  displayName: z.string().min(2, {
    message: "Display Name Here",
  }),
})

export default function InputReactHookForm() {
  const router = useRouter()
  const user = useAuth()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
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
            form.reset({ ...rest }) // Pass the socials object separately
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
        // delete data.socials // Remove the socials field from the main data object
        await updateDoc(profileRef, { ...data }) // Update the document with socials as a nested object
        setIsSubmitting(false)
        router.push("/account/add/socials/")
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
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="username..." {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="displayName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Display Name</FormLabel>
                  <FormControl>
                    <Input placeholder="display name..." {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
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
                {isSubmitting ? "One moment..." : "Next"}
              </Button>
            </section>
          </form>
        </Form>
      )}
    </>
  )
}
