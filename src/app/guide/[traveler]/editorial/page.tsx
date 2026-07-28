import { createTravelerStaticPage } from "@/components/static/TravelerStaticPage";

const page = createTravelerStaticPage("editorial");
export const generateMetadata = page.generateMetadata;
export default page.default;
