import * as topojson from "topojson";
export const worldAtlas110mURL = "https://cdn.jsdelivr.net/npm/visionscarto-world-atlas@1/world/110m.json"

export const getCountries = async () => {
    const countries = await fetch(worldAtlas110mURL).then(d => d.json());
    console.log(countries)
    const features = topojson.feature(countries, countries.objects.countries);
    return features;
}
