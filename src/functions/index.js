import CryptoJS from 'crypto-js';
// Encryption function
export const encryptMessage = (message, secretKey) => {
    const ciphertext = CryptoJS.AES.encrypt(message, secretKey).toString();
    return ciphertext;
};

// Decryption function
export const decryptMessage = (ciphertext, secretKey) => {
    const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
};
