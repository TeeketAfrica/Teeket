// useGetUrl.ts
import { useState } from "react";
import { teeketApi } from "../utils/api";

export const useGetUrl = () => {
	const [signedUrl, setSignedUrl] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const fetchSignedUrl = async () => {
		setLoading(true);
		setError("");
		try {
			const response = await teeketApi.get("/media/presigned_url");
			setSignedUrl(response.data.url);

		} catch (err) {
			setError(
				err?.response?.data?.message ||
					"An error occurred while retrieving the URL"
			);
		} finally {
			setLoading(false);
		}
	};

	return { signedUrl, loading, error, fetchSignedUrl };
};
