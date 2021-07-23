// @React
import React, { useContext, useEffect } from 'react';
import { createContext } from 'react';

// @Context
import { AuthContext } from '../auth/AuthContext';
import { ChatContext } from './chat/ChatContext';

// @Helpers
import { scrollToBottomAnimated } from '../helpers/scrollToBottom';

// @Custom Hooks
import { useSocket } from '../hooks/useSocket'

// @Types
import { types } from '../types/types';



export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {

    const { socket, online, connectSocket, disconnectSocket } = useSocket('http://localhost:8080');
    
    const {auth} = useContext(AuthContext)
    const {dispatch} = useContext(ChatContext)

    useEffect(() => {
        if(auth.logged){
            connectSocket();
        }       
    }, [auth, connectSocket])

    useEffect(() => {
        if(!auth.logged){
            disconnectSocket();
        }       
    }, [auth, disconnectSocket])

    useEffect(() => {
       socket?.on('list-users', (users) => {
           dispatch({
               type: types.usersLoaded,
               payload: users
           })
       })
    }, [socket, dispatch])


    useEffect(() => {
        socket?.on('private-message', (message) => {
            dispatch({
                type: types.newMessage,
                payload: message
            });
            scrollToBottomAnimated('div-messages');
        })
     }, [socket, dispatch])
    
    return (
        <SocketContext.Provider value={{ socket, online }}>
            { children }
        </SocketContext.Provider>
    )
}