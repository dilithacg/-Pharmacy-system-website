function Bills() {
	const getAllPharmacies = async () => {
		try {
			const response = await GET('/pharmacy');
			console.log(response);
			setPharmacies(response.data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getAllPharmacies();
	}, []);
}

export default Bills;
