
import { Card, CardContent, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import CountUp from 'react-countup'

const useStyles = makeStyles((theme) => ({
    wrapper: (props) => {
        if (props.type === 'confirmed') return { borderLeft: '8px solid red' }
        if (props.type === 'recovered') return { borderLeft: '8px solid green' }
        else return { borderLeft: '8px solid gray' }
    },
    title: {
        fontSize: 18,
        marginBottom: 6
    },
    count: {
        fontSize: 18,
        fontWeight: 'bold'
    }
}))

export default function HighlightCard({
    title,
    count,
    type
}) {
    const classes = useStyles({ type })
    return (
        <Card className={classes.wrapper}>
            <CardContent>
                <Typography className={classes.title}>{title}</Typography>
                <Typography className={classes.count}>
                    <CountUp end={count || 0} duration={2} separator=' ' />
                </Typography>
            </CardContent>
        </Card>
    )
}
