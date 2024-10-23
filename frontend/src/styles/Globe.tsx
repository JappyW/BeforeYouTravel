import { styled } from "@mui/material";

export const GlobeContainer = styled("div")({
    margin: "auto"
})

export const GlobeSVG = styled("svg")({
})

export const Ocean = styled("circle")({
    fill: "#284fb3de"
})

export const Country = styled("path", {
    shouldForwardProp: (prop) => prop !== "selected"
})<{ selected: boolean }>(({ selected }) => ({
    fill: "#0eaa61",
    stroke: "#0000007dk",
    strokeWidth: "0.5px",
    "&:hover": {
        fill: "#1f6846de",
    },
    ...(selected && {
        fill: "#c88725"
    })
}))