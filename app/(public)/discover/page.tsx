import Carousel from "@/components/Carousel"
import ProfileCarousel from "@/components/Profile-Card"

const images = [
  "https://github.com/shadcn.png",
  "https://via.placeholder.com/400x500.png?text=Image+2",
  "https://via.placeholder.com/400x500.png?text=Image+3",
]

const cardsProps = [
  {
    title: "Display Name",
    link: "/",
    imageURL: "https://github.com/shadcn.png",
  },
  {
    title: "Display Name 2",
    link: "/",
    imageURL: "https://github.com/shadcn.png",
  },
  {
    title: "Display Name 3",
    link: "/",
    imageURL: "https://github.com/shadcn.png",
  },
  {
    title: "Display Name 1",
    link: "/",
    imageURL: "https://github.com/shadcn.png",
  },
  {
    title: "Display Name 2",
    link: "/",
    imageURL: "https://github.com/shadcn.png",
  },
  {
    title: "Display Name 1",
    link: "/",
    imageURL: "https://github.com/shadcn.png",
  },
  {
    title: "Display Name 2",
    link: "/",
    imageURL: "https://github.com/shadcn.png",
  },
  {
    title: "Display Name 3",
    link: "/",
    imageURL: "https://github.com/shadcn.png",
  },
  {
    title: "Display Name Namee 1",
    link: "/",
    imageURL: "https://github.com/shadcn.png",
  },
  {
    title: "Display Name 2",
    link: "/",
    imageURL: "https://github.com/shadcn.png",
  },
]

export default function AboutPage() {
  return (
    <>
      <section className="pl-4">
        <header className="mb-8">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
            Discover
          </h1>
          <p className="max-w-[700px] text-lg text-muted-foreground sm:text-xl">
            Explore the most beautiful girls in Thailand.
          </p>
        </header>
        <Carousel images={cardsProps} />
      </section>
      <section className="mt-14 pl-4">
        <header className="mb-8">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
            Blondes
          </h1>
          <p className="max-w-[700px] text-lg text-muted-foreground sm:text-xl">
            Category example goes here...
          </p>
        </header>
        <Carousel images={cardsProps} />
      </section>
    </>
  )
}
