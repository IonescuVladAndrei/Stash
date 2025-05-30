import styled from "styled-components";
import Auth from "../feauters/Auth/Auth";

const OutsideBox = styled.div`
	padding-top: 6rem;
`;

function AuthPage() {
	return (
		<OutsideBox>
			<Auth />
		</OutsideBox>
	);
}

export default AuthPage;
