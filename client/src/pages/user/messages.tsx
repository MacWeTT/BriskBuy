import ChatBody from '@/common/components/Messages/ChatBody';
import { useState } from 'react';

function Messages() {
 const [currentChattingMember, setCurrentChattingMember] = useState({});
 const [onlineUserList, setOnlineUserList] = useState([]);

 return (
   <main className="content">
     <div className="container-fluid p-0">
       <div className="container-fluid">
         <div className="row g-0">
           <Sidebar
             setCurrentChattingMember={setCurrentChattingMember}
             onlineUserList={onlineUserList}
           />
           <ChatBody
             setOnlineUserList={setOnlineUserList}
             currentChattingMember={currentChattingMember}
           />
         </div>
       </div>
     </div>
   </main>
 );

}

export default Messages;
