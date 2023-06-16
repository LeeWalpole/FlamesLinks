import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import AddSocialsForm from "./AddSocialsForm"

export default function AddSocialsPage() {
  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Add Social Links</CardTitle>
        <CardDescription>
          What socials would you like us to promote?
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <AddSocialsForm />
      </CardContent>
    </Card>
  )
}
