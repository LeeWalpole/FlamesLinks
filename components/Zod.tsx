"use client"

import Link from "next/link"
import * as z from "zod"

const formSchema = z.object({
  display_name: z.string().min(2).max(50),
  username: z.string().min(2).max(50),
  instagram: z.string().min(2).max(50).optional(),
  tiktok: z.string().min(2).max(50).optional(),
  twitch: z.string().min(2).max(50).optional(), // nullish?
})
