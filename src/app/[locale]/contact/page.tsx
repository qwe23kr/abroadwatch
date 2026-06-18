import { createStaticPage } from "@/components/static/StaticPage";

const { generateMetadata, default: ContactPage } = createStaticPage("contact");

export { generateMetadata };
export default ContactPage;
