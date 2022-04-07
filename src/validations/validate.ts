import Joi from "joi";

export interface ILogin {
    email: string;
    password: string;
}

export interface IRegister {
    username: string;
    email: string;
    password: string;
}

class Validation {
    public loginValidation() {
        return Joi.object<ILogin>({
            email: Joi.string().required().email(),
            password: Joi.string().required().min(5),
        });
    }
    public registerValidation() {
        return Joi.object<IRegister>({
            email: Joi.string().required().email(),
            username: Joi.string().required().min(3),
            password: Joi.string().required().min(5),
        });
    }
}

export default new Validation();