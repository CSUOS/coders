import jwt from 'jsonwebtoken';
import { useCookies } from 'react-cookie';

const DecodeToken = (cookies) => {
	try {
		if (cookies === undefined || cookies === null) {
			return { id: null, name: null, intro: null, member_rank: null };
		}
		const accessToken = jwt.decode(cookies);
		return accessToken;
	} catch (e) {
		return null;
	}
};
const GetToken = () => {
	try {
		const [cookies] = useCookies(['access-token']);
		return DecodeToken(cookies['access-token']);
	} catch (e) {
		return null;
	}
};
export default GetToken;
