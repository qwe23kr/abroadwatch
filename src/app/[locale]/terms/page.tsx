import { createStaticPage } from "@/components/static/StaticPage";

const { generateMetadata, default: TermsPage } = createStaticPage("terms");

export { generateMetadata };
export default TermsPage;
