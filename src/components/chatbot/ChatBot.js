import ChatBot from 'react-simple-chatbot';

function ChatBotApp() {
    return(
        <ChatBot
            steps={[
                {
                    id: 'hello-world',
                    message: 'Hello World!',
                    end: true,
                },
            ]}
        />
    );
};
export default ChatBotApp;