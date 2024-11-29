import { Document } from 'mongoose';


interface TypeUser {
    role: "helper" | "handicap"; // Assurez-vous que le type de 'role' correspond à ce que vous avez dans votre base de données
    mobilityNeeds?: string; // Exemple d'un autre champ possible
    preferences?: string; // Exemple d'un autre champ possible
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
