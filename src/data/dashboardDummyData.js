/**
 * Dashboard Dummy Data
 * - stats: 요약 통계 데이터
 * - calendar: 날짜별 데이터
 * - pieChart: 카테고리별 비율 데이터
 */

export const stats = {
  totalTasks: 120,
  completedTasks: 95,
  pendingTasks: 25,
  completionRate: 79.2, // %
};

export const calendar = [
  { date: '2024-06-01', count: 3 },
  { date: '2024-06-02', count: 7 },
  { date: '2024-06-03', count: 2 },
  { date: '2024-06-04', count: 5 },
  { date: '2024-06-05', count: 0 },
  { date: '2024-06-06', count: 4 },
  { date: '2024-06-07', count: 6 },
];

export const pieChart = [
  { category: 'Work', value: 40 },
  { category: 'Personal', value: 25 },
  { category: 'Study', value: 20 },
  { category: 'Exercise', value: 10 },
  { category: 'Other', value: 5 },
];