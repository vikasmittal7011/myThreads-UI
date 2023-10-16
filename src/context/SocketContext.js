import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import userAtom from '../atoms/userAtom';
import { useEffect } from 'react';
import io from 'socket.io-client';

const { createContext } = require('react');

const SocketContext = createContext();

const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState();
  const [onlineUsers, setOnlineUsers] = useState();
  const user = useRecoilValue(userAtom);

  useEffect(() => {
    const socket = io('http://localhost:5000', {
      query: {
        userid: user?.id,
      },
    });

    setSocket(socket);

    socket.on('getOnlineUser', users => {
      setOnlineUsers(users);
      console.log(users);
    });

    return () => socket && socket.close();
  }, [user]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContextProvider;

export { SocketContext };
