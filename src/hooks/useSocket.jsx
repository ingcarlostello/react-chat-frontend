// @React
import { useCallback, useEffect, useState } from 'react';

// @Package
import io from 'socket.io-client';


export const useSocket = (serverPath) => {

    // const socket = useMemo(() => io.connect( serverPath, {transports: ['websocket']} ), [ serverPath ] );
    const [socket, setSocket] = useState(null)
    const [online, setOnline] = useState(false);

    // save the function in memory and does not create it again
    const connectSocket = useCallback(() => {
        const token = localStorage.getItem('token');

        const socketTemp = io.connect(serverPath, {
            transports: ['websocket'],
            autoConnect: true,
            forceNew: true,
            query: {
                'x-token': token
            }
        });

        setSocket(socketTemp);
    }, [serverPath])

    const disconnectSocket = useCallback(() => {
        socket?.disconnect();
    }, [socket]);



    useEffect(() => {
        setOnline(socket?.connected);
    }, [socket])



    useEffect(() => {
        // if socket exist
        socket?.on('connect', () => setOnline(true));
    }, [socket])



    useEffect(() => {
        // if socket exist
        socket?.on('disconnect', () => setOnline(false));
    }, [socket])

    return {
        connectSocket,
        disconnectSocket,
        online,
        socket,
    }
}