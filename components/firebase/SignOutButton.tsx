import { useRouter } from "next/navigation"
import { signOut } from "firebase/auth"
import { toast } from "react-toastify"

import { auth } from "@/lib/firebase/config"
import { Button } from "@/components/ui/button"

function SignOutButton() {
  const router = useRouter()

  async function handleLogout() {
    try {
      await signOut(auth)
      toast("You logged out.", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
      router.push("/")
    } catch (error) {
      console.log("Error signing out:", error)
    }
  }

  return <Button onClick={handleLogout}>Sign Out</Button>
}

export default SignOutButton
