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
  console.log(chartData);
  if (!chartData) {
    return <b>통계정보가 없습니다 ಥ_ಥ</b>;
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
