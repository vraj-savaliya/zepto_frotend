import React, { useState } from 'react'
import ReactApexChart from 'react-apexcharts';

const AraeaChart = () => {
    const [state, setState] = React.useState({

        series: [{
            name: "Desktops",
            data: [10, 41, 35, 51, 49, 62, 69, 91, 148, 15, 178, 200]
        }],
        options: {
            chart: {
                height: 350,
                type: 'line',
                zoom: { enabled: false },
                foreColor: 'white'
            },
            tooltip: {
                custom: function ({ series, seriesIndex, dataPointIndex, w }) {
                    const month = w.globals.categoryLabels[dataPointIndex];
                    const value = series[seriesIndex][dataPointIndex];
                    return `
      <div style="
        background: white;
        color: black;
        padding: 10px;
        border-radius: 5px;
        box-shadow: 0 2px 6px rgba(0,0,0,0.15);
        font-family: sans-serif;
      ">
        <strong>${month}</strong><br/>
        Desktops: ${value}
      </div>
    `;
                }
            },
            dataLabels: { enabled: false },
            stroke: {
                curve: 'straight',
                width: 3
            },
            title: {
                text: 'Month wise orders',
                align: 'left'
            },
            grid: {
                show: true,
                yaxis: {
                    lines: { show: false }
                },
                xaxis: {
                    lines: { show: false }
                }
            },
            xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            },
            yaxis: { show: false },
            fill: {
                colors: ['white']
            },
            markers: {
                size: 0,
                discrete: [
                    { seriesIndex: 0, dataPointIndex: 0, fillColor: '#fff', strokeColor: '#fff', size: 5 },
                    { seriesIndex: 0, dataPointIndex: 2, fillColor: '#fff', strokeColor: '#fff', size: 5 },
                    { seriesIndex: 0, dataPointIndex: 5, fillColor: '#fff', strokeColor: '#fff', size: 5 },
                    { seriesIndex: 0, dataPointIndex: 8, fillColor: '#fff', strokeColor: '#fff', size: 5 },
                    { seriesIndex: 0, dataPointIndex: 11, fillColor: '#fff', strokeColor: '#fff', size: 5 },
                ]
            },
        }
    });
    return (
        <div className=''>
            <div id="chart">
                <ReactApexChart options={state.options} series={state.series} type="line" height={350} />
            </div>
            <div id="html-dist"></div>
        </div>
    )
}

export default AraeaChart