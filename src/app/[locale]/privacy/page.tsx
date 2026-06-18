import { createStaticPage } from "@/components/static/StaticPage";

const { generateMetadata, default: PrivacyPage } = createStaticPage("privacy");

export { generateMetadata };
export default PrivacyPage;
