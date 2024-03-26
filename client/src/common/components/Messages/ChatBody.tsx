import { useState } from "react";
import PageWrapper from "@/common/components/UI/PageWrapper";
import { useSelector } from "react-redux";
import { RootState } from "@/common/redux/store";
import socketActions from "@/common/utils/socketActions";

function ChatBody() {
  const { user } = useSelector((state: RootState) => state.user);
  let isTypingSignalSent = false;

  const socket = new WebSocket(`ws://127.0.0.1:8000/ws/chat/${user.user_id}/`);

  socket.onmessage = function (e) {
    const data = JSON.parse(e.data);
    console.log(data);
  };
  socket.onclose = function (e) {
    console.error("Chat socket closed unexpectedly");
  };

  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState({} as any);
  const [typing, setTyping] = useState(false);

  const chatMessageTypingHandler = (e: any) => {
    if (e.keyCode !== 13) {
      if (!isTypingSignalSent) {
        sendTypingSignal(true);
        isTypingSignalSent = true;
      }
      setTimeout(() => {
        sendTypingSignal(false);
        isTypingSignalSent = false;
      }, 3000);
    } else {
      isTypingSignalSent = false;
    }
  };

  const messageSubmitHandler = (event: any) => {
    event.preventDefault();
    if (inputMessage) {
      socket.send(
        JSON.stringify({
          action: socketActions.MESSAGE,
          message: inputMessage,
          user: user.pk,
          // roomId: CommonUtil.getActiveChatId(match),
        })
      );
    }
    setInputMessage("");
  };

  const sendTypingSignal = (typing: boolean) => {
    socket.send(
      JSON.stringify({
        action: socketActions.TYPING,
        typing: typing,
        user: user.pk,
        // roomId: CommonUtil.getActiveChatId(match),
      })
    );
  };

  return (
    <PageWrapper minHeight="85vh">
      <div className="col-12 col-sm-8 col-md-8 col-lg-8 col-xl-10 pl-0 pr-0">
        <div className="py-2 px-4 border-bottom d-none d-lg-block">
          <div className="d-flex align-items-center py-1">
            <div className="position-relative">
              {/* <img
                src={currentChattingMember?.image}
                className="rounded-circle mr-1"
                alt="User"
                width="40"
                height="40"
              /> */}
            </div>
            <div className="flex-grow-1 pl-3">
              {/* <strong>{currentChattingMember?.name}</strong> */}
            </div>
          </div>
        </div>
        <div className="position-relative">
          <div
            id="chat-message-container"
            className="chat-messages pl-4 pt-4 pr-4 pb-1 d-flex flex-column-reverse"
          >
            {typing && (
              <div className="chat-message-left chat-bubble mb-1">
                <div className="typing">
                  <div className="dot"></div>
                  <div className="dot"></div>
                  <div className="dot"></div>
                </div>
              </div>
            )}
            {messages?.results?.map((message: any, index: any) => (
              <div
                key={index}
                // className={getChatMessageClassName(message.user)}
              >
                <div>
                  {/* <img
                    src={message.userImage}
                    className="rounded-circle mr-1"
                    alt={message.userName}
                    width="40"
                    height="40"
                  /> */}
                  <div className="text-muted small text-nowrap mt-2">
                    {/* {CommonUtil.getTimeFromDate(message.timestamp)} */}
                  </div>
                </div>
                <div className="flex-shrink-1 bg-light ml-1 rounded py-2 px-3 mr-3">
                  <div className="font-weight-bold mb-1">
                    {message.userName}
                  </div>
                  {message.message}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex-grow-0 py-3 px-4 border-top">
          <form onSubmit={messageSubmitHandler}>
            <div className="input-group">
              <input
                onChange={(event) => setInputMessage(event.target.value)}
                onKeyUp={chatMessageTypingHandler}
                value={inputMessage}
                id="chat-message-input"
                type="text"
                className="form-control"
                placeholder="Type your message"
                autoComplete="off"
              />
              <button
                id="chat-message-submit"
                className="btn btn-outline-warning"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* <Box
        width="1200px"
        height="600px"
        border="4px solid black"
        borderRadius="12px"
        mx="auto"
        my="7rem"
      ></Box> */}
    </PageWrapper>
  );
}

export default ChatBody;
