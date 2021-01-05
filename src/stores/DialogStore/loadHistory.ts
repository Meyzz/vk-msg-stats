export const loadHistory = (offset: number, loadCount: number, id: number) => `
    var loadCount = ${loadCount};
    
    var loadIndex = 0;
    
    var messages = [];
    
    var initialOffset = ${offset};
    
     while (loadIndex < loadCount) {
         var offset = 200 * loadIndex + initialOffset;
         var messagesResp = API.messages.getHistory({offset: offset, count: 200, peer_id: ${id}});
         loadIndex = loadIndex + 1;
         messages.push(messagesResp.items);
     }

    return {messages: messages};
`;
