import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;

const veterinarianSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },  
  phoneNumber: { type: String },
  address: { type: String },
  license: { type: String, required: true }, // License field for veterinarians
  type: { type: String, default: 'veterinarian' }, // Set default type to veterinarian
});

export default model('Veterinarian', veterinarianSchema);
