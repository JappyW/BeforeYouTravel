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

export interface ProjectionConfig {
    svgRef: React.RefObject<SVGSVGElement>;
    countries: CountriesFeatures;
    scale: number;
    cx: number;
    cy: number;
    rotateX?: number;
    rotateY?: number;
    rotateZ?: number;
    rotation?: Rotation;
    dragSensitivity?: number;
    minScroll?: number;
    maxScroll?: number;
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

export interface DragBehaviourParams extends Helper {
    sensitivity: number;
}
