import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Accordion, AccordionDetails, AccordionSummary, Button, Grid, ImageList, ImageListItem, styled, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material"
import { getCountryInfo } from "../../api/getCountryInfo";
import { ICountryInfo } from "../../types";
import { parseCountryInfo } from '../../utils/parseCountryInfo';
import { transformCountryInfoKeyToTitle } from '../../utils/transformCountryInfoKeyToTitle';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    padding: "4px",
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
    fontSize: 14,
    [`& > *`]: {
        color: "#fff",
    },

    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.secondary.main,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export const CountryInfo = ({ id, name }: { id: string, name?: string }) => {
    const [countryInfo, setCountryInfo] = useState<ICountryInfo | undefined>({
        id: 1,
        name: "Ukraine",
        abbreviation: "UA",
        density: 75,
        area: 603550,
        callingCode: "380",
        capital: "Kyiv",
        currencyCode: "UAH",
        largestCity: "Kyiv",
        lifeExpectancy: 71.6,
        minimumWageInDollars: 0.84,
        language: "Ukrainian",
        population: 44385155,
        taxRate: 45.20,
        images: ["https://i.natgeofe.com/k/29ce0d21-6863-4fe5-a0ed-082ad307161c/Kyiv_Ukraine_0322.jpg",
            "https://www.brookings.edu/wp-content/uploads/2022/11/111022022_shutterstock_2094300322.jpg"]
    });

    // useEffect(() => {
    //     if (name) {
    //         getCountryInfo(name).then((c) => {
    //             setCountryInfo(c);
    //         });
    //     }
    // }, [name])

    if (!countryInfo) {
        return;
    }

    return <Grid container padding="20px" sx={{ overflowY: "auto", height: "100vh", width: { xs: "100vw", md: "50vw" } }}>
        <Typography textAlign="center" variant="h2" component="p">Welcome to {name}</Typography>
        <TableContainer>
            <Table aria-label="simple table">
                <TableBody>
                    {parseCountryInfo(countryInfo).map(({ key, value }) => {
                        return <StyledTableRow>
                            <StyledTableCell key={key} variant='head'>{transformCountryInfoKeyToTitle(key)}</StyledTableCell>
                            <StyledTableCell key={key + "value"}>{value}</StyledTableCell>
                        </StyledTableRow>
                    })}
                </TableBody>
            </Table>
        </TableContainer>
        <ImageList cols={3} rowHeight={164}>
            {countryInfo.images.map(img => (
                <ImageListItem key={img}>
                    <img
                        srcSet={`${img}?fit=crop&auto=format&dpr=2 2x`}
                        src={`${img}?fit=crop&auto=format`}
                        alt={"alt"}
                        loading="lazy"
                    />
                </ImageListItem>
            ))}
        </ImageList>
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
            >
                Facts
            </AccordionSummary>
            <AccordionDetails>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                malesuada lacus ex, sit amet blandit leo lobortis eget.
            </AccordionDetails>
        </Accordion>
    </Grid>
}