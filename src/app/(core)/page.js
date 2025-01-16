import Section from "@/pages/templates/common/Section";
import { sortItems } from "@/core/lib/helper";
import { getPagesByType } from "@/pages/services/PageService";

export async function getHomepageData() {
  const data = await getPagesByType("homepage");
  const result = { ...data[0], sections: sortItems(data[0].sections) };

  return result;
}

export default async function Page() {
  const { sections } = await getHomepageData();

  return (
    <main>
      {sections.map((section) => (
        <Section key={section.id} props={section} />
      ))}
    </main>
  );
}
