import React, { useEffect, useState } from 'react';
import { DELETE, GET, POST } from '../../../helpers/HttpHelper';

function OrderAll({ pharmacies, loading, setPharmacyOne, districts, fetchMedicines }) {
	const handleEditMedicine = (pharmacie) => {
		setPharmacyOne(pharmacie);
	};
	const user = JSON?.parse(localStorage?.getItem('user'));
	const handleDeleteMedicine = async (id) => {
		try {
			if (!window.confirm('Are you sure you want to delete this pharmacie?')) {
				return;
			}
			const response = await DELETE(`/order/${id}`);
			console.log(response);
			fetchMedicines();
		} catch (error) {
			console.log(error);
		}
	};

	const [showModal, setShowModal] = useState(false);
	const [selectedMedicine, setSelectedMedicine] = useState(null);
	const [showPharmcies, setShowPharmcies] = useState(false);
	const [pharmaciesDetails, setPharmciesDetails] = useState([]);

	const handleViewDetails = (medicineId) => {
		// Find the selected pharmacie from the pharmacies array
		const pharmacie = pharmacies.find((pharmacie) => pharmacie.id === medicineId);
		// Set the selected pharmacie in the state
		setSelectedMedicine(pharmacie);
		// Show the modal
		setShowModal(true);
	};

	const closeModal = () => {
		// Hide the modal and reset the selected pharmacie
		setShowModal(false);
		setSelectedMedicine(null);
		setShowPharmcies(false);
	};

	const [modalOpen, setModalOpen] = useState(false);
	const [selectedImage, setSelectedImage] = useState(null);

	const handleViewImage = (image) => {
		setSelectedImage(image);
		setModalOpen(true);
	};
	// medicines is an array of medicine objects
	const [medicines, setMedicines] = useState([]);
	const fetchMedicinesItem = async () => {
		try {
			const user = JSON?.parse(localStorage?.getItem('user'));
			console.log(user);
			const response = await GET(`/item/pharmacy-items/${user.pharmacyId}`);
			setMedicines(response.data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchMedicinesItem();
	}, []);

	useEffect(() => {
		console.log(pharmaciesDetails);
		if (pharmaciesDetails.length > 0) {
			setShowPharmcies(true);
		}
	}, [pharmaciesDetails]);

	const [validTillDate, setValidTillDate] = useState(new Date().toISOString().slice(0, 10));
	const [items, setItems] = useState([]);
	const [selectedItem, setSelectedItem] = useState('');
	const [quantity, setQuantity] = useState(0);
	const [price, setPrice] = useState(0);
	const [unitPrice, setUnitPrice] = useState(0);
	const [name, setName] = useState('');

	const handleAddItem = () => {
		let item = {
			itemId: selectedItem,
			unitPrice: unitPrice,
			quantity: quantity,
			name: name,
		};
		setItems([...items, item]);

		setSelectedItem('');
		setUnitPrice(0);
		setPrice(0);
		setQuantity(0);
	};

	const handleRemoveItem = (index) => {
		let seletedItems = items;
		// seletedItems.splice(index, 1);
		setItems((items) => items.splice(index, 1));
		console.log(items);
	};

	const handleItemChange = (event) => {
		setSelectedItem(+event.target.value);
		let _item = medicines.find((a) => a.id === +event.target.value);
		setUnitPrice(_item.price);
		setName(_item.name);
	};
	const handleItemQuantityChange = (event) => {
		let _item = medicines.find((a) => a.id === selectedItem);
		console.log(_item);
		setQuantity(+event.target.value);

		setPrice(+event.target.value * _item.price);
	};

	const loadPharmciesperOrder = async (event) => {
		// let _item = medicines.find((a) => a.id === selectedItem);
		// console.log(_item);
		// setQuantity(+event.target.value);

		// setPrice(+event.target.value * _item.price);

		console.log(event);

		try {
			const user = JSON?.parse(localStorage?.getItem('user'));
			console.log(user);
			const response = await GET(`/order/bills/${event.id}`);
			setPharmciesDetails(response.data);
			console.log(response.data);
			console.log(pharmaciesDetails);
			setShowPharmcies(true);

			// setShowPharmcies(response.data);
		} catch (error) {
			console.log(error);
		}
	};

	const handleSubmit = async (order) => {
		try {
			console.log(order);
			//TODO: message: "Field 'createdUserId' doesn't have a default value"
			//TODO:

			//! convert to order items to string
			console.log(items);
			const user = JSON?.parse(localStorage?.getItem('user'));
			const data = {
				createdUserId: user.id,
				orderId: order.id,
				items: items,
				validTillDate,
			};
			console.log(data);

			const response = await POST('/bill', data);
			console.log(response);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="flex flex-col items-center justify-center">
			<h1 className="text-2xl font-bold mb-4"> All Reports</h1>
			{loading ? (
				<div>Loading...</div>
			) : (
				<div className=" overflow-x-auto w-full md:w-auto">
					<table className="w-full text-sm text-left text-gray-500 ">
						<thead className="text-xs text-gray-700 uppercase bg-slate-400 ">
							<tr>
								<th className="px-4 py-2 border">Due Date</th>
								<th className="px-4 py-2 border">Note</th>
								<th className="px-4 py-2 border">Adresss</th>
								<th className="px-4 py-2 border">Image</th>
								<th className="px-4 py-2 border">Actions</th>
							</tr>
						</thead>
						<tbody>
							{pharmacies ? (
								pharmacies.map((pharmacie) => (
									<tr
										key={pharmacie.id}
										className="bg-white border-b dark:bg-slate-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-50"
									>
										<td className="px-4 py-2 border">
											{pharmacie?.dueDate
												? new Date(pharmacie?.dueDate).toLocaleDateString()
												: 'N/A'}
										</td>
										<td className="px-4 py-2 border">
											{pharmacie?.notes ? pharmacie?.notes : 'N/A'}
										</td>

										<td className="px-4 py-2 border">
											{pharmacie?.district
												? districts.find((d) => d.id === pharmacie?.district).name
												: 'N/A'}
										</td>
										<td className="px-4 py-2 border">
											<img
												src={`data:image/png;base64,${pharmacie?.image || ''}`}
												alt="pharmacie"
												className="w-[100px] h-[100px] rounded cursor-pointer"
												onClick={() => handleViewImage(pharmacie?.image)}
											/>
											<div
												className={`fixed z-10 inset-0 overflow-y-auto ${
													modalOpen ? 'block' : 'hidden'
												}`}
											>
												<div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
													<div
														className="fixed inset-0 transition-opacity"
														aria-hidden="true"
													>
														<div className="absolute inset-0 bg-gray-500 opacity-75"></div>
													</div>

													<span
														className="hidden sm:inline-block sm:align-middle sm:h-screen"
														aria-hidden="true"
													>
														&#8203;
													</span>

													<div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
														<div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
															<img
																src={`data:image/png;base64,${selectedImage || ''}`}
																alt="pharmacie"
																className="w-full rounded"
															/>
														</div>
														<div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
															<button
																type="button"
																className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
																onClick={() => setModalOpen(false)}
															>
																Close
															</button>
														</div>
													</div>
												</div>
											</div>
										</td>

										<td className="px-4 py-2 border">
											<div className="flex justify-center space-x-8">
												{user?.role === 1 && (
													<button
														className="text-blue-500 hover:text-blue-700"
														onClick={() => handleViewDetails(pharmacie.id)}
													>
														<i className="fa-solid fa-eye"></i>
													</button>
												)}

												{user?.role === 2 && (
													<button
														className="text-green-500 hover:text-green-700"
														onClick={() => handleEditMedicine(pharmacie)}
													>
														<i className="fa-solid fa-pen-to-square"></i>
													</button>
												)}
												<button
													className="text-red-500 hover:text-red-700"
													onClick={() => handleDeleteMedicine(pharmacie.id)}
												>
													<i className="fa-sharp fa-solid fa-trash"></i>
												</button>
												{user?.role === 2 && (
													<button
														className="text-green-500 hover:text-green-700"
														onClick={() => loadPharmciesperOrder(pharmacie)}
													>
														<i className="fa-regular fa-ballot"></i>
													</button>
												)}
											</div>
										</td>
									</tr>
								))
							) : (
								<tr>
									<td colSpan={5} className="text-center">
										No data found
									</td>
								</tr>
							)}
						</tbody>
					</table>
					{showModal && (
						<div className="fixed z-10 inset-0 overflow-y-auto">
							<div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
								<div className="fixed inset-0 transition-opacity">
									<div className="absolute inset-0 bg-gray-500 opacity-75" onClick={closeModal}></div>
								</div>
								<span
									className="hidden sm:inline-block sm:align-middle sm:h-screen"
									aria-hidden="true"
								></span>
								<div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full sm:p-6">
									<div>
										<h3 className="text-lg leading-6 font-medium text-gray-900">Report Details</h3>
										<button
											className="absolute top-0 right-0 m-4 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition ease-in-out duration-150 p-2 w-10 h-10"
											onClick={closeModal}
										>
											<i className="fa-solid fa-times"></i>
										</button>
										<div className="mt-2">
											<p className="text-sm text-gray-500">
												Here are the details for the selected report.
											</p>
											{selectedMedicine && (
												<>
													<div className="flex flex-col md:flex-row">
														<div className="mt-4 space-y-2">
															<p>
																<span className="font-medium">Date:</span>{' '}
																{selectedMedicine?.dueDate
																	? new Date(
																			selectedMedicine?.dueDate
																	  ).toLocaleDateString()
																	: 'N/A'}
															</p>
															<p>
																<span className="font-medium">Note:</span>{' '}
																{selectedMedicine?.notes
																	? selectedMedicine?.notes
																	: 'N/A'}
															</p>
															<p>
																<span className="font-medium">District :</span>{' '}
																{selectedMedicine?.district
																	? districts.find(
																			(d) => d.id === selectedMedicine?.district
																	  ).name
																	: 'N/A'}
															</p>
															<p>
																<span className="font-medium">Image</span>{' '}
																<img
																	src={`data:image/png;base64,${
																		selectedMedicine?.image || ''
																	}`}
																	alt="pharmacie"
																	className="w-full h-full rounded mt-3"
																/>
															</p>
														</div>
														<div>
															<div className="w-full flex flex-col gap-5 mt-5 md:mt-0  md:mr-10 md:ml-2">
																{/* <button
																	type="submit"
																	className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
																	onClick={() => handleSubmit(selectedMedicine)}
																>
																	Submit
																</button> */}
																<div>
																	<label
																		htmlFor="image"
																		className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
																	>
																		validTillDate
																	</label>
																	<input
																		type="date"
																		className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
																		value={validTillDate}
																		onChange={(e) =>
																			setValidTillDate(e.target.value)
																		}
																	/>
																</div>
																{/* <div>
																	<div className="flex justify-between items-center mb-2">
																		<label
																			htmlFor="image"
																			className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
																		>
																			Items
																		</label>
																		<button
																			type="button"
																			onClick={handleAddItem}
																			className="py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
																		>
																			+
																		</button>
																	</div>

																	<div className="flex gap-4 flex-col">
																		{items.map((item, index) => (
																			<div key={index} className="flex space-x-4">
																				<select
																					name="medicine"
																					value={item.medicine}
																					onChange={(e) =>
																						handleItemChange(e, index)
																					}
																					className="py-2 px-3 rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
																				>
																					<option value="">
																						Select Medicine
																					</option>
																					{medicines.map((medicine) => (
																						<option
																							key={medicine.id}
																							value={medicine.id}
																						>
																							{medicine.name}
																						</option>
																					))}
																				</select>
																				<input
																					type="number"
																					name="quantity"
																					value={item.quantity}
																					onChange={(e) =>
																						handleItemQuantityChange(
																							e,
																							index
																						)
																					}
																					className="py-2 px-3 w-20 rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
																				/>
																				<button
																					type="button"
																					onClick={() =>
																						handleRemoveItem(index)
																					}
																					className="py-2 px-3 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50"
																				>
																					-
																				</button>
																			</div>
																		))}
																	</div>
																</div> */}
															</div>
														</div>
													</div>
													<div className="form">
														<form className="bg-white rounded px-8 pt-6 pb-8 mb-4">
															<div className="mb-4">
																<label
																	className="block text-gray-700 text-sm font-bold mb-2"
																	htmlFor="username"
																>
																	Medicine
																</label>
																<select
																	name="medicine"
																	value={selectedItem}
																	onChange={(e) => handleItemChange(e)}
																	className="py-2 px-3 rounded-lg border-gray-300 focus:outline-none w-full focus:ring-2 focus:ring-blue-400 focus:border-transparent"
																>
																	<option value="">Select Medicine</option>
																	{medicines.map((medicine) => (
																		<option key={medicine.id} value={medicine.id}>
																			{medicine.name}
																		</option>
																	))}
																</select>
															</div>
															<div className="mb-6">
																<label
																	className="block text-gray-700 text-sm font-bold mb-2"
																	htmlFor="quantity"
																>
																	Quantity
																</label>

																<input
																	type="number"
																	name="quantity"
																	value={quantity}
																	onChange={(e) => handleItemQuantityChange(e)}
																	className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
																/>
															</div>
															<div className="mb-6">
																<label
																	className="block text-gray-700 text-sm font-bold mb-2"
																	htmlFor="unitprice"
																>
																	Unit Price
																</label>

																<input
																	type="number"
																	name="unitprice"
																	value={unitPrice}
																	className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
																	disabled={true}
																/>
															</div>
															<div className="mb-6">
																<label
																	className="block text-gray-700 text-sm font-bold mb-2"
																	htmlFor="price"
																>
																	Price
																</label>

																<input
																	type="number"
																	name="price"
																	value={price}
																	className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
																	disabled={true}
																/>
															</div>
															<div className="flex items-center justify-between">
																<button
																	className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
																	type="button"
																	onClick={() => handleAddItem()}
																>
																	Add
																</button>
															</div>
														</form>
														<table className="table-auto">
															<thead>
																<tr>
																	<th>Medicine</th>
																	<th>Unit Price</th>
																	<th>Total</th>
																</tr>
															</thead>
															<tbody>
																{items.map((item, index) => {
																	return (
																		<tr key={index}>
																			<td>{item.name}</td>
																			<td>{item.unitPrice}</td>
																			<td>{item.quantity}</td>
																			<td>
																				{' '}
																				<button
																					type="button"
																					onClick={() =>
																						handleRemoveItem(index)
																					}
																					className="py-2 px-3 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50"
																				>
																					-
																				</button>
																			</td>
																		</tr>
																	);
																})}
															</tbody>
														</table>
														<button
															type="submit"
															className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
															onClick={() => handleSubmit(selectedMedicine)}
														>
															Submit
														</button>
													</div>
												</>
											)}
										</div>
									</div>
								</div>
							</div>
						</div>
					)}
					{showPharmcies && (
						<div className="fixed z-10 inset-0 overflow-y-auto">
							<div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
								<div className="fixed inset-0 transition-opacity">
									<div className="absolute inset-0 bg-gray-500 opacity-75" onClick={closeModal}></div>
								</div>
								<span
									className="hidden sm:inline-block sm:align-middle sm:h-screen"
									aria-hidden="true"
								></span>
								<div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full sm:p-6">
									<div>
										<h3 className="text-lg leading-6 font-medium text-gray-900">Bills</h3>
										<button
											className="absolute top-0 right-0 m-4 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition ease-in-out duration-150 p-2 w-10 h-10"
											onClick={closeModal}
										>
											<i className="fa-solid fa-times"></i>
										</button>
										<div className="mt-2">
											<ul>
												{pharmaciesDetails.map((pharmcie, i) => {
													return (
														<div>
															<li key={i}>
																{pharmcie?.pharmacy.name} - Total Price :- Rs.
																{pharmcie?.total}
																<button
																	className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline ml-2 mt-1"
																	image="submit"
																>
																	Confirm
																</button>
															</li>
														</div>

														// <div key={i}>

														// 	<h2>{pharmcie?.pharmacy.name}</h2>
														// 	{/* <ul>
														// 	{pharmcies.items.map((item, index) => {
														// 		<li key={index}>
														// 			{item.name} - {item.price}
														// 		</li>;
														// 	})}
														// </ul> */}
														// 	<div>Total Price : - {pharmcie?.total}</div>
														// </div>
													);
												})}
											</ul>
										</div>
									</div>
								</div>
							</div>
						</div>
					)}
				</div>
			)}
		</div>
	);
}

export default OrderAll;
