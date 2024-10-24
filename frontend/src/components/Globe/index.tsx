import React, { useEffect, useMemo } from 'react';
import {
  CountriesPathsSelection,
  CountryFeature,
  GlobeProps,
  InitialGlobeProps,
  SVGDatum,
} from '../../types';
import { geoOrthographic, geoPath, select } from 'd3';
import {
  dragProjection,
  rotateProjectionTo,
  zoomProjection,
} from '../../hooks/useTransformations';
import { Country, GlobeContainer, GlobeSVG, Ocean } from '../../styles/Globe';
import { initialMapValues } from '../../constants';

const Globe = (props: GlobeProps) => {
  const {
    width = initialMapValues.width,
    height = initialMapValues.height,
    scale = initialMapValues.scale,
    rotation = initialMapValues.rotation,
    minScroll = initialMapValues.minScroll,
    maxScroll = initialMapValues.maxScroll,
    dragSensitivity = initialMapValues.dragSensitivity,
    selectedCountry,
    countries,
    handleCountryClick,
  } = props;

  const svgRef = React.useRef<SVGSVGElement>(null);

  //generate globe
  const projection = useMemo(() => {
    return geoOrthographic()
      .scale(scale)
      .center([0, 0])
      .rotate(rotation)
      .translate([width / 2, height / 2]);
  }, [scale, width, height]);

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
    const globe = svg.select<SVGCircleElement>('circle');
    const countriesData = countriesPaths.data(countries).join('path');

    svg
      .call(
        dragProjection({
          selection: countriesData,
          pathGenerator,
          projection,
          sensitivity: dragSensitivity,
        }),
      )
      .call(
        zoomProjection({
          selection: countriesData,
          circleSelection: globe,
          pathGenerator,
          maxScroll,
          minScroll,
          projection,
          scale,
        }),
      );

    globe.attr('r', projection.scale());
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

  useEffect(() => {
    if (!rotation || !svgRef.current) return;

    const countryPaths: CountriesPathsSelection = select(
      svgRef.current,
    ).selectAll('path');

    rotateProjectionTo({
      selection: countryPaths,
      projection,
      pathGenerator,
      rotation,
    });
  }, [rotation, pathGenerator, projection]);

  return (
    <GlobeContainer>
      <GlobeSVG ref={svgRef} width={width} height={height}>
        <Ocean cx={width / 2} cy={height / 2} r={width / 2} />
        {countries.map((country: CountryFeature) => (
          <g key={country.id}>
            <title>{country.properties.name}</title>
            <Country
              selected={selectedCountry === country.id}
              onClick={() => handleCountryClick(country)}
            />
          </g>
        ))}
      </GlobeSVG>
    </GlobeContainer>
  );
};

export { Globe };
