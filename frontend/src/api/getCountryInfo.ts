export const backendCountryURL = "localhost:8000/country-info"

export const getCountryInfo = async (name: string) => {
    try {
        const countryInfo = await fetch(backendCountryURL, {
            body: JSON.stringify({ name })
        }).then(d => d.json());

        return countryInfo;
    } catch (e) {
        alert("Something went wront while fetching country information");
    }
}
