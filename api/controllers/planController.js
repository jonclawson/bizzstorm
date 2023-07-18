import asyncHandler from '../middleware/asyncHandler.js';
import Plan from '../models/planModel.js';


// @desc    Fetch all plans
// @route   GET /api/plans
// @access  Public
const getPlans = asyncHandler(async (req, res) => {
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
  
    const count = await Plan.countDocuments({ ...keyword, group: req.user.groups[0] });
    const plans = await Plan.find({ ...keyword, group: req.user.groups[0] })
      .limit(pageSize)
      .skip(pageSize * (page - 1));
  
    res.json({ plans, page, pages: Math.ceil(count / pageSize) });
  });

  // @desc    Fetch single plan
// @route   GET /api/plans/:id
// @access  Public
const getPlanById = asyncHandler(async (req, res) => {
  // NOTE: checking for valid ObjectId to prevent CastError moved to separate
  // middleware. See README for more info.

  const plan = await Plan.findById(req.params.id);
  if (plan) {
    return res.json(plan);
  } else {
    // NOTE: this will run if a valid ObjectId but no plan was found
    // i.e. plan may be null
    res.status(404);
    throw new Error('Plan not found');
  }
});
  
// @desc    Create a plan
// @route   POST /api/plans
// @access  Private
const createPlan = asyncHandler(async (req, res) => {
    const { name, description, ideas, resources, tasks, market, demand, growth, rate, profit } = req.body;

    const plan = new Plan({
        group: req.user.groups[0],
        name,
        description,
        ideas,
        resources, 
        tasks, 
        market, 
        demand,
        growth,
        rate,
        profit
    });
  
    const createdPlan = await plan.save();
    res.status(201).json(createdPlan);
  });

  // @desc    Update a plan
// @route   PUT /api/plans/:id
// @access  Private/Admin
const updatePlan = asyncHandler(async (req, res) => {
  const { name, description, ideas, resources, tasks, market, demand, growth, rate, profit } =
    req.body;

  const plan = await Plan.findById(req.params.id);

  if (plan) {
    Object.assign(plan, {
      name,
      description,
      ideas,
      resources, 
      tasks, 
      market, 
      demand,
      growth,
      rate,
      profit
  })

    const updatedPlan = await plan.save();
    res.json(updatedPlan);
  } else {
    res.status(404);
    throw new Error('Plan not found');
  }
});

  // @desc    Delete a plan
// @route   DELETE /api/plans/:id
// @access  Private/Admin
const deletePlan = asyncHandler(async (req, res) => {
  const plan = await Plan.findById(req.params.id);

  if (plan) {
    await Plan.deleteOne({ _id: plan._id });
    res.json({ message: 'Plan removed' });
  } else {
    res.status(404);
    throw new Error('Plan not found');
  }
});

  export {
    getPlans,
    getPlanById,
    createPlan,
    updatePlan,
    deletePlan,
  };