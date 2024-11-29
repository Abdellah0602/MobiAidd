declare class TypeUserDto {
    role: 'helper' | 'handicap';
    mobilityNeeds?: string;
    preferences: string;
}
export declare class CreateUserDto {
    readonly name: string;
    readonly location: string;
    typeUser: TypeUserDto;
    readonly email: string;
    readonly phone: string;
    readonly profilePicture: string;
    readonly password: string;
    validatePassword(password: string): Promise<boolean>;
}
export {};
