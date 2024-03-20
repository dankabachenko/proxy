import express from "express";
import { errorMiddleware } from "./middlewares/error-middleware.js";
import { getBannedIps } from "./utils/getBannedIps.js";
import { getBannedPhones } from "./utils/getBannedPhones.js";
import { getFooter } from "./utils/getFooter.js";
import cors from "cors";
import { getPrivacy } from "./utils/getPrivacy.js";
import { getTerms } from "./utils/getTerms.js";

const app = express();

const PORT = 5000;

app.use(express.json());
app.use(cors());
app.use(errorMiddleware);

app.post("/check", async (req, res, next) => {
  const { ip, phone } = req.body;

  try {
    const [bannedIps, bannedPhones] = await Promise.all([
      getBannedIps(),
      getBannedPhones(),
    ]);

    const isIpBanned = bannedIps.includes(ip);
    const isPhoneBanned = bannedPhones.includes(phone);

    return res.status(200).json({
      isBanned: isPhoneBanned || isIpBanned,
    });
  } catch (e) {
    next(e);
  }
});

app.post("/footer", async (req, res, next) => {
  const {
    companyName,
    siteUrl,
    termsAndConditionsLink,
    privacyPolicyLink,
    ctaText,
  } = req.body;

  try {
    const footerHTML = await getFooter(
      companyName,
      siteUrl,
      termsAndConditionsLink,
      privacyPolicyLink,
      ctaText
    );

    return res.status(200).json({
      html: footerHTML,
    });
  } catch (e) {
    next(e);
  }

  return;
});

app.post("/privacy", async (req, res, next) => {
  const { companyName, siteUrl } = req.body;

  try {
    const privacyHTML = await getPrivacy(companyName, siteUrl);

    return res.status(200).json({
      html: privacyHTML,
    });
  } catch (e) {
    next(e);
  }

  return;
});

app.post("/terms", async (req, res, next) => {
  const { companyName, siteUrl, ctaText } = req.body;

  try {
    const termsHTML = await getTerms(companyName, siteUrl, ctaText);

    return res.status(200).json({
      html: termsHTML,
    });
  } catch (e) {
    next(e);
  }

  return;
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
