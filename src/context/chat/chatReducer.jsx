// @Types
import { types } from "../../types/types";

export const chatReducer = (state, action) => {
  switch (action.type) {
    case types.usersLoaded:
      return {
        ...state,
        allUsers: [...action.payload]
      }



    case types.activeUserChat:
      if (state.userActiveChat === action.payload) return state
      return {
        ...state,
        userActiveChat: action.payload
      }



    case types.newMessage:
      if (state.userActiveChat === action.payload.from || state.userActiveChat === action.payload.toWho) {
        return {
          ...state,
          messages: [...state.messages, action.payload]
        }
      } else {
        return state
      }



    case types.loadChatMessages:
      return {
        ...state,
        // messages: action.payload  ----> way 1
        messages: [...action.payload] // ----> way 2
      }



    case types.cleanChat:
      return {
        uid: '',
        userActiveChat: null,
        allUsers: [],
        messages: []
      }

    default:
      return state;
  }
};
