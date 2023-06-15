import NavOnboard from "@/app/profile/create/NavOnboard"

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <section className="m-auto w-96">
      {/* Include shared UI here e.g. a header or sidebar */}

      <div className="">{children}</div>

      <footer></footer>
    </section>
  )
}
