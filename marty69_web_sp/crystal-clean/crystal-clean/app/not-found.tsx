import Link from "next/link";

import { Container } from "../components/tooling/not-found/container";
import { FadeIn } from "../components/tooling/animations/fade-in";

export default function NotFound() {
  return (
    <Container className="flex h-[100vh] items-center pt-16 sm:pt-28 lg:pt-32">
      <FadeIn className="flex max-w-xl flex-col items-center text-center">
        <p className="font-display text-4xl font-semibold text-zinc-50 sm:text-5xl">
          404
        </p>
        <h1 className="mt-4 font-display text-2xl font-semibold text-zinc-50">
          Stránka nenalezena
        </h1>
        <p className="mt-2 text-sm text-neutral-100">
          Omlouváme se, ale stránka, kterou hledáte, neexistuje.
        </p>
        <Link
          href="/"
          className="mt-4 text-sm font-semibold text-zinc-50 transition hover:text-neutral-600"
        >
          Domovská stránka
        </Link>
      </FadeIn>
    </Container>
  );
}
