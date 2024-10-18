import React, { useMemo, useState } from 'react';
import pkg from '../../package.json';
import { createStyles } from '../styles/create-styles';
import { Color } from '../styles/schemes';
import { CountryFeature } from '../types';

import { useProjection } from '../hooks/useProjection';
import { useCountries } from '../hooks/useCountries';
import { Autocomplete, TextField } from '@mui/material';

export interface GlobeProps {
    className?: string;
    countryColor?: Color;
    countryHoverColor?: Color;
    oceanColor?: Color;
    size?: number;
}

const Globe = (props: GlobeProps) => {
    const { countryColor, countryHoverColor, oceanColor, size = 400 } = props;
    const width = size;
    const height = size;
    const cx = size / 2;
    const cy = size / 2;
    const r = size / 2;
    const className = `${pkg.name}-${0}`;

    const svgRef = React.useRef<SVGSVGElement>(null);
    const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

    const { countries } = useCountries();
    const { rotateTo } = useProjection({
        cx,
        cy,
        scale: size / 2,
        svgRef,
        countries,
    });

    const styles = createStyles(className, {
        countryColor,
        countryHoverColor,
        oceanColor,
    });

    const countriesOptions = useMemo(() => {
        return countries.map(c => c.properties.name);
    }, [countries.length]);

    const handleCountryClick = (country: CountryFeature) => {
        // setSelectedCountry(country.properties.name);
        rotateTo(country.properties.position);
    }

    const handleCountrySelect = (country: string | null) => {
        if (!country) {
            return;
        }
        const countryProps = countries.find(c => c.properties.name === country)!;
        handleCountryClick(countryProps);
    }

    return <>
        <Autocomplete
            disablePortal
            id="country-select"
            options={countriesOptions}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Country" />}
            onChange={(e, v) => handleCountrySelect(v)}
        />
        <svg ref={svgRef} width={width} height={height} className={className}>
            <style>{styles}</style>
            <circle cx={cx} cy={cy} r={r} className="ocean" />
            {countries.map((country: CountryFeature) => (
                <g key={country.id}>
                    <title>{country.properties.name}</title>
                    <path
                        className={`country }`}
                        onClick={() => handleCountryClick(country)}
                    />
                </g>
            ))}
        </svg>
    </>
}

export { Globe };