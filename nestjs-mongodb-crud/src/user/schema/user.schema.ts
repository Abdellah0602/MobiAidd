import * as bcrypt from 'bcrypt';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserType = {
  role: 'helper' | 'handicap';
  mobilityNeeds?: string;
  preferences?: string;
};

@Schema()
export class User extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  location: string;

  @Prop({ type: Object, default: undefined })
  typeUser?: UserType;

  @Prop({ unique: true, required: true }) // Définir unique pour assurer l'unicité, sparse pour permettre la recherche sans email
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  phone: string;

  @Prop()
  profilePicture: string;

  @Prop({ type: [{ type: 'ObjectId', ref: 'Trip' }] })
  trips: string[];

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;

  // Méthode d'instance pour le hachage du mot de passe
  async hashPassword() {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }
}

export const UserSchema = SchemaFactory.createForClass(User);

// Hook 'pre' pour hacher le mot de passe avant de sauvegarder
//UserSchema.pre('save', async function(next) {
//  if (this.isModified('password')) {
//    await this.hashPassword();
//  }
//  next();
//});
