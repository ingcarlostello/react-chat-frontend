// @React
import React, { useContext } from 'react'

// @Context
import { AuthContext } from '../auth/AuthContext';
import { ChatContext } from '../context/chat/ChatContext'

// @Components
import { SidebarChatItem } from './SidebarChatItem'

export const Sidebar = () => {

    const { auth } = useContext(AuthContext);
    const { chatState } = useContext(ChatContext);

    const { uid } = auth

    return (
        <div className="inbox_chat">
            {
                chatState.allUsers.filter((user) => user.uid !== uid).map((user) => (
                    <SidebarChatItem
                        key={user.uid}
                        userName={user}
                    />
                ))
            }
            <div className="extra_space"></div>
        </div>
    )
}
