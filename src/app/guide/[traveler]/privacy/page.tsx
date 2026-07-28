import { createTravelerStaticPage } from "@/components/static/TravelerStaticPage";

const page = createTravelerStaticPage("privacy");
export const generateMetadata = page.generateMetadata;
export default page.default;
