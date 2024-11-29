import { Document } from 'mongoose';
interface TypeUser {
    role: "helper" | "handicap";
    mobilityNeeds?: string;
    preferences?: string;
}
export interface IUser extends Document {
    readonly name: string;
    readonly location?: string;
    readonly typeUser?: TypeUser;
    readonly email: string;
    readonly phone?: string;
    readonly profilePicture?: string;
    readonly password: string;
}
export {};
