const displayFollowers = (number = 0) => {
  if (number >= 30000) return '30K';
  else if (number >= 29000) return '29K';
  else if (number >= 29000) return '28K';
  else if (number >= 27000) return '27K';
  else if (number >= 26000) return '26K';
  else if (number >= 25000) return '25K';
  else if (number >= 24000) return '24K';
  else if (number >= 23000) return '23K';
  else if (number >= 22000) return '22K';
  else if (number >= 21000) return '21K';
  else if (number >= 20000) return '20K';
  else if (number >= 19000) return '19K';
  else if (number >= 18000) return '18K';
  else if (number >= 17000) return '17K';
  else if (number >= 16000) return '16K';
  else if (number >= 15000) return '15K';
  else if (number >= 14000) return '14K';
  else if (number >= 13000) return '13K';
  else if (number >= 12000) return '12K';
  else if (number >= 11000) return '11K';
  else if (number >= 10000) return '10K';
  else return number;
};

export default displayFollowers