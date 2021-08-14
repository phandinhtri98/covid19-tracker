import { Container, Typography } from "@material-ui/core";
import '@fontsource/roboto'
import 'moment/locale/vi'
import moment from "moment";
import CountrySelector from "./components/CountrySelector";
import { useEffect, useState } from "react";
import { getCountries, getReportByCountry } from "./apis";
import { sortBy } from "lodash";
import HighLight from "./components/Highlight";
import Summary from "./components/Summary";
moment.locale('vi')

function App() {
  const [countries, setCountries] = useState([])
  const [selectorCountryId, setSelectorContryId] = useState('')
  const [report, setReport] = useState([])

  useEffect(() => {
    getCountries()
      .then(res => {
        const countriesSort = sortBy(res.data, 'Country')
        // console.log({ countriesSort })
        setCountries(countriesSort)
        setSelectorContryId('vn')
      })
  }, [])

  const handleOnChange = (e) => {
    setSelectorContryId(e.target.value)
  }

  useEffect(() => {
    if (selectorCountryId) {
      const { Slug } = countries.find((country) => country.ISO2.toLowerCase() === selectorCountryId)
      getReportByCountry(Slug)
        .then(res => {
          res.data.pop()
          setReport(res.data)
        })
    }

  }, [selectorCountryId, countries])

  return (
    <Container>
      <Typography variant='h2'>Số liệu COVID-19</Typography>
      <Typography component='p'>{moment().format('LL')}</Typography>
      <CountrySelector
        value={selectorCountryId}
        countries={countries}
        handleOnChange={handleOnChange}
      />
      <HighLight report={report} />
      <Summary
        report={report}
        selectedCountryId={selectorCountryId}
      />
    </Container>
  );
}

export default App;
