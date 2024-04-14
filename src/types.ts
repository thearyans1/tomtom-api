export enum Countries {
  "Australia" = "AU",
}

type States = "NSW" | "NT" | "WA" | "SA" | "VIC" | "TAS" | "ACT";

export type Address = {
  streetNumber?: string;
  streetName: string;
  municipalitySubdivision: string;
  municipality: string;
  countrySubdivisionCode: States;
  postalCode: string;
  countryCode: string;
  country: string;
  freeformAddress: string;
};

export type AutoCompleteDetails = Pick<
  Address,
  | "streetNumber"
  | "countryCode"
  | "country"
  | "freeformAddress"
  | "municipality"
> & { placeId: string };

export type TomTomAddressType = {
  type: string;
  id: string;
  address: Address;
};

export type TomTomResponseType = {
  numResults: number;
  totalResults: number;
  offset: number;
  results: TomTomAddressType[];
};
