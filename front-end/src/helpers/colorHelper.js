export function choosePriorityColor (priority) {
  const color = {
    min: '#264653',
    low: '#2A9D8F',
    medium: '#ffba08',
    high: '#f3722c',
    max: '#f94144'
  };

  switch (priority) {
    case 'Urgent' || 'Catastrophic':
      return color.max;
      break;
    case 'Essential' || 'Critical':
      return color.high;
      break;
    case 'Valuable' || 'Major':
      return color.medium;
      break;
    case 'Discretionary' || 'Minor':
      return color.low;
      break;
    default:
      return color.min;
      break;
  }
};

export function chooseSeverityColor (severity) {
  const color = {
    min: '#628594',
    low: '#2A9D8F',
    medium: '#ffba08',
    high: '#f3722c',
    max: '#f94144'
  };

  switch (severity) {
    case 'Catastrophic':
      return color.max;
      break;
    case 'Critical':
      return color.high;
      break;
    case 'Major':
      return color.medium;
      break;
    case 'Minor':
      return color.low;
      break;
    default:
      return color.min;
      break;
  }
};