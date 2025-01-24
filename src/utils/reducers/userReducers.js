const initialState = {
    isLogin:false,
    role:"",
    user:null
  };
  
  function userReducer(state = initialState, action) {
    switch (action.type) {
      case "UPDATED":
        return {...state,
          user: action.payload,
        };
            case "LOGIN_SUCCESS":
              return {...state,
                isLogin: true,
                role: action.payload.role,
                user: action.payload.user_info,
              };
                case "LOGOUT_USER":
                  console.log("LOGOUT_USER triggered");
                  return {...state,
                    isLogin: false,
                    role:"",
                    user: null,
                  };
      default:
        return state;
    }
  }
  
  export default userReducer;