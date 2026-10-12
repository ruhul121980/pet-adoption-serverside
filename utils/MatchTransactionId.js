export function checkTransactionId(array, transaction_id) {
    for (let i = 0; i < array.length; i++) {
      if (array[i].transaction_id === transaction_id) {
        return true;
      }
    }
    return false;
  }