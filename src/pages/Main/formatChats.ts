import { Chat, GetChatsResponse } from 'stores/ChatsStore/types';
import { FormattedChat } from 'pages/Main/types';

export const formatChats = (resp: GetChatsResponse): FormattedChat[] => {
  return resp.chats.items.map((item: Chat) => {
    const { conversation } = item;
    const {
      peer: { type, id, local_id },
    } = conversation;
    let title = '';
    let photo_50 = '';
    let count = 0;

    if (type === 'user') {
      const foundProfile = resp.chats.profiles.find((p) => p.id === id);

      if (foundProfile) {
        title = `${foundProfile.first_name} ${foundProfile.last_name}`;
        photo_50 = foundProfile.photo_50;
      }
    }

    if (type === 'chat' && conversation.chat_settings) {
      title = conversation.chat_settings.title;
      photo_50 = conversation.chat_settings.photo.photo_50;
    }

    if (type === 'group') {
      const foundGroup = resp.chats.groups?.find((g) => g.id === local_id);
      if (foundGroup) {
        title = foundGroup.name;
        photo_50 = foundGroup.photo_50;
      }
    }

    const foundHistory = resp.histories.find(h => h.id === id);

    if (foundHistory) {
      count = foundHistory.count;
    }

    return { type, id, photo_50, title, count };
  });
};
