import mongoose from 'mongoose';

const ideaSchema = mongoose.Schema(
  {
    group: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: 'Idea',
    },
    keyword: {
        type: String,
        required: true,
    },
  }
);

const Idea = mongoose.model('Idea', ideaSchema);

export default Idea;