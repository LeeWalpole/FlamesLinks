import { Button } from "@/components/ui/button"
import ProfileHeader from "@/components/Profile-Header"
import Swiper from "@/components/Swiper"
import { Icons } from "@/components/icons"

interface ProfileCardProps {
  images: string[]
  style?: "simple" | "card" | "full" | "carousel"
  shuffle?: boolean
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  images,
  style = "default",
  shuffle,
}) => {
  const isSimpleStyle = style === "simple" // Check if style is 'simple'
  const isCardStyle = style === "card" // Check if style is 'card'
  const isCardFull = style === "full" // Check if style is 'full'
  const isCarousel = style === "carousel" // Check if style is 'full'
  return (
    <>
      <section className="relative m-auto flex w-full flex-row  sm:w-96 ">
        <article className="w-full ">
          <figure className="relative aspect-[1/1] w-full">
            <Swiper
              shuffle={shuffle}
              images={images}
              imageClassName="object-fill w-full h-full aspect-[1/1]"
            />
          </figure>
          <ProfileHeader />
          {/* <ProfileTabs /> */}
          {isCardFull && (
            // Render the following elements only when the style is 'full'
            <>
              {/* Second set of buttons */}
              <div className="cta-buttons mt-4 flex items-center justify-between px-4">
                <div className="grid-cols-auto grid w-full grid-flow-row ">
                  <Button>
                    <Icons.padlock className="mr-2 h-4 w-4" />
                    Onlyfans - Premium
                  </Button>
                  {/* <Button>
                    <Icons.email className="mr-2 h-4 w-4" />
                    mywebsite.com
                  </Button> */}
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
