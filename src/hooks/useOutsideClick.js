import { useEffect, useRef } from "react";

export function useOutsideClick(handler, listenCap = true) {
	const ref = useRef();

	useEffect(
		function () {
			function handleClick(e) {
				if (ref.current && !ref.current.contains(e.target)) handler();
			}

			document.addEventListener("click", handleClick, listenCap);

			return () => document.removeEventListener("click", handleClick, listenCap);
		},
		[handler, listenCap]
	);

	return ref;
}
