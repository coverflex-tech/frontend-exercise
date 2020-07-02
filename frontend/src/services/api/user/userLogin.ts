import requestHandler from 'utils/requestHandler';

interface RequestParams {
    userName: string;
}

const userLogin = ({ userName }: RequestParams) =>
  requestHandler.get<UserDetails>(
    `/api/users/${userName}`,
    {},
  );

export default userLogin;
