import styled from "styled-components";
import Header from "../ui/Header";
import { Outlet } from "react-router-dom";

const StyledAppLayout = styled.div`
	height: 100dvh;
`;

const MainContainer = styled.div`
	overflow: auto;
`;

const SecondaryContainer = styled.main`
	background-color: var(--color-primary-bg);
	padding: 6rem 3rem 20rem;

	min-height: calc(100dvh - 5.6rem);
	/* - Header */
`;

const ChildContainer = styled.div`
	max-width: 140rem;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	gap: 3rem;
`;

function AppLayout() {
	return (
		<StyledAppLayout>
			<Header />
			<MainContainer>
				<SecondaryContainer>
					<ChildContainer>
						<Outlet />
					</ChildContainer>
				</SecondaryContainer>
			</MainContainer>
		</StyledAppLayout>
	);
}

export default AppLayout;
