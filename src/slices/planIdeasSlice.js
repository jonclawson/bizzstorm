import { createSlice } from '@reduxjs/toolkit';

const initialState = localStorage.getItem('planIdeas')
  ? JSON.parse(localStorage.getItem('planIdeas'))
  : { planIdeas: [] };


const planIdeasSlice = createSlice({
    name: 'planIdeas',
    initialState,
    reducers: {
      addToPlanIdeas: (state, action) => {
        const idea = action.payload;
  
        const existIdea = state.planIdeas.find((x) => x._id === idea._id);
  
        if (existIdea) {
          state.planIdeas = state.planIdeas.map((x) =>
            x._id === existIdea._id ? idea : x
          );
        } else {
          state.planIdeas = [...state.planIdeas, idea];
        }
        localStorage.setItem('planIdeas', JSON.stringify(state));

        return (state);
      },
      removeFromPlanIdeas: (state, action) => {
        state.planIdeas = state.planIdeas.filter((x) => x._id !== action.payload);
        localStorage.setItem('planIdeas', JSON.stringify(state));

        return (state);
      },
      clearPlanIdeas: (state) => {
        state.planIdeas = [];
        localStorage.setItem('planIdeas', JSON.stringify(state));
      },
    },
  });
  
  export const {
    addToPlanIdeas,
    removeFromPlanIdeas,
    clearPlanIdeas,
  } = planIdeasSlice.actions;
  
  export default planIdeasSlice.reducer;