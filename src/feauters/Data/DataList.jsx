import styled from "styled-components";
import DataItem from "./DataItem";

const InfoP = styled.p`
	font-size: 2rem;
	font-weight: 600;
	color: var(--color-grey-100);
`;

function DataList({ data }) {

	return (
		<>
			{typeof data === "undefined" ? (
				<InfoP>Encryption key cannot be empty.</InfoP>
			) : data.length === 0 ? (
				<InfoP>Start by adding a new entry or reset the filter.</InfoP>
			) : (
				data.flat().map((obj, index) => {
					return <DataItem data={obj} key={index} />;
				})
			)}
		</>
	);
}
export default DataList;
