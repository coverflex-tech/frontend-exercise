import axios from 'axios';

export const CALL_API = Symbol('CALL_API');

export default () => {
  return next => async action => {
    const callAPI = action[CALL_API];

    if (callAPI === undefined) { return next(action); }

    const { meta, payload, request, types } = callAPI;
    const [PENDING, FULFILLED, REJECTED] = types;

    next({ meta, type: PENDING });

    try {
      const result = await axios({
        ...request,
        validateStatus: status => status < 400
      });

      return next({
        meta,
        payload: payload(result.data),
        type: FULFILLED
      });
    } catch (error) {
      let payload = { code: 'unexpected_error', message: 'Unexpected Error' };

      if (error.response) {
        const { data, status } = error.response;

        payload = { ...data, status };
      }

      next({ meta, payload, type: REJECTED });

      throw error;
    }
  };
};
