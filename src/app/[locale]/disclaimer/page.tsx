import { createStaticPage } from "@/components/static/StaticPage";

const { generateMetadata, default: DisclaimerPage } =
  createStaticPage("disclaimer");

export { generateMetadata };
export default DisclaimerPage;
