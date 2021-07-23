// @React
import React, { useContext } from 'react';

// @Components
import { ChatSelect } from '../components/ChatSelect';
import { InboxPeople } from '../components/InboxPeople';
import { Messages } from '../components/Messages';

// @Context
import { ChatContext } from '../context/chat/ChatContext';

// @Styles
import '../css/chat.css';


export const ChatPage = () => {
    const { chatState } = useContext(ChatContext)
    return (
        <div className="messaging">
            <div className="inbox_msg">

                <InboxPeople />
                {
                    (chatState.userActiveChat)
                        ? <Messages />
                        : <ChatSelect />
                }
            </div>
        </div>
    )
}
