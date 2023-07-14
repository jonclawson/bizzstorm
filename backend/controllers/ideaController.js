import asyncHandler from '../middleware/asyncHandler.js';
import Idea from '../models/ideaModel.js';


// @desc    Fetch all ideas
// @route   GET /api/ideas
// @access  Public
const getIdeas = asyncHandler(async (req, res) => {
    const pageSize = process.env.PAGINATION_LIMIT;
    const page = Number(req.query.pageNumber) || 1;
  
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: 'i',
          },
        }
      : {};

      
  
    const count = await Idea.countDocuments({ ...keyword, group: req.user.groups[0] });
    const ideas = await Idea.find({ ...keyword, group: req.user.groups[0] })
      .limit(pageSize)
      .skip(pageSize * (page - 1));
  
    res.json({ ideas, page, pages: Math.ceil(count / pageSize) });
  });
  
// @desc    Create a idea
// @route   POST /api/ideas
// @access  Private
const createIdea = asyncHandler(async (req, res) => {
    const { keyword } = req.body;

    const idea = new Idea({
        group: req.user.groups[0],
        keyword
    });
  
    const createdIdea = await idea.save();
    res.status(201).json(createdIdea);
  });

  // @desc    Delete a idea
// @route   DELETE /api/ideas/:id
// @access  Private/Admin
const deleteIdea = asyncHandler(async (req, res) => {
  const idea = await Idea.findById(req.params.id);

  if (idea) {
    await Idea.deleteOne({ _id: idea._id });
    res.json({ message: 'Idea removed' });
  } else {
    res.status(404);
    throw new Error('Idea not found');
  }
});

  export {
    getIdeas,
    // getIdeaById,
    createIdea,
    // updateIdea,
    deleteIdea,
    // createIdeaReview,
    // getTopIdeas,
  };