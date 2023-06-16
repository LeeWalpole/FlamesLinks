import ProfileCard from "@/components/Profile-Card"

const images = [
  "https://github.com/shadcn.png",
  "https://via.placeholder.com/400x500.png?text=Image+2",
  "https://via.placeholder.com/400x500.png?text=Image+3",
]

export default function ProfilePage() {
  return (
    <>
      <div className="relative top-[-4rem] flex">
        <ProfileCard images={images} style="full" />
      </div>
    </>
  )
}
