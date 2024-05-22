import Header from "@/components/layout/header"
import LoginRegisterNavigation from "@/components/layout/login-register-navigation"

export default function AuthLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="flex min-h-screen flex-col justify-between">
      <Header navigation={<LoginRegisterNavigation />} />
      <main className="flex h-full flex-1 items-center justify-center p-10">
        {children}
      </main>
    </div>
  )
}
