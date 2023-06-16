import NavOnboard from "@/app/account/add/NavOnboard"

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <section className="m-auto w-96">
      {/* Include shared UI here e.g. a header or sidebar */}
      <header>
        <h1>Header</h1>
        <p>Next step description goes here...</p>
      </header>
      <div className="">{children}</div>
    </section>
  )
}
