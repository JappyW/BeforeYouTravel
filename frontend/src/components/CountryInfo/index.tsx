import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  styled,
  Typography,
} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { useMemo } from 'react';
import { countryData } from '../../constants/countryData';
import { CountryName } from '../../types/countryKeys';
import { parseCountryInfo } from '../../utils/parseCountryInfo';
import { transformCountryInfoKeyToTitle } from '../../utils/transformCountryInfoKeyToTitle';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  padding: '4px',
  color: '#fff',
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  fontSize: 14,

  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.secondary.main,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export const CountryInfo = ({
  id,
  name,
}: {
  id: string;
  name?: CountryName;
}) => {
  // const [countryInfo, setCountryInfo] = useState<ICountryInfoFull | undefined>({
  //     id: 1,
  //     name: "Ukraine",
  //     abbreviation: "UA",
  //     density: 75,
  //     area: 603550,
  //     callingCode: "380",
  //     capital: "Kyiv",
  //     currencyCode: "UAH",
  //     largestCity: "Kyiv",
  //     lifeExpectancy: 71.6,
  //     minimumWageInDollars: 0.84,
  //     language: "Ukrainian",
  //     population: 44385155,
  //     taxRate: 45.20,
  //     images: ["https://i.natgeofe.com/k/29ce0d21-6863-4fe5-a0ed-082ad307161c/Kyiv_Ukraine_0322.jpg",
  //         "https://www.brookings.edu/wp-content/uploads/2022/11/111022022_shutterstock_2094300322.jpg"]
  // });

  const countryInfo = useMemo(() => {
    if (name) {
      return countryData[name];
    }
    return;
  }, [name]);

  if (!countryInfo) {
    return;
  }

  return (
    <Grid
      container
      padding='20px'
      gap='20px'
      sx={{
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
        height: '100vh',
        width: { xs: '100vw', md: '50vw' },
      }}
    >
      <Typography
        textAlign='center'
        variant='h2'
        component='p'
        sx={{ width: '100%' }}
      >
        Welcome to {name}
      </Typography>
      <TableContainer>
        <Table aria-label='simple table'>
          <TableBody>
            {parseCountryInfo(countryInfo).map(({ key, value }) => {
              return (
                <StyledTableRow key={key + value}>
                  <StyledTableCell variant='head'>
                    {transformCountryInfoKeyToTitle(key)}
                  </StyledTableCell>
                  <StyledTableCell>{value}</StyledTableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <ImageList cols={3} rowHeight={164}>
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
        </ImageList> */}
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1-content'
          id='panel1-header'
        >
          Facts
        </AccordionSummary>
        <AccordionDetails>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </AccordionDetails>
      </Accordion>
    </Grid>
  );
};
