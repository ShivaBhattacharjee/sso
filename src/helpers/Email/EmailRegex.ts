export function isValidEmail(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const userEmail = email;
    if (userEmail.length > 1000) {
        throw new Error("Email is too long");
    }
    if (!emailRegex.test(userEmail)) {
        throw new Error("Invalid email regex");
    }
    return true;
}
