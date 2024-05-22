import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "Dlaczego mój pies nie może mieć konta w Banku Aeternum?",
    answer:
      "Obawiamy się, że psy są zbyt nieodpowiedzialne w kwestii finansów. Ale zawsze możesz założyć konto oszczędnościowe na jego imię!",
  },
  {
    question: "Czy mogę płacić rachunki za pomocą myśli?",
    answer:
      "Nasz dział R&D ciągle pracuje nad technologią płatności myślowych. Na razie polecamy korzystanie z aplikacji mobilnej.",
  },
  {
    question: "Czy Bank Aeternum obsługuje transakcje w jednorożcach?",
    answer:
      "Pracujemy nad tym! Na razie jednak akceptujemy tylko tradycyjne waluty i kryptowaluty.",
  },
  {
    question: "Czy mogę wpłacić pieniądze na konto w postaci czekolady?",
    answer:
      "Niestety, na razie nie obsługujemy transakcji czekoladowych. Ale to świetny pomysł na przyszłość!",
  },
  {
    question: "Czy mogę uzyskać kredyt na zakup wakacji na Marsie?",
    answer:
      "Jeszcze nie, ale nasz zespół intensywnie pracuje nad ofertami międzyplanetarnymi.",
  },
]

export default function Faq() {
  return (
    <section className="container max-w-[1000px] pt-24">
      <h2 className="mb-10 text-center text-3xl font-bold leading-tight tracking-tighter md:text-4xl">
        Najrzadziej zadawane pytania
      </h2>

      <Accordion type="single" collapsible>
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index + 1}`}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  )
}
