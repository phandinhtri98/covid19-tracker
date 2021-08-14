
import { FormControl, FormHelperText, InputLabel, NativeSelect, makeStyles } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: '12px 0'
    },
}))

export default function CountrySelector({
    value,
    handleOnChange,
    countries
}) {
    const classes = useStyles()
    return (
        <FormControl className={classes.formControl}>
            <InputLabel shrink htmlFor='country-selector'>Quốc gia</InputLabel>
            <NativeSelect
                value={value}
                onChange={handleOnChange}
                inputProps={{
                    name: 'country',
                    id: 'country-selector'
                }}
            >
                {
                    countries.map((country) => {
                        return (
                            <option
                                key={country.ISO2}
                                value={country.ISO2.toLowerCase()}
                            >
                                {country.Country}
                            </option>
                        )
                    })
                }
            </NativeSelect>
            <FormHelperText>Lựa chọn quốc gia</FormHelperText>
        </FormControl>
    )
}
