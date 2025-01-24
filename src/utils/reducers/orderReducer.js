const initialState = {
    orderLength: 0,
  };
  
  function orderReducer(state = initialState, action) {
    switch (action.type) {
      case 'SET_ORDER_LENGTH':
        return { ...state, orderLength: action.payload };
      default:
        return state;
    }
  }
  
  export default orderReducer;