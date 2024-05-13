/** @format */

import { useRef } from "react";
import { QUERY_DELAY } from "../utils/constants";

export default function useDebounce(handler) {
	const timeout = useRef(null);
	return (...args) => {
		clearTimeout(timeout.current);
		timeout.current = setTimeout(() => {
			console.log("debounce : ", ...args);
			handler(...args);
		}, QUERY_DELAY);
	};
}
