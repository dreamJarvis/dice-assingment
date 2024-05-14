/** @format */

import { useRef } from "react";
import { QUERY_DELAY } from "../utils/constants";

export default function useDebounce(handler, loader) {
	const timeout = useRef(null);
	return (...args) => {
		loader(true);
		clearTimeout(timeout.current);
		timeout.current = setTimeout(() => {
			handler(...args);
		}, QUERY_DELAY);
	};
}
