export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <main className="">
      <nav>Nav</nav>
      <header>header</header>
      <section className="m-auto max-w-[640px]">{children}</section>
      <footer>Nav</footer>
    </main>
  )
}
