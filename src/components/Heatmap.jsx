import React from 'react'
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';


function Heatmap() {

  const [tooltip, setTooltip] = React.useState(null);
  const data = [
    { date: '2024-01-20', count: 12 },
    { date: '2024-02-22', count: 200 },
    { date: '2024-03-30', count: 38 },
    // ...and so on
  ]
  return (
    <div>
  <CalendarHeatmap
  startDate={new Date('2024-01-01')}
  endDate={new Date('2024-12-31')}
  values={data}
  onMouseOver={(event, value) => {
    setTooltip(value ? `Date: ${value.date}, Amount: ${value.count}` : null);
  }}
  onMouseOut={() => {
    setTooltip(null);
  }}
  showWeekdayLabels={true}
  />
  <div className='h-8'>
{tooltip && <div className="tooltip">{tooltip}</div>}
</div>
    </div>
  )
}

export default Heatmap;
