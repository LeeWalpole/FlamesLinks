import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"
import AuthGoogle from "@/components/firebase/AuthGoogle"
import { Icons } from "@/components/icons"

export default function SignupPage() {
  return (
    <>
      <Card className="text-center">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Create Profile</CardTitle>
          <CardDescription>
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-1 gap-6">
            <AuthGoogle />
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <div className="grid gap-2">
            <Input id="email" type="email" placeholder="your@email.com" />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Create Profile</Button>
        </CardFooter>
      </Card>
    </>
  )
}
