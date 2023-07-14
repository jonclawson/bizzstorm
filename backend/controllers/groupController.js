import asyncHandler from '../middleware/asyncHandler.js';
import Group from '../models/groupModel.js';


// @desc    Fetch all groups
// @route   GET /api/groups
// @access  Public
const getGroups = asyncHandler(async (req, res) => {
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
  
    const count = await Group.countDocuments();
    const groups = await Group.find({ _id: {$in: req.groups} })
      .limit(pageSize)
      .skip(pageSize * (page - 1));
  
    res.json({ groups, page, pages: Math.ceil(count / pageSize) });
  });

// @desc    Fetch single group
// @route   GET /api/groups/:id
// @access  Public
const getGroupById = asyncHandler(async (req, res) => {
  // NOTE: checking for valid ObjectId to prevent CastError moved to separate
  // middleware. See README for more info.

  const group = await Group.findById(req.params.id);
  if (group) {
    return res.json(group);
  } else {
    // NOTE: this will run if a valid ObjectId but no group was found
    // i.e. group may be null
    res.status(404);
    throw new Error('Group not found');
  }
});
  
// @desc    Create a group
// @route   POST /api/groups
// @access  Private
const createGroup = asyncHandler(async (req, res) => {
    const { name } = req.body;

    const group = new Group({
        name,
    });
  
    const createdGroup = await group.save();
    res.status(201).json(createdGroup);
  });

  // @desc    Update a group
// @route   PUT /api/groups/:id
// @access  Private/Admin
const updateGroup = asyncHandler(async (req, res) => {
  const { name } =
    req.body;

  const group = await Group.findById(req.params.id);

  if (group) {
    Object.assign(group, {
      name
  })

    const updatedGroup = await group.save();
    res.json(updatedGroup);
  } else {
    res.status(404);
    throw new Error('Group not found');
  }
});

  // @desc    Delete a group
// @route   DELETE /api/groups/:id
// @access  Private/Admin
const deleteGroup = asyncHandler(async (req, res) => {
  const group = await Group.findById(req.params.id);

  if (group) {
    await Group.deleteOne({ _id: group._id });
    res.json({ message: 'Group removed' });
  } else {
    res.status(404);
    throw new Error('Group not found');
  }
});

  export {
    getGroups,
    getGroupById,
    createGroup,
    updateGroup,
    deleteGroup,
  };