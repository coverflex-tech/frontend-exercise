import { CALL_API } from '../state/middlewares/api';
import { identity } from 'lodash';

export default ({ meta, request, types }) => {
  const { config = {}, data, method = 'GET', payload = identity, url } = request;
  const headers = [];

  return {
    [CALL_API]: {
      meta,
      payload,
      request: { config, data, headers, method, url },
      types
    }
  }
};
