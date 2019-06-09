

let initUserInfo = {
    userData: {},
}


const userinfoReducer = (state = initUserInfo, action) => {
    switch (action.type) {
        case 'login':
            const newState = {...state, userData: action.payload.userData};
            return newState;
        case 'logout':
            return state;
        default:
            return state;
    }
}

export default userinfoReducer;