export function generateTransactionId() {
    const prefix = "pw";
    const idLength = 10;
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = prefix;
    
    for (let i = result.length; i < idLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
    
    return result;
  }