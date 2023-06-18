import Image from "next/image"
import Link from "next/link"

import SignInOutToggle from "@/components/firebase/SignInOutToggle"

interface HomePageProps {
  children?: React.ReactNode
}

export default function HomePage() {
  return (
    <div className="align-self-middle container mx-auto ">
      <section className="">
        <h1 className="m-10 text-center text-4xl font-bold">Home Page</h1>
        <SignInOutToggle />
      </section>
    </div>
  )
}
