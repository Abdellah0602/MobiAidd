import { Document } from 'mongoose';
export type UserType = {
    role: 'helper' | 'handicap';
    mobilityNeeds?: string;
    preferences?: string;
};
export declare class User extends Document {
    name: string;
    location: string;
    typeUser?: UserType;
    email: string;
    password: string;
    phone: string;
    profilePicture: string;
    trips: string[];
    createdAt: Date;
    updatedAt: Date;
    hashPassword(): Promise<void>;
}
export declare const UserSchema: import("mongoose").Schema<User, import("mongoose").Model<User, any, any, any, Document<unknown, any, User> & User & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, User, Document<unknown, {}, import("mongoose").FlatRecord<User>> & import("mongoose").FlatRecord<User> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
