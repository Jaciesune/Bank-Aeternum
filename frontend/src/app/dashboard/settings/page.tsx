"use client"

import { User } from "next-auth/core/types"
import { useSession } from "next-auth/react"
import React, { useEffect, useState } from "react"

import { ChangePasswordForm } from "@/components/forms/settings/change-password-form"
import UpdateUserForm from "@/components/forms/settings/update-user-info-form"

export default function Page() {
  const [content, setContent] = useState("ProfileAndData") // Domyślna zawartość
  const { data: session } = useSession() // Pobranie sesji użytkownika
  const handleLinkClick = (newContent: string) => {
    setContent(newContent) // Ustawienie nowej zawartości po kliknięciu na link
  }

  return (
    <div className="container mx-auto flex">
      {/* Menu po lewej stronie */}
      <nav className="w-1/3">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold">Ustawienia</h1>
        </div>
        <ul className="grid gap-4 text-sm text-muted-foreground">
          <li>
            <button onClick={() => handleLinkClick("ProfileAndData")}>
              Profil i Dane
            </button>
          </li>
          <li>
            <button onClick={() => handleLinkClick("AgreementManagement")}>
              Zarządzanie zgodami
            </button>
          </li>
          <li>
            <button onClick={() => handleLinkClick("CorrespondenceAndNotices")}>
              Korespondencja i powiadomienia
            </button>
          </li>
          <li>
            <button onClick={() => handleLinkClick("PaymentLimits")}>
              Limity płatności
            </button>
          </li>
          <li>
            <button onClick={() => handleLinkClick("AccessAndSecurity")}>
              Dostęp i bezpieczeństwo
            </button>
          </li>
        </ul>
      </nav>

      {/* Zawartość po prawej stronie */}
      <section className="w-2/3">
        <div className="mt-8">
          {/* Wyświetlanie zawartości zależnie od wybranej opcji */}
          {content === "ProfileAndData" && (
            <ProfileAndDataContent user={session?.user} />
          )}
          {content === "AgreementManagement" && <AgreementContent />}
          {content === "CorrespondenceAndNotices" && (
            <CorrespondenceAndNoticesContent />
          )}
          {content === "PaymentLimits" && <PaymentLimitsContent />}
          {content === "AccessAndSecurity" && <AccessAndSecurityContent />}
        </div>
      </section>
    </div>
  )
}

// Komponenty zawartości dla różnych opcji

function ProfileAndDataContent({ user }: { user: User | null | undefined }) {
  return (
    <div>
      <section>
        <h2>Zmień dane użytkownika</h2>
        {user && <UpdateUserForm user={user} />}
      </section>

      <section>
        <h2>Zmień hasło</h2>
        {user && <ChangePasswordForm />}
      </section>
    </div>
  )
}

function AgreementContent() {
  return <div>Zarządzanie zgodami</div>
}

function CorrespondenceAndNoticesContent() {
  return <div>Korespondencja i powiadomienia</div>
}

function PaymentLimitsContent() {
  return <div>Limity płatności</div>
}

function AccessAndSecurityContent() {
  return <div>Dostęp i bezpieczeństwo</div>
}
