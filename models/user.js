import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },  
  phoneNumber: { type: String },
  address: { type: String },
  type: { type: String, default: 'user' }, // Set default user type
});

export default model('User', userSchema);
