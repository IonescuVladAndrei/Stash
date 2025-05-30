import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import styled from "styled-components";
import { useKeyEdit } from "../../context/KeyContext";
import { useData } from "../../queries/useData";
import { useDataLastSave } from "../../queries/useDataLastSave";
import { useTags } from "../../queries/useTags";
import ButtonSvg from "../../ui/Buttons/ButtonSvg";
import Form from "../../ui/Form/Form";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinners/Spinner";
import { groupByDepthWithParentId } from "../../utils/dataFormat";
import { DataProvider, useDataEdit } from "./DataContext";
import DataList from "./DataList";
import { NewDataProvider } from "./NewDataContext";
import NewDataModal from "./NewDataModal";
import TagMultiSelect from "./TagMultiSelect";

const ResultsBox = styled.div`
	display: flex;
	justify-content: center;
	margin-top: 6rem;
	margin-bottom: 6rem;
`;

const ResultsP = styled.p`
	font-size: 1.6rem;
	font-weight: 500;
	color: var(--color-grey-300);
	width: fit-content;
`;

const SearchBox = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 0.8rem;
	margin-bottom: 2rem;
	position: relative;
	width: fit-content;
	margin-left: auto;
	margin-right: auto;

	@media (max-width: 400px) {
		& > *:nth-child(3) {
			display: none;
		}
	}
`;

const InputBox = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;

	width: 50rem;
	@media (max-width: 800px) {
		width: 30rem;
	}

	@media (max-width: 400px) {
		width: 20rem;
	}
`;

const AbsoluteBox = styled.div`
	position: absolute;
	right: 4.5rem;
	height: 3rem;

	@media (max-width: 400px) {
		right: 0.8rem;
	}
`;

const MultiSelectBox = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;

	@media (max-width: 600px) {
		grid-template-columns: 1fr;
	}
`;

const InfScrollBox = styled.div`
	height: 1px;
`;

function Data() {
	const { key } = useKeyEdit();
	const { data, isLoading: isLoadingData, fetchNextPage, isFetchingNextPage, hasNextPage } = useData(key);
	const { tags, isLoading: isLoadingTags } = useTags(key);
	const { dataLastSave, isLoading: isLoadingDataLastSave } = useDataLastSave();

	const { ref, inView } = useInView({ threshold: 1.0 });

	useEffect(() => {
		if (inView) {
			fetchNextPage();
		}
	}, [inView, fetchNextPage]);

	useEffect(() => {
		const checkIfScreenFilled = () => {
			if (!isLoadingData && !isFetchingNextPage && hasNextPage && document.documentElement.scrollHeight <= window.innerHeight) {
				fetchNextPage();
			}
		};

		checkIfScreenFilled();
	}, [isLoadingData, isFetchingNextPage, hasNextPage, fetchNextPage]);

	if (isLoadingTags) return <Spinner />;

	return (
		<>
			<DataProvider tags={tags}>
				<DataForm tags={tags} res={data?.pages[0].res ?? "..."} totalNrOfRes={data?.pages[0]?.totalNrOfRes ?? "..."} />
			</DataProvider>

			<NewDataProvider>
				<NewDataModal tags={tags} dataLastSave={dataLastSave} isLoadingDataLastSave={isLoadingDataLastSave} />
			</NewDataProvider>

			{isLoadingData ? <Spinner /> : <DataList data={data.pages.map((d) => d.data)} />}

			{!isLoadingData && <InfScrollBox ref={ref}></InfScrollBox>}

			{isFetchingNextPage && <Spinner />}
		</>
	);
}

function DataForm({ tags, res, totalNrOfRes }) {
	const { name, setName, handleNameParam, selectedTags, handleTagParam, handleMultipleTags } = useDataEdit();

	const allGroupedTags = typeof tags !== "undefined" ? groupByDepthWithParentId(tags) : [];
	const selectedTagIds = selectedTags.map((tag) => tag.value);

	return (
		<>
			<Form>
				<SearchBox>
					<InputBox>
						<Input
							value={name}
							onChange={(e) => setName(e.target.value)}
							placeholder="Search by name..."
							$width={"100%"}
							$padding={"1.2rem 4.5rem 1.2rem 1.2rem"}
						/>
					</InputBox>
					<AbsoluteBox>
						<ButtonSvg
							type={"search"}
							onClick={(e) => {
								e.preventDefault();
								handleNameParam(name);
							}}
						/>
					</AbsoluteBox>
					<ButtonSvg
						type={"trash"}
						onClick={(e) => {
							e.preventDefault();
							handleNameParam("");
						}}
					/>
				</SearchBox>

				<MultiSelectBox>
					<div></div>
					<TagMultiSelect
						allGroupedTags={allGroupedTags}
						selectedTagIds={selectedTagIds}
						setSelectedTags={({ value, parentId }) => handleTagParam({ tagId: value, parentId })}
						removeSelectedTagIds={handleMultipleTags}
					/>
				</MultiSelectBox>

				<ResultsBox>
					<ResultsP>
						Showing {res} results out of {totalNrOfRes}
					</ResultsP>
				</ResultsBox>
			</Form>
		</>
	);
}

export default Data;
