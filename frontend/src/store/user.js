import { atom, selector } from 'recoil';

export const userAtom = atom({
	key: 'userAtom',
	default: ''
});

export const userBalanceAtom = atom({
	key: 'userBalanceAtom',
	default: 0
});

export const userProductsAtom = atom({
	key: 'userProductsAtom',
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

export const userInfoState = selector({
	key: 'userProducts',
	get({ get }) {
		return {
			products: get(userProductsAtom),
			balance: get(userBalanceAtom)
		};
	},
	set({ set }, items) {
		items.forEach(({ id, price }) => {
			set(userProductsAtom, (products) => [...products, id]);
			set(userBalanceAtom, (balance) => balance - price);
		});
	}
});
