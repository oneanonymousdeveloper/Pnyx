import { Schema, model} from "mongoose";

const BlogSchema = new Schema({
    title : {type: String, required: true},
    description : {type: String, required: true, min:10},
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bloguser',  
        required: true,
      },
})

export const Blog = model('Blog', BlogSchema);