import * as bcrypt from 'bcrypt';

const hashPassword = async(password) =>{
    const salt = await bcrypt.genSalt(10);  
    let hashedpwd = await bcrypt.hash(password, salt);
    return hashedpwd
}

const comparePasswords =async (plainPassword, hashedPassword)=> {
    return await bcrypt.compare(plainPassword, hashedPassword);
}
export {hashPassword,comparePasswords}