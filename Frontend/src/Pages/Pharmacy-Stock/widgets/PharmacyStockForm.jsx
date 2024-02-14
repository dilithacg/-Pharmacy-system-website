import { useEffect, useState } from 'react';
import { POST, PUT } from '../../../helpers/HttpHelper';

function PharmacyStockForm({ fetchMedicines, pharmacyStockOne, orderID, pharmacyLocation }) {
	const user = JSON.parse(localStorage.getItem('user'));
	console.log(user);
	console.log(pharmacyStockOne);
	console.log(orderID);
	console.log(pharmacyLocation);

	const [createdUserId, setCreatedUserId] = useState(user.id);
	const [pharmacyId, setPharmacyId] = useState('');
	const [itemId, setItemId] = useState('');
	const [stock, setStock] = useState(0);
	const [isShow, setIsShow] = useState(false);

	useEffect(() => {
		if (Object.keys(pharmacyStockOne).length !== 0) {
			setPharmacyId(pharmacyStockOne.pharmacyId);
			setItemId(pharmacyStockOne.itemId);
			setStock(pharmacyStockOne.stock);
			setIsShow(true);
		} else {
			setPharmacyId('');
			setItemId('');
			setStock(0);
			setIsShow(false);
		}
	}, [pharmacyStockOne]);

	const handleSubmit = async () => {
		try {
			if (!pharmacyId || !itemId) {
				alert('Please fill all fields');
				return;
			}
			const medicine = {
				createdUserId,
				pharmacyId,
				itemId,
				stock,
			};

			console.log(medicine);
			const response = await POST('/pharmacy-stock', medicine);
			console.log(response);

			window.location.reload();
		} catch (error) {
			console.log(error);
		}
	};

	const handleUpdate = async () => {
		try {
			if (!pharmacyId || !itemId) {
				alert('Please fill all fields');
				return;
			}
			const medicine = {
				id: pharmacyStockOne.id,
				createdUserId,
				pharmacyId,
				itemId,
				stock,
			};

			console.log(medicine);
			const response = await PUT('/pharmacy-stock', medicine);
			console.log(response);

			window.location.reload();
		} catch (error) {
			console.log(error);
		}
	};

	const handleClear = () => {
		setPharmacyId('');
		setItemId('');
		setStock(0);
		setIsShow(false);
	};

	return (
		<div className="flex flex-col items-center justify-center w-full">
			<h1 className="text-2xl font-bold mb-4">Pharmacy Stock</h1>
			<div className="w-full sm:max-w-lg xl:max-w-xl">
				<div className="flex flex-wrap -mx-3 mb-3">
					<div className="w-full px-3">
						<label
							htmlFor="pharmacyId"
							className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
						>
							Pharmacy
						</label>
						<select
							id="pharmacyId"
							className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
							value={pharmacyId}
							onChange={(e) => setPharmacyId(e.target.value)}
						>
							<option value="">Select Pharmacy</option>
							{pharmacyLocation.map((pharmacy) => (
								<option key={pharmacy.id} value={pharmacy.id}>
									{pharmacy.name}
								</option>
							))}
						</select>
					</div>
				</div>
				<div className="flex flex-wrap -mx-3 mb-3">
					<div className="w-full px-3">
						<label
							htmlFor="itemId"
							className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
						>
							Order(Item)
						</label>
						<select
							id="itemId"
							className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
							value={itemId}
							onChange={(e) => setItemId(e.target.value)}
						>
							<option value="">Select Order(Item)</option>
							{orderID.map((order) => (
								<option key={order.id} value={order.id}>
									{order.name}
								</option>
							))}
						</select>
					</div>
				</div>
				<div className="flex flex-wrap -mx-3 mb-3">
					<div className="w-full px-3">
						<label
							htmlFor="stock"
							className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
						>
							Stock
						</label>
						<input
							id="stock"
							type="number"
							value={stock}
							min={0}
							className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
							onChange={(e) => setStock(e.target.value)}
						/>
					</div>
				</div>
				<div className="flex items-center justify-between gap-10">
					{isShow ? (
						<>
							<button
								className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
								type="submit"
								onClick={handleUpdate}
							>
								Edit
							</button>
							<button
								className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
								type="submit"
								onClick={handleClear}
							>
								Clear
							</button>
						</>
					) : (
						<button
							className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
							type="submit"
							onClick={handleSubmit}
						>
							Add
						</button>
					)}
				</div>
			</div>
		</div>
	);
}

export default PharmacyStockForm;
