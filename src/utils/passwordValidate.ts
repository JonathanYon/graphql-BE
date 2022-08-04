
const passwordValidate = (password: string) => {
    const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

    return passwordRegex.test(password);
}
export default passwordValidate