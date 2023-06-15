import Image from "next/image"
import Link from "next/link"
import placeholderImage from "@/public/placeholder.png"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Swiper from "@/components/Swiper"
import { Icons } from "@/components/icons"

import ProfileHeader from "./Profile-Header"

interface ProfileCardProps {
  images: string[]
  style?: "simple" | "card" | "full" | "carousel"
  shuffle?: boolean
  displayName: string
  username: string
  avatarSrc: string
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  images,
  style = "default",
  shuffle,
  displayName,
  username,
  avatarSrc,
}) => {
  const isSimpleStyle = style === "simple" // Check if style is 'simple'
  const isCardStyle = style === "card" // Check if style is 'card'
  const isCardFull = style === "full" // Check if style is 'full'
  const isCarousel = style === "carousel" // Check if style is 'full'

  const renderSwiper =
    images.length > 0 ? (
      <Swiper
        shuffle={shuffle}
        images={images}
        imageClassName="object-fill w-full h-full aspect-[1/1]"
      />
    ) : (
      <Image
        height={640}
        width={640}
        src={placeholderImage}
        alt="Flames Placeholder"
        className="aspect-[1/1] h-full w-full object-fill opacity-20"
      />
    )

  return (
    <>
      <section className="relative m-auto flex w-full flex-row  sm:w-96 ">
        <article className="w-full ">
          {/* <figure className="relative aspect-[1/1] w-full">
            <Swiper
              shuffle={shuffle}
              images={images}
              imageClassName="object-fill w-full h-full aspect-[1/1]"
            />
          </figure> */}

          <figure className="relative aspect-[1/1] w-full">
            {renderSwiper}
          </figure>

          <ProfileHeader
            username={username}
            displayName={displayName}
            avatarSrc={avatarSrc}
          />

          {/* <ProfileTabs /> */}
          {isCardFull && (
            // Render the following elements only when the style is 'full'
            <>
              {/* Second set of buttons */}
              <div className="cta-buttons mt-4 flex items-center justify-between px-4">
                <div className="grid w-full grid-cols-2 gap-4">
                  <Dialog>
                    <DialogTrigger className="w-full">
                      <Button>
                        <Icons.link className="mr-2 h-5 w-5" />
                        View My Links
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="rounded-3xl border px-6 py-8">
                      <nav>
                        <Link
                          href=""
                          className="flex w-full items-center space-x-4 border-b p-4"
                        >
                          <Icons.tip className="h-6 w-6 text-brand-normal" />
                          <div className="flex-1 space-y-1">
                            <p className="text-md font-medium leading-none">
                              Treat @username
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Show your love and support.
                            </p>
                          </div>
                        </Link>
                        <Link
                          href=""
                          className="flex w-full items-center space-x-4 border-b p-4 opacity-50"
                        >
                          <Icons.message className="h-6 w-6 text-brand-normal" />
                          <div className="flex-1 space-y-1">
                            <p className="text-md font-medium leading-none">
                              Send Private Message
                            </p>
                            <p className="text-xs text-muted-foreground">
                              *$0.50 / Message (Coming soon).
                            </p>
                          </div>
                        </Link>
                        <Link
                          href=""
                          className="flex w-full items-center space-x-4 border-b p-4 opacity-50"
                        >
                          <Icons.phone className="h-6 w-6 text-brand-normal" />
                          <div className="flex-1 space-y-1">
                            <p className="text-md font-medium leading-none">
                              Voice Call (Coming soon).
                            </p>
                            <p className="text-xs text-muted-foreground">
                              *$0.50 / 60 Seconds (Coming soon).
                            </p>
                          </div>
                        </Link>
                        <Link
                          href=""
                          className="flex w-full items-center space-x-4  p-4 opacity-50"
                        >
                          <Icons.video className="h-6 w-6 text-brand-normal" />
                          <div className="flex-1 space-y-1">
                            <p className="text-md font-medium leading-none">
                              Video Call
                            </p>
                            <p className="text-xs text-muted-foreground">
                              *$1.00 / 60 Seconds (Coming soon).
                            </p>
                          </div>
                        </Link>
                      </nav>
                    </DialogContent>
                  </Dialog>

                  <Button>
                    <Icons.tip className="mr-2 h-6 w-6" />
                    Tip Me
                  </Button>
                </div>
              </div>
              {/* First set of buttons */}
              <div className="cta-buttons flex items-center justify-between p-4">
                <div className="grid-cols-auto grid w-full grid-flow-col gap-3">
                  <Button variant="secondary">
                    <Icons.instagram className="h-6 w-6" />
                  </Button>
                  <Button variant="secondary">
                    <Icons.twitter className="h-6 w-6" />
                  </Button>
                  <Button variant="secondary">
                    <Icons.twitch className="h-6 w-6" />
                  </Button>
                </div>
              </div>
            </>
          )}
          {!isCardStyle && !isSimpleStyle && !isCardFull && (
            // Render the following elements when style is neither 'card', 'simple', nor 'full'
            <>
              {/* First set of buttons */}
              <div className="cta-buttons flex items-center justify-between p-4">
                <div className="grid-cols-auto grid w-full grid-flow-col gap-3">
                  <Button variant="secondary">
                    <Icons.instagram className="h-6 w-6" />
                  </Button>
                  <Button variant="secondary">
                    <Icons.twitter className="h-6 w-6" />
                  </Button>
                  <Button variant="secondary">
                    <Icons.twitch className="h-6 w-6" />
                  </Button>
                </div>
              </div>
              {/* Second set of buttons */}
              <div className="cta-buttons flex items-center justify-between p-4">
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
              </div>
            </>
          )}
        </article>
      </section>
    </>
  )
}

export default ProfileCard
