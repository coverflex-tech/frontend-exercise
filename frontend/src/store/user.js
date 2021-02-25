import { atom, selector } from 'recoil';

export const userAtom = atom({
	key: 'user',
	default: ''
});

export const userBalanceAtom = atom({
	key: 'userBalance',
	default: 0
});

export const userProductsAtom = atom({
	key: 'userProducts',
	default: []
});

export const userState = selector({
	key: 'userState',
	get({ get }) {
		return get(userAtom);
	},
	set({ set }, user) {
		set(userAtom, user.user_id);
		set(userBalanceAtom, user.data.balance);
		set(userProductsAtom, user.data.product_ids);
	}
});
