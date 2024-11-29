import { D3ZoomEvent, interpolate, zoom } from 'd3';
import {
  DragBehaviourParams,
  GlobeProjection,
  RotateProjectionToParams,
  Rotation,
  SVGDatum,
  ZoomBehaviourParams,
  ZoomRectangularBehaviourParams,
} from '../types';
import { D3DragEvent, drag } from 'd3-drag';
import { ROTATION_DURATION } from '../constants';

export const rotateProjectionTo = ({
  pathGenerator,
  projection,
  rotation,
  selection,
  duration = ROTATION_DURATION,
}: RotateProjectionToParams) => {
  //current rotation value
  const currentRotation = projection.rotate();
  //updating path generator with new projection
  pathGenerator.projection(projection);

  //next rotation value
  const nextRotation = rotation;

  const rotateProjection = interpolate(currentRotation, nextRotation);

  selection
    .transition()
    .attrTween('d', d => t => {
      projection.rotate(rotateProjection(Math.pow(t, 0.33)));
      pathGenerator.projection(projection);

      const pathD = pathGenerator(d);
      return pathD ?? '';
    })
    .duration(duration);
};

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
        selection.attr('d', pathGenerator);
      }
    },
  );
};

export const dragProjection = ({
  selection,
  projection,
  pathGenerator,
  sensitivity,
}: DragBehaviourParams) => {
  return drag<SVGSVGElement, SVGDatum>().on(
    'drag',
    (event: D3DragEvent<SVGSVGElement, SVGDatum, SVGDatum>) => {
      const [rotationX, rotationY] = projection.rotate();
      const k = sensitivity / projection.scale();
      const rotation: Rotation = [
        rotationX + event.dx * k,
        rotationY - event.dy * k,
      ];

      projection.rotate(rotation);

      pathGenerator.projection(projection);
      selection.attr('d', pathGenerator);
    },
  );
};

function mercatorBounds(projection: GlobeProjection, maxlat: number) {
  let yaw = projection.rotate()[0];
  let xymax = projection([-yaw + 180 - 1e-6, -maxlat])!;
  let xymin = projection([-yaw - 180 + 1e-6, maxlat])!;

  return [xymin, xymax];
}

export const dragRectangularProjection = ({
  selection,
  projection,
  pathGenerator,
  sensitivity,
}: DragBehaviourParams) => {
  return drag<SVGSVGElement, SVGDatum>().on(
    'drag',
    (event: D3DragEvent<SVGSVGElement, SVGDatum, SVGDatum>) => {
      const [rotationX, rotationY] = projection.rotate();
      const k = sensitivity / projection.scale();

      const [translateX, translateY] = projection.translate();
      const rotation: Rotation = [rotationX + event.dx * k, rotationY];
      projection.rotate(rotation);

      //just a random value that feels good
      if (translateY > 600 + projection.scale()) {
        projection.translate([translateX, 600 + projection.scale()]);
      } else if (translateY < 200 - projection.scale()) {
        projection.translate([translateX, 200 - projection.scale()]);
      } else {
        projection.translate([translateX, translateY + event.dy]);
      }

      pathGenerator.projection(projection);
      selection.attr('d', pathGenerator);
    },
  );
};

export const zoomRectangularProjection = ({
  selection,
  pathGenerator,
  projection,
  scale,
  minScroll,
  maxScroll,
}: ZoomRectangularBehaviourParams) => {
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

        selection.attr('d', pathGenerator);
      }
    },
  );
};
