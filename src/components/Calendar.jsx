import React from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import '../../public/styles.css';

const Calendar = () => {
  const endDate = new Date();
  const startDate = new Date(new Date().setDate(endDate.getDate() - 300));

  const generateHeatmapValues = (start, end) => {
    const values = [];
    for (let dt = new Date(start); dt <= end; dt.setDate(dt.getDate() + 1)) {
      values.push({
        date: new Date(dt).toISOString().split('T')[0],
        count: Math.floor(Math.random() * 5),
      });
    }
    return values;
  };

  const generateMonthLabels = (start, end) => {
    const monthLabels = [];
    let current = new Date(start);
    while (current <= end) {
      const month = current.toLocaleString('default', { month: 'short' });
      const year = current.getFullYear();
      const label = `${month}`;
      if (!monthLabels.includes(label)) {
        monthLabels.push(label);
      }
      current.setMonth(current.getMonth() + 1);
    }
    return monthLabels.reverse();
  };

  const heatmapData = generateHeatmapValues(startDate, endDate);
  const monthLabels = generateMonthLabels(startDate, endDate).reverse();

  return (
    <div className="calendar-heatmap-container" style={{ maxWidth: '900px', margin: '0 auto'}}>
      <div className="month-labels-container" style={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          textAlign: 'center', 
          marginBottom: '20px',
      }}>
          {monthLabels.map((label, index, array) => (
              <span 
                  key={index} 
                  style={{ 
                      margin: index === 0 || index === array.length - 1 ? '0' : '0 10px',
                      flexGrow: index === 0 || index === array.length - 1 ? 0 : 1,
                      display: 'flex',
                      justifyContent: index === 0 ? 'flex-start' : index === array.length - 1 ? 'flex-end' : 'center',
                  }}
              >
                  {label}
              </span>
          ))}
      </div>
      <CalendarHeatmap
        startDate={startDate}
        endDate={endDate}
        values={heatmapData}
        classForValue={(value) => {
          if (!value || value.count === 0) {
            return 'color-empty';
          }
          return `color-scale-${value.count}`;
        }}
        showMonthLabels={false}
        tooltipDataAttrs={value => {
          return {
            'data-tip': `${value.date} has count: ${value.count}`,
          };
        }}
      />
    </div>
  );
};

export default Calendar;
