import { Button } from "../../ui/button";

export default function Hero() {
  return (
    <section className="w-full h-screen lg:h-[60vh] lg:min-h-[540px] flex flex-col justify-center text-center">
      <div className="wrapper">
        <h1 className="mb-3 font-black text-5xl">
          Take Ideas to Production
          <br /> in Seconds, Not Sprints
        </h1>
        <span>
          Accelerate your digital teams with AI-powered design-to-code, visual
          <br /> editing, and enterprise CMS, all in our Visual Development
          Platform.
        </span>
        <div className="mt-7 flex gap-4 justify-center">
          <Button>Get started</Button>
          <Button variant="outline">Contact sales</Button>
        </div>
      </div>
    </section>
  );
}
