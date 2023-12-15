export declare class SignUpDto {
    readonly firstName: string;
    readonly lastName: string;
    readonly birthday: Date;
    readonly ci: string;
    readonly cellphone: string;
}
export declare class LoginAdminDto {
    readonly email: string;
    readonly password: string;
}
export declare class LoginOperatorDto {
    readonly ci: string;
    readonly birthday: Date;
}
