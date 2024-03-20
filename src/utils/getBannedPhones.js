import fetch from "node-fetch";

export const getBannedPhones = async () => {
  try {
    const response = await fetch(
      "https://assetfy.com.au/json/blocked_phone_numbers.txt"
    );

    return response.text();
  } catch (e) {
    throw new Error(e);
  }
};
