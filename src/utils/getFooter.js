import fs from "fs";
import path from "path";

import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const getFooter = async (
  companyName,
  siteUrl,
  termsAndConditionsLink,
  privacyPolicyLink,
  ctaText
) => {
  try {
    const filePath = path.resolve(__dirname, "..", "files", "footer.txt");

    let text = fs.readFileSync(filePath, "utf8");

    text = text.replaceAll(new RegExp("COMPANY NAME", "g"), companyName);
    text = text.replaceAll(
      new RegExp("WEBSITE URL", "g"),
      `<a href=${siteUrl}>${siteUrl}</a>`
    );
    text = text.replaceAll(
      new RegExp("Terms & Conditions", "g"),
      `<a href=${termsAndConditionsLink} style="text-decoration: underline">Terms & Conditions</a>`
    );
    text = text.replaceAll(
      new RegExp("Privacy Policy", "g"),
      `<a href=${privacyPolicyLink} style="text-decoration: underline">Privacy Policy</a>`
    );
    text = text.replaceAll(new RegExp("CTA TEXT", "g"), ctaText);

    return text;
  } catch (e) {
    throw new Error(e);
  }
};
