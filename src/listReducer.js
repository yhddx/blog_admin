
let initList = {
    articles: [],
    userData: {},
}

const listReducer = (state = initList, action) => {
    switch (action.type) {
        case 'SAVELIST':
            const newState1 = {...state, articles: action.articles};
            return newState1;
        default:
            return state;
    }
}

export default listReducer;