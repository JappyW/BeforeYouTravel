import { D3ZoomEvent, interpolate, zoom } from "d3";
import { DragBehaviourParams, RotateProjectionToParams, SVGDatum, ZoomBehaviourParams } from "../types";
import { D3DragEvent, drag } from 'd3-drag';

export const rotateProjectionTo = ({ pathGenerator, projection, rotation, selection, duration = 1000 }: RotateProjectionToParams) => {
    //current rotation value
    const currentRotation = projection.rotate();
    //updating path generator with new projection
    pathGenerator.projection(projection);

    //next rotation value
    const nextRotation = rotation;

    const rotateProjection = interpolate(currentRotation, nextRotation);

    selection.transition().attrTween('d', d => t => {
        projection.rotate(rotateProjection(Math.pow(t, 0.33)));
        pathGenerator.projection(projection);

        const pathD = pathGenerator(d);
        return pathD ?? '';
    }).duration(duration);
}

export const zoomProjection = ({
    selection,
    circleSelection,
    pathGenerator,
    projection,
    scale,
    minScroll,
    maxScroll,
}: ZoomBehaviourParams) => {
    return zoom<SVGSVGElement, SVGDatum>().on(
        'zoom',
        (event: D3ZoomEvent<SVGSVGElement, SVGDatum>) => {
            let scrollValue = event.transform.k;

            if (scrollValue >= maxScroll) {
                scrollValue = maxScroll;
            } else if (scrollValue <= minScroll) {
                scrollValue = minScroll;
            } else {
                projection.scale(scale * scrollValue);

                pathGenerator.projection(projection);

                circleSelection.attr('r', projection.scale());
                selection.attr('d', pathGenerator)
            }
        }
    );
}

export const dragProjection = ({
    selection,
    projection,
    pathGenerator,
    sensitivity,
}: DragBehaviourParams) => {
    return drag<SVGSVGElement, SVGDatum>().on('drag', (event: D3DragEvent<SVGSVGElement, SVGDatum, SVGDatum>) => {
        const [rotationX, rotationY] = projection.rotate();
        const k = sensitivity / projection.scale();

        projection.rotate([rotationX + event.dx * k, rotationY - event.dy * k]);

        pathGenerator.projection(projection);
        selection.attr('d', pathGenerator);
    });
}