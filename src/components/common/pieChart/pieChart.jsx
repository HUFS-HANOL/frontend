import { PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#FFEBEE', '#F8BBD0', '#E1BEE7', '#C5CAE9', '#FFF9C4'];

const EmotionPieChart = ({ data }) => {
  if (!data || Object.keys(data).length === 0) {
    return (
      <div
        style={{
          minHeight: '100px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '16px',
        }}
      >
        <b style={{ color: '#6d5eac', opacity: '1' }}>아직 등록된 일기가 없어요!</b>
        <p style={{ fontSize: '12px' }}>일기가 생기면 여기에서 통계로 확인할 수 있어요!</p>
      </div>
    );
  }

  const chartData = Object.entries(data).map(([name, value]) => ({ name, value }));
  const total = chartData.reduce((sum, d) => sum + d.value, 0);

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    const { name, value } = chartData[index];

    return (
      <text x={x} y={y} fill='#333' textAnchor='middle' dominantBaseline='central' fontSize={12}>
        {name} ({value})
      </text>
    );
  };

  return (
    <div
      style={{
        width: 300,
        height: 300,
        borderRadius: 16,
        backgroundColor: '#fff',
        boxShadow: '0 0 16px rgba(0,0,0,0.05)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'KoPubWorld Dotum Light',
        fontSize: '16px',
      }}
    >
      <PieChart width={300} height={300}>
        <Pie
          data={chartData}
          dataKey='value'
          nameKey='name'
          cx='50%'
          cy='50%'
          outerRadius={100}
          labelLine={false}
          label={renderCustomizedLabel}
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </div>
  );
};

export default EmotionPieChart;
