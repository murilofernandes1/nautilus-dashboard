import mongoose from "mongoose";

const PostsSchema = new mongoose.Schema({

  post: { type: String, required: true },
  upvote: { type: Number, default: 0 },
  downvote: { type: Number, default: 0 },
  criadoEm: { type: Date, default: Date.now },

});

const UsersSchema = new mongoose.Schema({

user: {type: String, required: true},
email: {type: String, required: true}

})

const Posts = mongoose.model("Posts", PostsSchema);
const Users = mongoose.model("Users", UsersSchema);

export { Posts, Users };
