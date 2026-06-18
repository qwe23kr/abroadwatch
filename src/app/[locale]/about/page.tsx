import { createStaticPage } from "@/components/static/StaticPage";

const { generateMetadata, default: AboutPage } = createStaticPage("about");

export { generateMetadata };
export default AboutPage;
