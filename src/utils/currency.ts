
// Currency conversion utility
export const USD_TO_KSH_RATE = 129.50; // Current approximate rate

export const convertToKsh = (usdAmount: number) => {
  return `KSh ${(usdAmount * USD_TO_KSH_RATE).toLocaleString('en-KE', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`;
};

export const formatKsh = (kshAmount: number) => {
  return `KSh ${kshAmount.toLocaleString('en-KE', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`;
};
