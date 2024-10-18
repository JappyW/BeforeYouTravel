import { useEffect, useState } from "react"
import { CountriesCSVColumns, CountryFeature, CountryProperties, Features, Rotation } from "../types";
import { Topology } from 'topojson-specification';
import { feature } from "topojson";
import { FeatureCollection } from 'geojson';
import { csv } from "d3";

//countris topology
const atlasJSONURL = 'https://cdn.jsdelivr.net/npm/visionscarto-world-atlas@1/world/110m.json';
//countris properties csv
const countriesPropertiesUrl =
    'https://gist.githubusercontent.com/sitek94/d1c99f4b1936ad047602cc569d30db6b/raw/1d11b02a553634ea708e36bc31557482a28cfac1/countries.csv';

//get features for each country draw them on the globe
const getFeatures = async (): Promise<Features> => {
    try {
        const res = await fetch(atlasJSONURL);
        const topology: Topology = await res.json();
        const countries = topology.objects.countries;
        if (countries) {
            const { features } = feature(topology, countries) as FeatureCollection;
            return features;
        } else {
            throw new Error(`There was no "countries" object in "topology.objects"`);
        }
    } catch (e) {
        console.error(e);
        return [];
    }
}

//fail safe
const bermudaTrianglePosition: Rotation = [
    25.027684437991375,
    -70.99627570018042,
];

//fail safe
export const notFoundCountry: CountryProperties = {
    id: 'unknown',
    name: 'unknown',
    position: bermudaTrianglePosition,
};

//fetches properties: [id, name, longitude, latitude]
const getProperties = (): Promise<CountryProperties[]> => {
    return csv<CountriesCSVColumns>(countriesPropertiesUrl).then(data => {
        return data.map(row => {
            const { id, latitude, longitude, name } = row;
            if (!id || !latitude || !longitude || !name) {
                return notFoundCountry;
            }

            return {
                id, name, position: [Number(latitude), Number(longitude)]
            }
        })
    })
}

//get topology and properties for the countries
const getCountries = async (): Promise<CountryFeature[]> => {
    const [features, properties] = await Promise.all([
        getFeatures(),
        getProperties()
    ]);

    //map properties to features
    return features.map(feature => {
        const countryProperties = properties.find(p => p.id === feature.id);

        return {
            ...feature,
            properties: countryProperties || notFoundCountry
        }
    })
}

export const useCountries = () => {
    const [countries, setCountries] = useState<CountryFeature[]>([]);
    const [status, setStatus] = useState<'pending' | 'rejected' | 'resolved' | 'idle'>('idle');
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        setStatus('pending')
        getCountries().then((countries) => {
            setStatus("resolved");
            setCountries(countries);
        }).catch((e) => {
            setStatus("rejected");
            setError(e);
        })
    }, [])

    return { countries, status, error };
}