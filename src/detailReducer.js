
let initDetail = {
    detailStatus: 0,
    detailMessage: "",
    article: {},
}

const detailReducer = (state = initDetail, action) => {
    switch (action.type) {
        case 'DETAIL':
            return {...state, article: action.payload.article};
        default:
            return state;
    }

}

export default detailReducer;