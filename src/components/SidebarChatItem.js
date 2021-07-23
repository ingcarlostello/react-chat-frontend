// @React
import React, { useContext } from "react";

// @Context
import { ChatContext } from "../context/chat/ChatContext";

// @Helpers
import { fetchConToken } from "../helpers/fetch";
import { scrollToBottom } from "../helpers/scrollToBottom";

// @Types
import { types } from "../types/types";

export const SidebarChatItem = ({ userName }) => {

  const { dispatch, chatState } = useContext(ChatContext);

  const openUserChatClick = async () => {
    dispatch({
      type: types.activeUserChat,
      payload: userName.uid
    });

    //load chat messages
    const resp = await fetchConToken(`messages/${userName.uid}`);

    dispatch({
      type: types.loadChatMessages,
      payload: resp.messages
    })
    scrollToBottom('div-messages');
  };

  return (
    <div
      className={`chat_list ${userName.uid === chatState.userActiveChat && ' active_chat'}`}
      onClick={openUserChatClick}
    >
      <div className="chat_people">
        <div className="chat_img">
          <img
            src="https://www.pngkey.com/png/detail/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png"
            alt="sunil"
          />
        </div>
        <div className="chat_ib">
          <h5>{userName.name}</h5>
          {userName.online ? (
            <span className="text-success">Online</span>
          ) : (
            <span className="text-danger">Offline</span>
          )}
        </div>
      </div>
    </div>
  );
};
