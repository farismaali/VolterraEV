import { CredentialsSignin } from "@auth/core/errors" // import is specific to your framework

class CustomError extends CredentialsSignin {
    constructor(code) {
        super();
        this.code = code;
    }
}

export default CustomError