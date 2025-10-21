import bcrypt from 'bcrypt';
const saltRounds = 10;

export const hashPasswordHelper = async (plainPassword:string) => {
    try {
        const h = await bcrypt.hash(plainPassword, saltRounds);
        return h;
    }catch (error) {
        console.log('Lỗi băm mật khẩu:', error);
    }
}