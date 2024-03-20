import fetch from "node-fetch";

export const getBannedIps = async () => {
  try {
    const response = await fetch("https://assetfy.com.au/json/blocked_ips.txt");

    return response.text();
  } catch (e) {
    throw new Error(e);
  }
};
