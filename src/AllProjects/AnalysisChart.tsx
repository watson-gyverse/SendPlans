import { ResponsiveLine } from '@nivo/line'

function AnalysisChart({ stock, chartData }) {
    console.log(chartData)
    const data = [
        {
            id: stock,
            color: '#007a2a',
            data: chartData,
        },
    ]
    return (
        <div
            style={{
                height: '60%',
                width: '80%',
            }}
        >
            <ResponsiveLine
                data={data}
                margin={{ top: 20, right: 80, bottom: 50, left: 60 }}
                xScale={{ type: 'point' }}
                yScale={{
                    type: 'linear',
                    min: 'auto',
                    max: 'auto',
                    stacked: true,
                    reverse: false,
                }}
                yFormat=' >-.2f'
                curve='monotoneX'
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: '',
                    legendOffset: 36,
                    legendPosition: 'middle',
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: '',
                    legendOffset: -40,
                    legendPosition: 'middle',
                }}
                colors={{ scheme: 'red_yellow_green' }}
                lineWidth={0}
                pointSize={10}
                pointLabelYOffset={-12}
                useMesh={true}
                legends={[
                    {
                        anchor: 'bottom-right',
                        direction: 'column',
                        justify: false,
                        translateX: 100,
                        translateY: 0,
                        itemsSpacing: 0,
                        itemDirection: 'left-to-right',
                        itemWidth: 80,
                        itemHeight: 20,
                        itemOpacity: 0.75,
                        symbolSize: 12,
                        symbolShape: 'circle',
                        symbolBorderColor: '#007a2a',
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemBackground: 'rgba(0, 0, 0, .03)',
                                    itemOpacity: 1,
                                },
                            },
                        ],
                    },
                ]}
            />
        </div>
    )
}

export default AnalysisChart
