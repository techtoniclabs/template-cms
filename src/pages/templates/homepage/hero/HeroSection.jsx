"use server";

import { HeroModel } from "@/pages/templates/homepage/hero/HeroModel";
import { Button } from "@/core/components/ui/button";

export default async function HeroSection({ props }) {
  const heroSection = new HeroModel(props);

  return (
    <section className="w-full h-screen lg:h-[60vh] lg:min-h-[540px] flex flex-col justify-center text-center">
      <div className="wrapper">
        <h1 className="mb-3 font-black text-5xl">
          {heroSection.template.heading.value}
        </h1>
        <span>{heroSection.template.subheading.value}</span>
        <div className="mt-7 flex gap-4 justify-center">
          {heroSection.template.cta.map((btn, id) => (
            <Button key={id} variant={btn.variant} asChild>
              <a href={btn.href}>{btn.value}</a>
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
}
