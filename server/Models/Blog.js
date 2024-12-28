import { Schema, model} from "mongoose";

const BlogSchema = new Schema({
    title : {type: String, required: true},
    description : {type: String, required: true, min:10}
})

export const Blog = model('Blog', BlogSchema);