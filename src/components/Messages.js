// @React
import React, { useContext } from "react";

// @Context
import { AuthContext } from "../auth/AuthContext";
import { ChatContext } from "../context/chat/ChatContext";

// @Components
import { IncomingMessage } from "./IncomingMessage";
import { OutgoingMessage } from "./OutgoingMessage";
import { SendMessage } from "./SendMessage";

export const Messages = () => {
  const { auth } = useContext(AuthContext);
  const { chatState } = useContext(ChatContext);

  return (
    <div className="mesgs">
      <div id="div-messages" className="msg_history">
        {chatState.messages.map((msg) =>
          msg.toWho === auth.uid ? (
            <IncomingMessage key={msg._id} msg={msg} />
          ) : (
            <OutgoingMessage key={msg._id} msg={msg} />
          )
        )}
      </div>
      <SendMessage />
    </div>
  );
};
