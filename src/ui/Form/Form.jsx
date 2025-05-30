import styled from "styled-components";

/**
 * Form component.
 */
const Form = styled.form`
	padding: 2.4rem 4rem;
	overflow: hidden;
	font-size: 1.4rem;

	@media (max-width: 980px) {
		padding: 1.2rem 2rem;
	}

	@media (max-width: 500px) {
		padding: 1.2rem 1rem;
	}
`;

export default Form;
