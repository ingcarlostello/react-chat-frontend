// @React
import React, { useContext, useState } from "react";

// @Context
import { AuthContext } from "../auth/AuthContext";
import { ChatContext } from "../context/chat/ChatContext";
import { SocketContext } from "../context/SocketContext";

export const SendMessage = () => {
    const [message, setMessage] = useState("");

    const { auth } = useContext(AuthContext);
    const { chatState } = useContext(ChatContext);
    const { socket } = useContext(SocketContext);


    const handleChange = ({ target }) => {
        setMessage(target.value);
    };


    const handleSubmit = (ev) => {
        ev.preventDefault();
        if (message.length === 0) return;

        setMessage("");

        // emit event to send a message
        socket.emit("private-message", {
            from: auth.uid,
            toWho: chatState.userActiveChat,
            message: message,
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="type_msg row">
                <div className="input_msg_write col-sm-9">
                    <input
                        type="text"
                        className="write_msg"
                        placeholder="Mensaje..."
                        value={message}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-sm-3 text-center">
                    <button className="msg_send_btn mt-3" type="submit">
                        enviar
                    </button>
                </div>
            </div>
        </form>
    );
};
