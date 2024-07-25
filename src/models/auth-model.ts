import { Schema, model, Document } from 'mongoose';

interface AuthModel extends Document {
  name: string;
  email: string;
  password: string;
  status: string;
  face?: string;
}

const authSchema = new Schema<AuthModel>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  status: { type: String, required: true },
  face: { type: String },
});

const Auth = model<AuthModel>('Auth', authSchema);

export default Auth;
