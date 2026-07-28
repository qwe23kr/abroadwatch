import { createTravelerStaticPage } from "@/components/static/TravelerStaticPage";

const page = createTravelerStaticPage("disclaimer");
export const generateMetadata = page.generateMetadata;
export default page.default;
