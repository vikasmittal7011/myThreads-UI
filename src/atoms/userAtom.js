import { atom } from 'recoil';

const userAtom = atom({
  key: 'userAtom',
  default: localStorage.getItem('id') || null,
});

export default userAtom;
