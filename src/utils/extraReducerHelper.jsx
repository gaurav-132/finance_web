export const buildExtraReducers = (thunks) => {
    const extraReducers = {};

    thunks.forEach((thunk) => {
        extraReducers[`${thunk.name}/pending`] = (state) => {
            state[`${thunk.name}Status`] = 'loading';
            state.error = null;
        };
        extraReducers[`${thunk.name}/fulfilled`] = (state, action) => {
            state[`${thunk.name}Status`] = 'succeeded';
            // Use action.payload directly to update state
            Object.keys(action.payload).forEach((key) => {
                console.log(`${key} : ${action.payload[key]}`);
                state[key] = action.payload[key];
            });
        };
        extraReducers[`${thunk.name}/rejected`] = (state, action) => {
            state[`${thunk.name}Status`] = 'failed';
            state.error = action.payload;
        };
    });

    return extraReducers;
};
