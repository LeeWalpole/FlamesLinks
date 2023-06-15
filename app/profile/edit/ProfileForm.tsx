"use client"

import { useEffect, useState } from "react"
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
  socials: {
    instagram: "",
    twitter: "",
  },
}

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  displayName: z.string().min(2, {
    message: "Display Name Here",
  }),
  socials: z.object({
    instagram: z.string().min(2, {
      message: "instagram",
    }),
    twitter: z.string().min(2, {
      message: "twitter",
    }),
  }),
})

export default function InputReactHookForm() {
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
            form.reset({ ...rest, socials }) // Pass the socials object separately
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
        const socialsData = data.socials // Extract the socials data
        // delete data.socials // Remove the socials field from the main data object
        await updateDoc(profileRef, { ...data, socials: socialsData }) // Update the document with socials as a nested object
        setIsSubmitting(false)
      }
    } catch (error) {
      console.error("Error updating profile data:", error)
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
        <div>ID: {user ? user.uid : "No user"}</div>
      </section>

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
                    <Input placeholder="shadcn" {...field} />
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
                    <Input placeholder="shadcn" {...field} />
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

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </form>
        </Form>
      )}
    </>
  )
}