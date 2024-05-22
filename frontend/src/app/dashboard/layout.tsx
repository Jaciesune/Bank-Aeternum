import Header from "@/components/layout/header"
import UserNavigation from "@/components/layout/user-navigation"

export default function DashboardLayout({ children }: React.PropsWithChildren) {
  return (
    <div>
      <Header navigation={<UserNavigation />} />
      <main className="container mt-6">{children}</main>
    </div>
  )
}
