import { PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#FFEBEE', '#F8BBD0', '#E1BEE7', '#C5CAE9', '#FFF9C4'];

const EmotionPieChart = ({ data }) => {
  if (!data) {
    return <b>통계정보가 없습니다 ಥ_ಥ</b>;
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
