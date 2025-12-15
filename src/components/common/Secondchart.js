import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const Secondchart = () => {
    const [state, setState] = useState({
        series: [{
            name: 'Sales',
            data: [2,4,1,8,10,12]
        }],
        options: {
            chart: {
                height: 150,
                toolbar: {
                    show: false
                }
            },
            stroke: {
                width: 5,
                curve: 'smooth',
            },
            xaxis: {
                labels: {
                    show: false,
                },
                axisBorder: {
                    show: false,
                },
                axisTicks: {
                    show: false,
                },
            },
            yaxis: {
                show: false,
            },
            grid: {
                show: false,
            },
        },
    });

    return (
        <div id="chart" className='-p-4'>
            <ReactApexChart options={state.options} series={state.series} type="line" height={150} />
        </div>
    );
};

export default Secondchart;
