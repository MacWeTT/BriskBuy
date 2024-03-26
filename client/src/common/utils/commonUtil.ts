const getActiveChatId = (match: any) => {
  return match && match.params ? match.params.chatId : null;
};
