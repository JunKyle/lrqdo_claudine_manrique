import { useEffect, useState } from "react";
import axios from 'axios';

export function useFetch (params) {
	const [data, setData] = useState(undefined);
  	const [error, setError] = useState("");
  	const [loading, setLoading] = useState(true);

  	const fetchData = async () => {
		try {
				setLoading(true);
				const response = await axios.request(params);
				setData(response.data);
			} catch (error) {
				setError(error);
				setLoading(false);
			} finally {
				setLoading(false);
			}
	};

	useEffect(() => {
		fetchData();
	}, []);

	return { data, error, loading, fetchData };
};