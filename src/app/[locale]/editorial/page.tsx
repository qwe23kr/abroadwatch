import { createStaticPage } from "@/components/static/StaticPage";

const { generateMetadata, default: EditorialPage } = createStaticPage("editorial");
export { generateMetadata };
export default EditorialPage;
