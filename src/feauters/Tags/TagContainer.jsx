import styled from "styled-components";
import Input from "../../ui/Input";
import ButtonSvg from "../../ui/Buttons/ButtonSvg";
import { useState } from "react";
import { useTagsEdit } from "./TagContext";
import Modal from "../../ui/Modal";
import ConfirmAction from "../../ui/ConfirmAction";

const OPENS_DEL = "delete-tag";

const OutsideBox = styled.div`
	height: 50px;
	display: flex;
`;

const SvgBox = styled.div`
	height: 5rem;
	width: 4rem;
`;

const InputBox = styled.div`
	display: flex;
	align-items: center;
	width: 35rem;
`;

const ButtonsBox = styled.div`
	display: flex;
	align-items: center;
	gap: 0.4rem;
	margin-left: 0.4rem;
`;

const TagP = styled.p`
	color: ${(props) => (props.$highlight ? "var(--color-blue-700)" : "var(--color-grey-300)")};
	font-size: 2.5rem;
	font-weight: 700;
	margin-left: 0.4rem;
	
`;

const TagValueSpan = styled.span`
	color: var(--color-grey-0);
`;

function TagContainer({
	tag,
	onMouse,
	highlightedTagIds = [],
	isEditMode = false,
	depth = 0,
	parentId,
	isLastChild = false,
	isFirstChild = false,
	straightSvgArr = [],
}) {
	const [showEditBox, setShowEditBox] = useState(false);
	const { editTag, addTag, moveUpTag, moveDownTag, deleteTag } = useTagsEdit();

	function handleHover(show) {
		if (isEditMode) {
			if (show) setShowEditBox(true);
			else setShowEditBox(false);
		}
	}

	const newStraightSvgArr = [...new Set(straightSvgArr)];
	if (depth !== 0 && !isLastChild) newStraightSvgArr.push(depth);

	return (
		<>
			<OutsideBox onMouseEnter={() => handleHover(true)} onMouseLeave={() => handleHover(false)}>
				{new Array(depth + 1).fill(0).map((_, index) => {
					if (parentId !== 0) {
						if (index === depth) {
							if (isLastChild) return <LastSub key={index} />;
							else return <MiddleSub key={index} />;
						}
						if (straightSvgArr.includes(index)) return <StraightDown key={index} />;
						return <Empty key={index} />;
					} else {
						return <Straight key={index} />;
					}
				})}
				{isEditMode ? (
					<>
						<InputBox>
							<Input value={tag.value} onChange={(e) => editTag({ tag: e.target.value, id: tag.id })} $width={"100%"} required={true} />
						</InputBox>
						{showEditBox && (
							<ButtonsBox>
								<ButtonSvg
									type={"add"}
									onClick={(e) => {
										e.preventDefault();
										addTag(tag.id);
									}}
								/>

								<ButtonSvg
									type={"up"}
									disabled={isFirstChild}
									onClick={(e) => {
										e.preventDefault();
										moveUpTag({ parentId, id: tag.id });
									}}
								/>
								<ButtonSvg
									type={"down"}
									disabled={isLastChild}
									onClick={(e) => {
										e.preventDefault();
										moveDownTag({ parentId, id: tag.id });
									}}
								/>
								<Modal>
									<Modal.Open opens={OPENS_DEL}>
										<ButtonSvg
											type={"trash"}
											onClick={(e) => {
												e.preventDefault();
											}}
										/>
									</Modal.Open>
									<Modal.Window name={OPENS_DEL}>
										<ConfirmAction
											confirmActionText={"Delete"}
											description={
												<span>
													Are you sure you want to delete{" "}
													{tag.value.length !== 0 ? <TagValueSpan>{tag.value}</TagValueSpan> : "this tag"}?
													{tag.tags.length !== 0 && (
														<span>
															{" "}
															Its subtags{" "}
															{tag.tags[0].value.length !== 0 && (
																<span>
																	including <TagValueSpan>{tag.tags[0].value}</TagValueSpan>
																</span>
															)}{" "}
															will also be deleted.
														</span>
													)}
												</span>
											}
											heading={"Delete tag"}
											onClickConfirmAction={() => deleteTag(tag.id)}
										/>
									</Modal.Window>
								</Modal>
							</ButtonsBox>
						)}
					</>
				) : (
					<InputBox>
						<TagP onMouseEnter={() => onMouse(tag.id)} onMouseLeave={() => onMouse("")} $highlight={highlightedTagIds.includes(tag.id)}>
							{tag.value}
						</TagP>
					</InputBox>
				)}
			</OutsideBox>
			{tag.tags.length !== 0 &&
				tag.tags.map((t, index) => (
					<TagContainer
						key={index}
						onMouse={onMouse}
						isEditMode={isEditMode}
						highlightedTagIds={highlightedTagIds}
						tag={t}
						depth={depth + 1}
						parentId={tag.id}
						isLastChild={index === tag.tags.length - 1}
						isFirstChild={index === 0}
						straightSvgArr={newStraightSvgArr}
					/>
				))}
		</>
	);
}

function Empty() {
	return <SvgBox />;
}

// --
function Straight() {
	return (
		<SvgBox>
			<svg width="40" height="50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 50">
				<rect x="0" y="25" width="40" height="3" fill="white" />
			</svg>
		</SvgBox>
	);
}

// |
function StraightDown() {
	return (
		<SvgBox>
			<svg width="40" height="50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 50">
				<rect x="20" y="0" width="3" height="50" fill="white" />
			</svg>
		</SvgBox>
	);
}

// |
// --
function LastSub() {
	return (
		<SvgBox>
			<svg width="40" height="50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 50">
				<rect x="20" y="0" width="3" height="25" fill="white" />
				<rect x="20" y="25" width="20" height="3" fill="white" />
			</svg>
		</SvgBox>
	);
}

// |
// |-
// |
function MiddleSub() {
	return (
		<SvgBox>
			<svg width="40" height="50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 50">
				<rect x="20" y="0" width="3" height="50" fill="white" />
				<rect x="20" y="25" width="20" height="3" fill="white" />
			</svg>
		</SvgBox>
	);
}

export default TagContainer;
