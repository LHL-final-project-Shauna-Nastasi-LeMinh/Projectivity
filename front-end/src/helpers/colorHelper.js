export function choosePriorityColor (priority) {
  const color = {
    min: '#264653',
    low: '#2A9D8F',
    medium: '#ffba08',
    high: '#f3722c',
    max: '#f94144'
  };

  switch (priority) {
    case 'Urgent':
      return color.max;
      break;
    case 'Essential':
      return color.high;
      break;
    case 'Valuable':
      return color.medium;
      break;
    case 'Discretionary':
      return color.low;
      break;
    default:
      return color.min;
      break;
  }
};
