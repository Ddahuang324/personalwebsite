// 共享的时间分配数据
export const useTimeAllocationData = () => {
  const timeAllocationData = [
    { age: 0, study: 0, game: 0, social: 100, coding: 0, music: 0 },
    { age: 2, study: 5, game: 0, social: 95, coding: 0, music: 0 },
    { age: 4, study: 8, game: 0, social: 92, coding: 0, music: 0},
    { age: 6, study: 10, game: 5, social: 85, coding: 0, music: 0 },
    { age: 8, study: 15, game: 10, social: 75, coding: 0, music: 0 },
    { age: 10, study: 18, game: 15, social: 67, coding: 0, music: 0 },
    { age: 12, study: 30, game: 20, social: 50, coding: 0, music: 0 },
    { age: 14, study: 40, game: 20, social: 35, coding: 0, music: 5},
    { age: 16, study: 60, game: 10, social: 20, coding: 0, music: 10 },
    { age: 18, study: 80, game: 5, social: 10, coding: 0, music: 5},
    { age: 20, study: 65, game: 10, social: 15, coding: 0, music: 10},
    { age: 22, study: 55, game: 5, social: 20, coding: 9, music: 11 },
    { age: 24, study: 15, game: 15, social: 25, coding: 20, music: 25 },
    { age: 25, study: 5, game: 5, social: 30, coding: 40, music: 20 }
  ]

  const seriesNames = ['social', 'coding', 'game', 'study', 'music']
  const colors = ['#a7f3d0', '#10b981', '#60a5fa', '#6366f1', '#f472b6']
  
  const legendItems = [
    { name: 'Study', color: '#6366f1' },
    { name: 'Game', color: '#60a5fa' },
    { name: 'Social or Family', color: '#a7f3d0' },
    { name: 'Coding', color: '#10b981' },
    { name: 'Music', color: '#f472b6' }
  ]

  return {
    timeAllocationData,
    seriesNames,
    colors,
    legendItems
  }
}