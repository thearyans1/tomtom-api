import { config } from "dotenv";
import { describe } from "@jest/globals";
import axios from "axios";
import { getPlaceAutocomplete } from "../src/maps-api";
import { getAutoCompleteDetails } from "../src";

config({ path: ".env.test" });

jest.mock("axios");

describe("Unit tests", () => {
  const tomTomAddress = {
    type: "Street",
    id: "EcePYZ-uG3vIMUf520qT5A",
    score: 4.6116523743,
    address: {
      streetName: "Charlotte Street",
      countrySecondarySubdivision: "Central Coast Queensland",
      countrySubdivision: "Queensland",
      countrySubdivisionName: "Queensland",
      countrySubdivisionCode: "QLD",
      countryCode: "AU",
      country: "Australia",
      countryCodeISO3: "AUS",
      freeformAddress: "Charlotte Street, Central Coast QueenslandQueensland,",
    },
  };
  beforeEach(() => {
    jest
      .spyOn(axios, "get")
      .mockImplementation(async () => ({ data: { results: [tomTomAddress] } }));
  });

  describe("getAutoCompleteDetails", () => {
    describe("when search is empty", () => {
      it("raises an error", async () => {
        await expect(getAutoCompleteDetails("")).rejects.toThrow(
          /Address is not set/,
        );
      });
    });

    describe("when API key is not set", () => {
      const tomTomApiKey = process.env.TOMTOM_API_KEY;

      beforeEach(async () => {
        process.env.TOMTOM_API_KEY = "";
      });
      afterEach(async () => {
        process.env.TOMTOM_API_KEY = tomTomApiKey;
      });

      it("raises an error", async () => {
        await expect(
          getAutoCompleteDetails("charlotte street"),
        ).rejects.toThrow(/API Key is not defined/);
      });
    });

    it("returns a promise", () => {
      const res = getAutoCompleteDetails("Charlotte Street");
      expect(res).toBeInstanceOf(Promise);
    });
  });

  describe("getPlaceAutocomplete", () => {
    it("returns results", async () => {
      const result = await getPlaceAutocomplete("key", "address");
      expect(result).toEqual([tomTomAddress]);
    });
  });
});
