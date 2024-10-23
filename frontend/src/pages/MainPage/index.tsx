import React, { useCallback, useMemo, useState } from "react";
import { Globe } from "../../components/Globe";
import { useCountries } from '../../hooks/useCountries';
import { CountryFeature, Rotation } from "../../types";
import { AppBar, Autocomplete, Button, Drawer, Grid, IconButton, Menu, MenuItem, Paper, TextField, Toolbar, Typography } from "@mui/material";
import { Menu as MenuIcon, AccountCircle } from '@mui/icons-material';
import { CountryInfo } from "../../components/CountryInfo";
import styled from "@emotion/styled";

export const MainPage = () => {
    const [open, setOpen] = React.useState(false);
    const [selectedCountry, setSelectedCountry] = useState<CountryFeature | undefined>();
    const [rotation, setRotation] = useState<Rotation>([0, 0]);
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const { countries } = useCountries();

    const countriesOptions = useMemo(() => {
        return countries.map(c => c.properties.name);
    }, [countries.length]);

    const handleCountrySelect = (countryName: string | null) => {
        if (!countryName) {
            return;
        }

        const country = countries.find(c => c.properties.name === countryName)!;

        setSelectedCountry(country);
        setRotation(country.properties.position)
        openDrawer();
    }

    const handleCountryClick = (country: CountryFeature) => {
        setSelectedCountry(country);
        setRotation(country.properties.position)
        openDrawer();
    }

    const openDrawer = useCallback(() => {
        setOpen(true);
    }, []);

    const closeDrawer = useCallback(() => {
        setOpen(false);
    }, []);

    return <>
        <AppBar position="static">
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Photos
                </Typography>
                {auth && (
                    <div>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose}>Profile</MenuItem>
                            <MenuItem onClick={handleClose}>My account</MenuItem>
                        </Menu>
                    </div>
                )}
            </Toolbar>
        </AppBar>

        <Grid container padding={5} direction="column">
            <Drawer open={open} onClose={closeDrawer} anchor="right" sx={{ width: { xs: "100vw", md: "50vw" } }}>
                <Grid container xs={12} justifyContent="flex-end" sx={{ maxHeight: "50px", padding: "20px" }}>
                    <Button variant="contained" color="error" onClick={closeDrawer}>X</Button>
                </Grid>
                <CountryInfo id="1" name="Ukraine" />
            </Drawer>
            <Grid item xs={3}>
                <Autocomplete
                    disablePortal
                    id="country-select"
                    options={countriesOptions}
                    sx={{ width: 300, bgcolor: "white", borderRadius: "4px" }}
                    renderInput={(params) =>
                        <TextField {...params} label="Country" />
                    }
                    getOptionKey={(v) => v}
                    onChange={(_e, v) => handleCountrySelect(v)}
                />
            </Grid>
            <Grid container item xs={12} justifyContent="center">
                <Globe
                    countries={countries}
                    rotation={rotation}
                    handleCountryClick={handleCountryClick}
                    selectedCountry={selectedCountry?.id}
                />
            </Grid>
        </Grid>
    </>
}