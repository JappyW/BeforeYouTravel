import { GeoPath, GeoPermissibleObjects, GeoProjection } from 'd3-geo';
import { Selection } from 'd3-selection';
import { Feature as BaseFeature, GeoJsonProperties, Geometry } from 'geojson';

// Common types
export type Rotation = [number, number] | [number, number, number];

// Features
export type Feature = BaseFeature<Geometry, GeoJsonProperties>;
export type Features = Feature[];

export interface CountryFeature extends Feature {
  properties: CountryProperties;
}
export type CountriesFeatures = CountryFeature[];

export interface CountryProperties {
  id: string;
  name: string;
  position: Rotation;
}
export type CountriesProperties = CountryProperties[];

// Globe
export type GlobeProjection = GeoProjection;
export type GlobePathGenerator = GeoPath<any, GeoPermissibleObjects>;

// Selections
export interface SVGDatum {
  width: number;
  height: number;
}
export type CountriesPathsSelection = Selection<
  SVGPathElement,
  CountryFeature,
  SVGSVGElement,
  SVGDatum
>;
export type GlobeCircleSelection = Selection<
  SVGCircleElement,
  SVGDatum,
  null,
  undefined
>;

export interface GlobeProps {
  countries: CountryFeature[];
  className?: string;
  rotateX?: number;
  rotateY?: number;
  rotateZ?: number;
  width?: number;
  height?: number;
  rotation?: Rotation;
  minScroll?: number;
  maxScroll?: number;
  dragSensitivity?: number;
  scale?: number;
  handleCountryClick: (country: CountryFeature) => void;
  selectedCountry?: string | number;
}

export interface WorldMapProps {
  countries: CountryFeature[];
  className?: string;
  width?: number;
  height?: number;
  minScroll?: number;
  maxScroll?: number;
  dragSensitivity?: number;
  scale?: number;
  handleCountryClick: (country: CountryFeature) => void;
  selectedCountry?: string | number;
}

export interface InitialGlobeProps {
  width: number;
  height: number;
  rotation: Rotation;
  minScroll: number;
  maxScroll: number;
  dragSensitivity: number;
  scale: number;
}

export type CountriesCSVColumns = 'id' | 'name' | 'latitude' | 'longitude';

export interface Helper {
  selection: CountriesPathsSelection;
  projection: GlobeProjection;
  pathGenerator: GlobePathGenerator;
}

export interface RotateProjectionToParams extends Helper {
  rotation: Rotation;
  duration?: number;
}

export interface ZoomBehaviourParams extends Helper {
  minScroll: number;
  maxScroll: number;
  scale: number;
  circleSelection: GlobeCircleSelection;
}

export interface ZoomRectangularBehaviourParams extends Helper {
  minScroll: number;
  maxScroll: number;
  scale: number;
}

export interface DragBehaviourParams extends Helper {
  sensitivity: number;
}

export interface ICountryData {
  name: string;
  area: string | number; //km2
  capital: string;
  language: string;
  population: string | number;
  largestCity: string;
  density: string | number; //P/km2
  abbreviation: string;
  currencyCode: string;
  callingCode: string;
  lifeExpectancy: string | number;
  minimumWageInDollars: string | number;
  taxRate: string | number; //%
}

export interface ICountryInfoFull extends ICountryData {
  id: string | number;
  images: string[];
}

export type CountryInfoTitleKey = ICountryInfoFull;
