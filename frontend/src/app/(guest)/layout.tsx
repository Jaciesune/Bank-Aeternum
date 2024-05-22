import Header from "@/components/layout/header"
import LoginRegisterNavigation from "@/components/layout/login-register-navigation"

export default function GuestLayout({ children }: React.PropsWithChildren) {
  return (
    <>
      <Header navigation={<LoginRegisterNavigation />} />
      <main>{children}</main>
    </>
  )
}
