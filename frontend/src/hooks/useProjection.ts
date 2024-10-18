import { useEffect, useMemo } from "react"
import { CountryFeature, ProjectionConfig, Rotation, SVGDatum } from "../types"
import { geoOrthographic, geoPath, select } from 'd3';
import { dragProjection, rotateProjectionTo, zoomProjection } from "./useTransformations";

export const useProjection = (props: ProjectionConfig) => {
    const {
        cx,
        cy,
        scale,
        svgRef,
        countries,
        rotateX = 0,
        rotateY = 0,
        rotateZ = 0,
        rotation = [rotateX, rotateY, rotateZ],
        minScroll = 0.3,
        maxScroll = 20,
        dragSensitivity = 75,
    } = props

    //generate globe
    const projection = useMemo(() => {
        return geoOrthographic().scale(scale).center([0, 0]).rotate(rotation).translate([cx, cy]);

    }, [scale, rotation, cx, cy])

    //generate paths for countries
    const pathGenerator = useMemo(() => {
        return geoPath(projection);
    }, [projection])

    useEffect(() => {
        if (!svgRef.current || !countries.length) {
            return;
        }
        const svg = select<SVGSVGElement, SVGDatum>(svgRef.current);
        const countriesPaths = svg.selectAll<SVGPathElement, CountryFeature>('path');
        const globe = svg.select<SVGCircleElement>('circle');
        const countriesData = countriesPaths.data(countries).join("path");

        svg.call(dragProjection({ selection: countriesData, pathGenerator, projection, sensitivity: dragSensitivity })).
            call(zoomProjection({ selection: countriesData, circleSelection: globe, pathGenerator, maxScroll, minScroll, projection, scale }))


        globe.attr('r', projection.scale());
        countriesData.attr('d', pathGenerator);

    }, [svgRef,
        scale,
        projection,
        countries,
        pathGenerator,
        maxScroll,
        minScroll,
    ])

    const rotateTo = (rotation: Rotation) => {
        if (!svgRef.current) {
            return;
        }

        const svg = select<SVGSVGElement, SVGDatum>(svgRef.current);
        const countriesPaths = svg.selectAll<SVGPathElement, CountryFeature>('path');

        rotateProjectionTo({
            selection: countriesPaths,
            projection,
            pathGenerator,
            rotation,
        })
    }
    return { rotateTo }
}