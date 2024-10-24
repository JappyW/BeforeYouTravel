import { ICountryData } from "../../types";

type CountryInfoParsed = {
    key: keyof ICountryData, value: string | number | string[]
}

const AVOID_KEYS = ['images', 'id', 'abbreviation']

export const parseCountryInfo = (countryInfo: ICountryData) => {
    const keys = Object.keys(countryInfo) as (keyof ICountryData)[];

    return keys.reduce<CountryInfoParsed[]>((acc, key) => {
        if (!AVOID_KEYS.includes(key)) {
            acc.push({ key, value: parseCountryInfoValue(key, countryInfo[key]) })
        }

        return acc;
    }, [])
}

type CountryInfoValueMeasurementType = "area" | "density" | "minimumWageInDollars";

const VALUES_WITH_MEASUREMENTS = ["area", "density", "minimumWageInDollars"];

const CountryInfoValueMap = {
    "area": "km2",
    "density": "P/km2",
    'minimumWageInDollars': "$"
}

const parseCountryInfoValue = (key: keyof ICountryData, value: string | number) => {
    if (VALUES_WITH_MEASUREMENTS.includes(key)) {
        return `${value} ${CountryInfoValueMap[key as CountryInfoValueMeasurementType]}`
    }

    return value;
}