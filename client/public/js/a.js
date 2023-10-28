// Valor hexadecimal de ejemplo
const hexValue = "11A1B9075038DA636E81A2AF9244DB6E2AAA8468BFF9318472B9297A7F970D057D129...";

// Convierte el valor hexadecimal en bytes
const hexBuffer = Buffer.from(hexValue, 'hex');

// Convierte los bytes en una cadena base64
const base64Value = hexBuffer.toString('base64');

console.log(base64Value);
