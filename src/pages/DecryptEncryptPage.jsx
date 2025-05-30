import styled from "styled-components";
import DecryptEncryptForm from "../feauters/Decrypt-encrypt/DecryptEncryptForm";

const InfoP = styled.p`
	font-size: 2rem;
	font-weight: 600;
	color: var(--color-grey-200);
	margin-bottom: 6rem;
    margin-top: 4rem;

	@media (max-width: 600px) {
		font-size: 1.7rem;
		font-weight: 500;
	}
`;

function DecryptEncryptPage() {
	return (
		<div>
			<InfoP>This action will decrypt both tags and data using the old key and encrypt using the new key.</InfoP>
			<DecryptEncryptForm />
		</div>
	);
}

export default DecryptEncryptPage;
