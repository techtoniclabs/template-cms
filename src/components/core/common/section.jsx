import Hero from "../home/hero";

export default function Section({ props }) {
  switch (props.type) {
    case "hero":
      return <Hero props={props} />;
    default:
      return (
        <div>
          <span>Default Section</span>
        </div>
      );
  }
}
