import jwt from 'jsonwebtoken';
import { useCookies } from 'react-cookie';

const DecodeToken = (cookies) => {
	try {
		const accessToken = jwt.decode(cookies);
		return accessToken;
	} catch (e) {
		return e;
	}
};
const GetToken = () => {
	const [cookies] = useCookies(['access-token']);
	return DecodeToken(cookies['access-token']);
};
export default GetToken;
