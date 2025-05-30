import { useState } from "react";
import toast from "react-hot-toast";
import styled, { css } from "styled-components";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { useDeleteData } from "../../mutations/useDeleteData";
import ButtonSvg from "../../ui/Buttons/ButtonSvg";
import ConfirmAction from "../../ui/ConfirmAction";
import Modal from "../../ui/Modal";
import EditDataModal from "./EditDataModal";
import { NewDataProvider } from "./NewDataContext";
import { getTagValById } from "../../utils/dataFormat";
import { useQueryClient } from "@tanstack/react-query";
import { TAGS_QUERY_KEY } from "../../queries/queryKeys";

const ItemBox = styled.div`
	display: grid;
	grid-template-columns: 1fr minmax(10rem, 15dvw) 2.5rem;
	column-gap: 0.4rem;

	background: linear-gradient(var(--color-primary-bg), var(--color-primary-bg)) padding-box,
		linear-gradient(to bottom right, var(--color-primary-bg) 5%, var(--color-red-primary-800), var(--color-primary-bg) 95%) border-box;
	border-radius: var(--border-radius-sm);
	border-left: 0.1rem solid transparent;
	border-bottom: 0.3rem solid transparent;

	margin-bottom: 3rem;

	@media (max-width: 800px) {
		grid-template-columns: 1fr 2.5rem;
		grid-template-rows: auto auto;

		grid-template-areas:
			"item1 item3"
			"item2 item2";

		& > :nth-child(1) {
			grid-area: item1;
		}

		& > :nth-child(2) {
			grid-area: item2;
			padding-left: 2rem;
		}

		& > :nth-child(3) {
			grid-area: item3;
		}
	}
`;

const TagsBox = styled.div`
	display: flex;
	flex: 1 1 0%;
	flex-wrap: wrap;
	gap: 0.8rem;
	padding-bottom: 0.8rem;

	overflow: auto;
`;

const StyledTagOutside = styled.div`
	display: flex;
	align-items: center;
	border-left: 0.1rem solid;
	background-color: var(--color-red-primary-800);
	border-radius: var(--border-radius-sm);
	width: fit-content;
	height: fit-content;
`;

const StyledTag = styled.div`
	color: var(--color-grey-100);
	padding: 0.15rem 0.8rem;
	border: 0.1rem solid transparent;
	border-radius: var(--border-radius-sm);
	border: transparent;
	display: flex;
	user-select: none;

	@media (max-width: 600px) {
		font-size: 1.4rem;
	}
`;

const NameP = styled.p`
	font-size: 2.4rem;
	font-weight: 600;
	color: var(--color-grey-100);
	padding-left: 2rem;

	@media (max-width: 800px) {
		font-size: 2rem;
	}

	@media (max-width: 600px) {
		font-size: 1.8rem;
		font-weight: 500;
	}
`;

const OtherP = styled.p`
	font-size: 2rem;
	font-weight: 500;
	color: var(--color-grey-300);
	padding-left: 2rem;

	@media (max-width: 800px) {
		font-size: 1.6rem;
	}

	@media (max-width: 600px) {
		font-size: 1.4rem;
		font-weight: 400;
	}
`;

const OtherBox = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.4rem;
	margin-top: 2rem;
	margin-bottom: 2rem;
`;

const OtherValBox = styled.div`
	display: flex;
	align-items: center;
	gap: 1rem;
`;

const CopyButton = styled.button`
	padding: 0;
	border: none;
	height: fit-content;
	background-color: transparent;

	&:focus {
		outline: none;
	}
`;

const OptionsBoxAnchor = styled.div`
	position: relative;
`;

const OptionsBox = styled.div`
	position: absolute;
	display: flex;
	flex-direction: column;
	right: 0;
	top: 0;
	width: 8rem;

	background-color: var(--color-grey-900);

	${(props) =>
		!props.$showOptions &&
		css`
			display: none;
		`}
`;

export const OptionButton = styled.button`
	background-color: transparent;
	color: var(--color-grey-200);
	border: none;

	font-size: 1.6rem;
	padding: 0.2rem 0.4rem;
	font-weight: 450;

	display: flex;
	justify-content: flex-start;

	transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
	transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
	transition-duration: 150ms;

	&:hover&:not(:disabled) {
		background-color: var(--color-grey-700);
	}

	&:focus {
		outline: none;
	}
`;

const OPENS_DEL = "delete-data";

function DataItem({ data }) {
	// Component is not rendered until the query for tags has finished
	const queryClient = useQueryClient();
	const tags = queryClient.getQueryData([TAGS_QUERY_KEY]);

	const [showOptions, setShowOptions] = useState(false);
	const { deleteData, isPending: isPendingDelete } = useDeleteData();

	return (
		<ItemBox>
			<div>
				<NameP>{data.name}</NameP>
				<OtherBox>
					{data.other.map((ot, otherIndex) => (
						<Other key={otherIndex} other={ot} />
					))}
				</OtherBox>
			</div>
			<TagsBox>
				{getTagValById(tags, data.tags).map((tag, tagIndex) => (
					<StyledTagOutside key={tagIndex}>
						<StyledTag>{tag}</StyledTag>
					</StyledTagOutside>
				))}
			</TagsBox>
			<OptionsBoxAnchor>
				<ButtonSvg type={"more"} onClick={() => setShowOptions((so) => !so)} />
				<OptionsBox $showOptions={showOptions} ref={useOutsideClick(() => setShowOptions(false))}>
					<NewDataProvider>
						<EditDataModal data={data} tags={tags} onClick={() => setShowOptions(false)} />
					</NewDataProvider>

					<Modal>
						<Modal.Open opens={OPENS_DEL}>
							<OptionButton disabled={isPendingDelete} onClick={() => setShowOptions(false)}>
								<span>{isPendingDelete ? "Deleting" : "Delete"}</span>
							</OptionButton>
						</Modal.Open>
						<Modal.Window name={OPENS_DEL}>
							<ConfirmAction
								confirmActionText={"Delete"}
								description={
									<span>
										Are you sure you want to delete <span style={{ color: "var(--color-grey-100)" }}>{data.name}</span>?
									</span>
								}
								heading={"Delete tag"}
								onClickConfirmAction={() => {
									deleteData({ id: data.id });
								}}
							/>
						</Modal.Window>
					</Modal>
				</OptionsBox>
			</OptionsBoxAnchor>
		</ItemBox>
	);
}

function Other({ other }) {
	const [show, setShow] = useState(false);

	const isMobile = window.innerWidth <= 800;

	function handleCopy() {
		navigator.clipboard
			.writeText(other)
			.then(() => toast.success("Text copied"))
			.catch(() => toast.error("Failed to copy"));
	}

	function handleClickBox() {
		if (isMobile) {
			setShow((prev) => !prev);
		}
	}

	return (
		<OtherValBox onMouseEnter={() => !isMobile && setShow(true)} onMouseLeave={() => !isMobile && setShow(false)} onClick={handleClickBox}>
			<OtherP>{other}</OtherP>
			{show && (
				<CopyButton
					onClick={(e) => {
						e.stopPropagation();
						handleCopy();
					}}
				>
					<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="var(--color-grey-300)">
						<path d="M216-144q-29.7 0-50.85-21.15Q144-186.3 144-216v-528q0-29.7 21.15-50.85Q186.3-816 216-816h171q8-31 33.5-51.5T480-888q34 0 59.5 20.5T573-816h171q29.7 0 50.85 21.15Q816-773.7 816-744v528q0 29.7-21.15 50.85Q773.7-144 744-144H216Zm0-72h528v-528h-72v120H288v-120h-72v528Zm263.79-528q15.21 0 25.71-10.29t10.5-25.5q0-15.21-10.29-25.71t-25.5-10.5q-15.21 0-25.71 10.29t-10.5 25.5q0 15.21 10.29 25.71t25.5 10.5Z" />
					</svg>
				</CopyButton>
			)}
		</OtherValBox>
	);
}

export default DataItem;
