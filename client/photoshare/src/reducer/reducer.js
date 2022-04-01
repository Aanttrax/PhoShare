let initialState = {
    users: []
};

const todos = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_PAGE':
            return {
                ...state,
                usersPage: action.payload
            }

        default:
            return state
    }
}

export default todos;