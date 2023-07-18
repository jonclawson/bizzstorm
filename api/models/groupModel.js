import mongoose from 'mongoose';

const groupSchema = mongoose.Schema(
  {
    name: {
        type: String,
        required: true,
    },
  }
);

const Group = mongoose.model('Group', groupSchema);

export default Group;