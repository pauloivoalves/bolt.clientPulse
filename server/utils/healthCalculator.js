export const calculateClientHealth = (client) => {
  // This is a simple example - you should implement your own logic
  // based on your specific requirements
  
  const lastUpdate = new Date(client.updatedAt);
  const now = new Date();
  const daysSinceUpdate = (now - lastUpdate) / (1000 * 60 * 60 * 24);

  if (daysSinceUpdate > 30) {
    return 'bad';
  } else if (daysSinceUpdate > 14) {
    return 'neutral';
  } else {
    return 'good';
  }
};
