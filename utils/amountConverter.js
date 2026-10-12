export const convertToStripeAmount = (amount) => {
    // Convert the amount to a float, multiply by 100, and round to the nearest integer
    return Math.round(parseFloat(amount) * 100);
  };

// export const convertFromStripeAmount = (amount) =>  (amount / 100).toFixed(2);