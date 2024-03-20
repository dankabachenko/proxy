import fs from "fs";
import path from "path";

import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const getTerms = async (companyName, siteUrl, ctaText) => {
  try {
    const filePath = path.resolve(__dirname, "..", "files", "terms.txt");

    let text = fs.readFileSync(filePath, "utf8");

    text = text.replaceAll(new RegExp("COMPANY NAME", "g"), companyName);
    text = text.replaceAll(
      new RegExp("WEBSITE URL", "g"),
      `<a href=${siteUrl} style="color: #007bff;">${siteUrl}</a>`
    );
    text = text.replaceAll(new RegExp("CTA TEXT", "g"), ctaText);

    return text;
  } catch (e) {
    throw new Error(e);
  }
};
