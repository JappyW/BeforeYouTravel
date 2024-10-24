import React, { useEffect, useMemo } from 'react';
import {
  dragProjection,
  dragRectangularProjection,
  zoomProjection,
  zoomRectangularProjection,
} from '../../hooks/useTransformations';
import { CountryFeature, SVGDatum, WorldMapProps } from '../../types';
import { geoAzimuthalEqualArea, geoEquirectangular, geoMercator, geoNaturalEarth1, geoPath, select } from 'd3';
import { initialMapValues } from '../../constants';
import { Country } from '../../styles/Globe';

export const WorldMap = (props: WorldMapProps) => {
  const {
    countries,
    height = initialMapValues.height - 200,
    scale = initialMapValues.scale / 3,
    selectedCountry,
    handleCountryClick,
    minScroll = initialMapValues.minScroll,
    maxScroll = initialMapValues.maxScroll,
    dragSensitivity = initialMapValues.dragSensitivity,
    width = initialMapValues.width,
  } = props;

  const svgRef = React.useRef<SVGSVGElement>(null);

  //generate globe
  const projection = useMemo(() => {
    return geoEquirectangular();
  }, [scale]);

  //generate paths for countries
  const pathGenerator = useMemo(() => {
    return geoPath(projection);
  }, [projection]);

  useEffect(() => {
    if (!svgRef.current || !countries.length) {
      return;
    }
    const svg = select<SVGSVGElement, SVGDatum>(svgRef.current);
    const countriesPaths = svg.selectAll<SVGPathElement, CountryFeature>(
      'path',
    );
    const countriesData = countriesPaths.data(countries).join('path');

    svg
      .call(
        dragRectangularProjection({
          selection: countriesData,
          pathGenerator,
          projection,
          sensitivity: dragSensitivity,
        }),
      )
      .call(
        zoomRectangularProjection({
          selection: countriesData,
          pathGenerator,
          maxScroll,
          minScroll,
          projection,
          scale,
        }),
      );

    countriesData.attr('d', pathGenerator);
  }, [
    width,
    svgRef,
    scale,
    projection,
    countries,
    pathGenerator,
    maxScroll,
    minScroll,
  ]);

  return (
    <svg className='WorldMap--svg' ref={svgRef} width='100%' height='80vh'>
      {countries.map((country: CountryFeature) => (
        <g key={country.id}>
          <title>{country.properties.name}</title>
          <Country
            selected={selectedCountry === country.id}
            onClick={() => handleCountryClick(country)}
          />
        </g>
      ))}
    </svg>
  );
};
