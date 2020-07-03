export const actionCreator = <T>(type: string): ActionCreator<T> =>
    Object.assign((payload: T): any => ({ type, payload }), { type });

export const genericActionCreator = (type: string): GenericActionCreator =>
    Object.assign((): any => ({ type }), { type });

export const isType = <T>(action: ActionBase, actionCreatorArg: ActionCreator<T>):
    action is Action<T> => action.type === actionCreatorArg.type;
