
import { Schema, model} from "mongoose";

const UserSchema = new Schema({
    name : {type: String, required: true, min:4, unique:true},
    password : {type: String, required: true, min:8, unique:true}
})

export const Bloguser = model('Bloguser', UserSchema);
