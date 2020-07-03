
import { useSelector } from 'react-redux';

export const useUserDetails = () => useSelector((state: State) => state.user); 