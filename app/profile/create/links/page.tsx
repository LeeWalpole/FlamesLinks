import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import AddLinksForm from "./AddLinksForm"

export default function AddLinksPage() {
  return (
    <Card>
      <CardHeader className="space-y-1 ">
        <CardTitle className="text-2xl">Websites & Links</CardTitle>
        <CardDescription>Want to share any other websites?</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <AddLinksForm pushURL="/profile/create/socials/" />
      </CardContent>
    </Card>
  )
}
