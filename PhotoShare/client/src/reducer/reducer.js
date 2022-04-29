let initialState = {
    users: []
};

const todos = (state = initialState, action) => {
    switch (action.type) {

        case 'GET_START':
            return {
                ...state,
                users: action.payload
            }  

        default:
            return state
    }
}

export default todos;