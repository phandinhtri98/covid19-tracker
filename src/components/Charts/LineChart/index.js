import HighchartsReact from 'highcharts-react-official'
import HighCharts from 'highcharts'
import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { Button, ButtonGroup } from '@material-ui/core'

const generateOptions = (data) => {
    // console.log({ data })
    const categories = data.map((item) => moment(item.Date).format('DD/MM/YYYY'))
    return {
        chart: {
            height: 500,
        },
        title: {
            text: 'Tổng ca nhiễm',
        },
        xAxis: {
            categories: categories,
            crosshair: true,
        },
        colors: ['#F3585B'],
        yAxis: {
            min: 0,
            title: {
                text: null,
            },
            labels: {
                align: 'right',
            },
        },
        tooltip: {
            formatter: function () {
                return this.points.reduce(function (s, point) {
                    return `${s}<br/>${point.series.name}: <b>${point.y}</b> ca`;
                }, `<span>${this.x}</span>`);
            },
            shared: true,
            backgroundColor: '#FCFFC5',
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0,
            },
        },
        series: [
            {
                name: 'Tổng Ca nhiễm',
                data: data.map((item) => item.Confirmed),
            },
        ],
    }
}
function LineChart({ data }) {
    const [options, setOptions] = useState({})
    const [reportType, setReportType] = useState('all')
    useEffect(() => {
        //xử lý thay đổi reportType
        let customData = []
        switch (reportType) {
            case 'all':
                customData = data
                break
            case '30':
                customData = data.slice(data.length - 30)
                break
            case '7':
                customData = data.slice(data.length - 7)
                break
            default:
                customData = data
                break
        }
        setOptions(generateOptions(customData))
    }, [data, reportType])
    return (
        <div>
            <ButtonGroup
                size='small'
                style={{ display: 'flex', justifyContent: 'flex-end' }}
            >
                <Button
                    color={reportType === 'all' ? 'secondary' : ''}
                    onClick={() => setReportType('all')}
                >
                    Tất cả
                </Button>
                <Button
                    color={reportType === '30' ? 'secondary' : ''}
                    onClick={() => setReportType('30')}
                >
                    30 ngày
                </Button>
                <Button
                    color={reportType === '7' ? 'secondary' : ''}
                    onClick={() => setReportType('7')}
                >
                    7 ngày
                </Button>
            </ButtonGroup>
            <HighchartsReact
                highcharts={HighCharts}
                options={options}
            />
        </div>
    )
}
export default React.memo(LineChart)