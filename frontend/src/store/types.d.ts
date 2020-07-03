interface State {
    user: UserState;
}

interface UserState {
    userId: string;
    balance: number;
    productIds: string[];
    fetching: boolean;
    error: boolean;
}

interface ActionBase {
    readonly type: string;
}

interface Action<T> extends ActionBase {
    readonly payload: T;
}

interface ActionCreatorBase {
    readonly type: string;
}

interface ActionCreator<T> extends ActionCreatorBase {
    (payload: T): Action<T>;
}

interface GenericActionCreator {
    readonly type: string;
    (): Action<void>;
}
