import { ICountryData } from "../../types";

const keyToTitle: Record<keyof ICountryData, string> = {
    name: "Name",
    density: "Density",
    area: "Area",
    abbreviation: "Abbreviation",
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

export const transformCountryInfoKeyToTitle = (key: keyof ICountryData) => {
    return keyToTitle[key];
}