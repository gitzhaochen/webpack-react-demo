const areaReducer = (state, action) => {
    if (!state) return {
        area_type: 'red',
    }
    switch (action.type) {
        case 'CHANGE_TYPE':
            return { ...state, area_type: action.area_type }
        default:
            return state
    }
}
export default areaReducer