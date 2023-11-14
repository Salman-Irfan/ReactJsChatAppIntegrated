import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ChatContext = createContext()

const ChatProvider = ({ children }) => {
    const navigate = useNavigate()
    // state variables
    const [user, setUser] = useState()
    const [selectedChat, setSelectedChat] = useState()
    const [chats, setChats] = useState([])
    
    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"))
        const authToken = localStorage.getItem("authtoken")
        if(authToken){
            userInfo.token=authToken
        }
        setUser(userInfo)

        if (!userInfo) {
            navigate('/')
        }else {
            navigate('/chats')
        }
    }, [navigate])


    return (
        <ChatContext.Provider
            value={{ 
                user, setUser, 
                selectedChat, setSelectedChat,
                chats, setChats
            }}
        >
            {children}
        </ChatContext.Provider>
    )
}

export const ChatState = () => {
    return useContext(ChatContext)
}

export default ChatProvider