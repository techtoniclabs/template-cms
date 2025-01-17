import HeroSection from "@/cms/pages/templates/homepage/hero/HeroSection";

export default function Section({ props }) {
  switch (props.type) {
    case "hero":
      return <HeroSection props={props} />;
    default:
      return (
        <div>
          <span>Default Section</span>
        </div>
      );
  }
}
