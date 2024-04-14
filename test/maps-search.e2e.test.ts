import { config } from "dotenv";
import { describe } from "@jest/globals";
import { getPlaceAutocomplete } from "../src/maps-api";
import { getAutoCompleteDetails } from "../src";
import { Countries } from "../src/types";

config({ path: ".env.test" });

// These are end-to-end tests and need an api key
describe("Tomtom Places E2E Tests", () => {
  describe("getAutoCompleteDetails", () => {
    it("can fetch from the autocomplete api", async () => {
      const res = await getAutoCompleteDetails("Charlotte Street");
      const firstRes = res[0];
      expect(firstRes);
      expect(firstRes).toHaveProperty("placeId");
      expect(firstRes).toHaveProperty("streetNumber");
      expect(firstRes).toHaveProperty("countryCode");
      expect(firstRes).toHaveProperty("country");
      expect(firstRes).toHaveProperty("freeformAddress");
      expect(firstRes).toHaveProperty("municipality");
      expect(firstRes).toHaveProperty("state");
      expect(firstRes).toHaveProperty("streetName");
    });

    it("scopes search to Australia", async () => {
      const res = await getAutoCompleteDetails("Charlotte Street");
      const allAddressFromAustralia = res.every(
        ({ countryCode }) => countryCode == Countries.Australia,
      );
      expect(allAddressFromAustralia).toBeTruthy();
    });
  });

  describe("getPlaceAutocomplete", () => {
    it("handles no results", async () => {
      const res = await getPlaceAutocomplete(
        process.env.TOMTOM_API_KEY!,
        "asfasffasfasafsafs",
      );
      expect(res).toStrictEqual([]);
    });
  });
});
