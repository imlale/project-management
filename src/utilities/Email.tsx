export function isValidEmail(email: string) {
    // Expresión regular para validar un correo electrónico
    const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;  
    return regex.test(email);
  }