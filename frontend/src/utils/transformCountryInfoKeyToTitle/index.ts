import { CountryInfoTitleKey } from "../../types";

const keyToTitle = {
    name: "Name",
    density: "Density",
    area: "Area",
    minimumWageInDollars: "Minimum Wage",
    capital: "Capital",
    callingCode: "Calling Code",
    currencyCode: "Currency Code",
    largestCity: "Largest City",
    lifeExpectancy: "Life Expectancy",
    language: "Language",
    population: "Population",
    taxRate: "Tax Rate",
}

export const transformCountryInfoKeyToTitle = (key: keyof CountryInfoTitleKey) => {
    return keyToTitle[key];
}