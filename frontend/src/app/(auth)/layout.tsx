interface AuthLayoutProps {
  children: React.ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className="flex h-screen items-center justify-center p-10">
      {children}
    </main>
  )
}
