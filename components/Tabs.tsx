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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Icons } from "@/components/icons"

import { Separator } from "./ui/separator"

export function ProfileTabs() {
  return (
    <Tabs defaultValue="links" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="links">Links</TabsTrigger>
        <TabsTrigger value="about">About</TabsTrigger>
        <TabsTrigger value="contact">Contact</TabsTrigger>
      </TabsList>
      <TabsContent value="links">
        <Card>
          {/* <CardHeader>
            <CardTitle>Account</CardTitle> 
            <CardDescription></CardDescription>
          </CardHeader> */}
          <CardContent className="p-3.5">
            <div className="grid-cols-auto mb-3.5 grid w-full grid-flow-col gap-3.5">
              <Button variant="secondary">
                <Icons.instagram className="h-6 w-6" />
              </Button>
              <Button variant="secondary">
                <Icons.instagram className="h-6 w-6" />
              </Button>
              <Button variant="secondary">
                <Icons.instagram className="h-6 w-6" />
              </Button>
            </div>

            <div className="grid-cols-auto grid w-full grid-flow-row gap-3">
              <Button>
                <Icons.email className="mr-2 h-4 w-4" />
                mywebsite.com
              </Button>
              <Button>
                <Icons.link className="mr-2 h-4 w-4" />
                mywebsite.com
              </Button>
            </div>
          </CardContent>
          {/* <CardFooter>
            <Button>Save changes</Button>
          </CardFooter> */}
        </Card>
      </TabsContent>
      <TabsContent value="about">
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              Change your password here. After saving, you'll be logged out.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="current">Current password</Label>
              <Input id="current" type="password" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">New password</Label>
              <Input id="new" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save password</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="contact">
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              Change your password here. After saving, you'll be logged out.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="current">Current password</Label>
              <Input id="current" type="password" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">New password</Label>
              <Input id="new" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save password</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
