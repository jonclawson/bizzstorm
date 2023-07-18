import mongoose from 'mongoose';

const planSchema = mongoose.Schema(
  {
    group: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'Idea',
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    ideas: [
    {        
        keyword: {
            type: String,
            requied: false,
        },
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            required: false,
            ref: 'Idea',
        },
    },
    ],
    resources:[ 
        {  
            name: {
                type: String,
                required: true,
            }, 
            cost: {
                type: Number,
                required: false,
            } 
        }
    ], 
    tasks: [ 
        {  
            name: {
                type: String,
                required: false,
            }, 
            time: {
                type: Number,
                required: false,
            } 
        }
    ], 
    market: {
        type: String,
        required: false,
    }, 
    demand: {
        type: Number,
        required: false,
    }, 
    growth: {
        type: Number,
        required: false,
    }, 
    rate: {
        type: Number,
        required: false,
    },
    profit: {
        type: Number,
        required: false,
    } 
  }
);

const Plan = mongoose.model('Plan', planSchema);

export default Plan;