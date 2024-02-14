import React, { useState } from 'react';
import { DELETE } from '../../../helpers/HttpHelper';

function MedicineAll({ medicines, loading, setMedicineOne }) {
	const handleEditMedicine = (medicine) => {
		setMedicineOne(medicine);
	};
	const handleDeleteMedicine = async (id) => {
		try {
			if (!window.confirm('Are you sure you want to delete this medicine?')) {
				return;
			}
			const response = await DELETE(`/item/${id}`);
			console.log(response);
			window.location.reload();
		} catch (error) {
			console.log(error);
		}
	};

	const [showModal, setShowModal] = useState(false);
	const [selectedMedicine, setSelectedMedicine] = useState(null);

	const handleViewDetails = (medicineId) => {
		// Find the selected medicine from the medicines array
		const medicine = medicines.find((medicine) => medicine.id === medicineId);
		// Set the selected medicine in the state
		setSelectedMedicine(medicine);
		// Show the modal
		setShowModal(true);
	};

	const closeModal = () => {
		// Hide the modal and reset the selected medicine
		setShowModal(false);
		setSelectedMedicine(null);
	};

	return (
		<div className="flex flex-col items-center justify-center">
			<h1 className="text-2xl font-bold mb-4">All Medicines</h1>
			{loading ? (
				<div>Loading...</div>
			) : (
				<div className=" overflow-x-auto w-full md:w-auto">
					<table className="w-full text-sm text-left text-gray-500 ">
						<thead className="text-xs text-gray-700 uppercase bg-slate-400 ">
							<tr>
								<th className="px-4 py-2 border">Name</th>
								<th className="px-4 py-2 border">Description</th>
								<th className="px-4 py-2 border">Code</th>
								<th className="px-4 py-2 border">Type</th>
								<th className="px-4 py-2 border">Unit</th>
								<th className="px-4 py-2 border">Actions</th>
							</tr>
						</thead>
						<tbody>
							{medicines.map((medicine) => (
								<tr
									key={medicine.id}
									className="bg-white border-b dark:bg-slate-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-50"
								>
									<td className="px-4 py-2 border">{medicine?.name ? medicine?.name : 'N/A'}</td>
									<td className="px-4 py-2 border">
										{medicine?.description ? medicine?.description : 'N/A'}
									</td>
									<td className="px-4 py-2 border">{medicine?.code ? medicine?.code : 'N/A'}</td>
									<td className="px-4 py-2 border">{medicine?.type ? medicine?.type : 'N/A'}</td>
									<td className="px-4 py-2 border">{medicine?.unit ? medicine?.unit : 'N/A'}</td>
									<td className="px-4 py-2 border">
										<div className="flex justify-center space-x-8">
											<button
												className="text-blue-500 hover:text-blue-700"
												onClick={() => handleViewDetails(medicine.id)}
											>
												<i className="fa-solid fa-eye"></i>
											</button>
											<button
												className="text-green-500 hover:text-green-700"
												onClick={() => handleEditMedicine(medicine)}
											>
												<i className="fa-solid fa-pen-to-square"></i>
											</button>
											<button
												className="text-red-500 hover:text-red-700"
												onClick={() => handleDeleteMedicine(medicine.id)}
											>
												<i className="fa-sharp fa-solid fa-trash"></i>
											</button>
										</div>
									</td>
								</tr>
							))}
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
								<div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
									<div>
										<h3 className="text-lg leading-6 font-medium text-gray-900">
											Medicine Details
										</h3>
										<button
											className="absolute top-0 right-0 m-4 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition ease-in-out duration-150 p-2 w-10 h-10"
											onClick={closeModal}
										>
											<i className="fa-solid fa-times"></i>
										</button>
										<div className="mt-2">
											<p className="text-sm text-gray-500">
												Here are the details for the selected medicine:
											</p>
											{selectedMedicine && (
												<div className="mt-4 space-y-2">
													<p>
														<span className="font-medium">Name:</span>{' '}
														{selectedMedicine.name}
													</p>
													<p>
														<span className="font-medium">Description:</span>{' '}
														{selectedMedicine.description}
													</p>
													<p>
														<span className="font-medium">Code:</span>{' '}
														{selectedMedicine.code}
													</p>
													<p>
														<span className="font-medium">Type:</span>{' '}
														{selectedMedicine.type}
													</p>
													<p>
														<span className="font-medium">Unit:</span>{' '}
														{selectedMedicine.unit}
													</p>
												</div>
											)}
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

export default MedicineAll;
