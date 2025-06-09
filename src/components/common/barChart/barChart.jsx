import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
} from 'recharts';

const COLORS = [
  '#FDDDDD',
  '#FFE7F0',
  '#FDE1DA',
  '#E9D8FD',
  '#DFF1FD',
  '#E4FAE4',
  '#FFF3D6',
  '#FDDDDD',
  '#E4FAE4',
  '#FFE7F0',
  '#E4FAE4',
  '#E0E4FF',
];

const EmotionBarChart = ({ chartData }) => {
  if (!chartData || !chartData?.find((data) => data.value !== 0)) {
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
  return (
    <ResponsiveContainer width={600} height={200}>
      <BarChart data={chartData}>
        <Bar dataKey='value' radius={[8, 8, 0, 0]}>
          {chartData.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % 12]} />
          ))}
          <LabelList
            dataKey='name'
            position='inside'
            fill='#555'
            style={{ fontSize: 12, fontFamily: 'KoPubWorld Dotum Light' }}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default EmotionBarChart;
