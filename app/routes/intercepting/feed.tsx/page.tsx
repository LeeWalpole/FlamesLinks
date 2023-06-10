import ProfileCard from "@/components/Profile-Card"

const images = [
  "https://github.com/shadcn.png",
  "https://via.placeholder.com/400x500.png?text=Image+2",
  "https://via.placeholder.com/400x500.png?text=Image+3",
]

export default function JoinPage() {
  return (
    <>
      <h1>Feed</h1>

      <aside className="fixed hidden h-full flex-col items-center space-x-7 sm:flex sm:w-[120px] sm:items-start md:w-[120px] lg:w-[250px] lg:items-start">
        <h2>Sidebar</h2>
        <ul>
          <li>Hello</li>
          <li>Hello</li>
          <li>Hello</li>
        </ul>
      </aside>
      <div className="ml-0 grow sm:ml-[120px] lg:ml-[250px]">
        <main className="relative">
          <h1>Main</h1>
        </main>
      </div>
    </>
  )
}
