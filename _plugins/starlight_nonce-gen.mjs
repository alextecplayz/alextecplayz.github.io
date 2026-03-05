import crypto from "crypto";

export default function nonceGenerator(eleventyConfig) {
  eleventyConfig.addGlobalData("nonce", () => {
    // Generate a base64 16-byte nonce
    return crypto.randomBytes(16).toString("base64");
  });
}