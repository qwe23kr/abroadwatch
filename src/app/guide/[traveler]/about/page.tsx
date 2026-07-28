import { createTravelerStaticPage } from "@/components/static/TravelerStaticPage";

const page = createTravelerStaticPage("about");
export const generateMetadata = page.generateMetadata;
export default page.default;
