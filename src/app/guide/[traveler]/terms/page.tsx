import { createTravelerStaticPage } from "@/components/static/TravelerStaticPage";

const page = createTravelerStaticPage("terms");
export const generateMetadata = page.generateMetadata;
export default page.default;
