import requestHandler from 'utils/requestHandler';

interface RequestParams {
    userName: string;
}

const loadUserDetails = ({ userName }: RequestParams) =>
  requestHandler.get<UserDetails>(
    `/api/users/${userName}`,
    {},
  );

export default loadUserDetails;

