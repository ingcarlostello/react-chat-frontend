// @React
import React, { useReducer } from 'react';

// @Context
import { createContext } from "react";

// @Reducers
import { chatReducer } from './chatReducer';

export const ChatContext = createContext();

const initialState = {
    uid: '',
    userActiveChat: null,
    allUsers: [],
    messages: []
}

const ChatProvider = ({ children }) => {

    const [chatState, dispatch] = useReducer(chatReducer, initialState);

    return (
        <ChatContext.Provider value={{
            chatState,
            dispatch
        }}>
            {children}
        </ChatContext.Provider>
    );
};

export default ChatProvider;
