export const loadChatsExecute = (options: object = {}) => `
    var chats = API.messages.getConversations(${JSON.stringify(options)});
    
    var index = 0;
    
    var histories = [];
    
    while (index < chats.items.length) {
        var peerId = chats.items[index].conversation.peer.id;
        var history = API.messages.getHistory({"count": 1, "peer_id": peerId});
        histories.push({count: history.count, id: peerId });
        index = index + 1;
    }
    
    return {chats: chats, histories: histories};
`;
