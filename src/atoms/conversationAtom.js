import { atom } from 'recoil';

const conversationsAtom = atom({
  key: 'conversationsAtom',
  default: {
    conversations: [],
    loading: true,
  },
});

export const messagesAtom = atom({
  key: 'messagesAtom',
  default: {
    messages: [],
    loading: true,
  },
});

export const selectedConversactionAtom = atom({
  key: 'selectedConversation',
  default: {
    id: '',
    userId: '',
    username: '',
    image: '',
  },
});

export default conversationsAtom;
