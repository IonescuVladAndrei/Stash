import styled from 'styled-components';

const Input = styled.input`
    border: 0.1rem solid var(--color-red-primary-800);
    background-color: var(--color-secondary-1);
    border-radius: var(--border-radius-sm);
    padding: ${(props) => props.$padding};
    box-shadow: var(--shadow-sm);
    width: ${(props) => props.$width};
    font-weight: 500;
    color: var(--color-grey-0);

    &::placeholder{
		color: var(--color-grey-300);
	}

    &:focus{
        outline: 0.2rem solid var(--color-red-primary-800);
        outline-offset: -1px;
    }
`;

Input.defaultProps = {
    $padding: '0.8rem 1.2rem',
    $width: 'auto',
};
export default Input;
