const formatThousands = (num) => {
  return num >= 1000 ? `${(num / 1000).toFixed(1)}k` : String(num);
};

export default formatThousands;
