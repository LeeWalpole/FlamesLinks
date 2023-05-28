import ProfileCard from "@/components/Profile-Card"

const images = [
  "https://github.com/shadcn.png",
  "https://via.placeholder.com/400x500.png?text=Image+2",
  "https://via.placeholder.com/400x500.png?text=Image+3",
]

export default function ProfileGrid() {
  return (
    <div className="flex flex-wrap gap-10">
      <ProfileCard images={images} style="card" />
      <ProfileCard images={images} style="card" />
      <ProfileCard images={images} style="card" />
      <ProfileCard images={images} style="card" />
      <ProfileCard images={images} style="card" />
      <ProfileCard images={images} style="card" />
      <ProfileCard images={images} style="card" />
      <ProfileCard images={images} style="card" />
      <ProfileCard images={images} style="card" />
      <ProfileCard images={images} style="card" />
      <ProfileCard images={images} style="card" />
      <ProfileCard images={images} style="card" />
      <ProfileCard images={images} style="card" />
      <ProfileCard images={images} style="card" />
      <ProfileCard images={images} style="card" shuffle={true} />
    </div>
  )
}
