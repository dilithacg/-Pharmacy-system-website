import { useEffect, useState } from 'react';
import { POST, PUT } from '../../../helpers/HttpHelper';

function OrderForm({ fetchMedicines, pharmacieOne, districts }) {
	// localStorage.getItem('user') get user from local storage json
	const user = JSON.parse(localStorage.getItem('user'));
	// console.log(user);
	// console.log(pharmacieOne);
	const [createdUserId, setCreatedUserId] = useState(user.id);
	const [dueDate, setDueDate] = useState('');
	const [notes, setNotes] = useState('');
	const [district, setDistrict] = useState('');
	const [image, setImage] = useState('');
	const [isShow, setIsShow] = useState(false);

	useEffect(() => {
		if (Object.keys(pharmacieOne).length !== 0) {
			setDueDate(pharmacieOne.dueDate);
			setNotes(pharmacieOne.notes);
			setDistrict(pharmacieOne.district);
			// setImage(pharmacieOne.image);
			setIsShow(true);
		} else {
			setDueDate('');
			setNotes('');
			setDistrict('');
			setImage('');
			setIsShow(false);
		}
	}, [pharmacieOne]);

	const handleSubmit = async () => {
		try {
			if (!dueDate || !notes || !image) {
				alert('Please fill all fields');
				return;
			}

			const formData = new FormData();
			formData.append('createdUserId', createdUserId);
			formData.append('dueDate', new Date(dueDate).toISOString());
			formData.append('notes', notes);
			formData.append('district', district);
			formData.append('image', image);

			console.log(formData);

			const response = await POST('/order', formData);
			console.log(response);
			fetchMedicines();
		} catch (error) {
			console.error(error);
		}
	};

	const handleUpdate = async () => {
		try {
			if (!dueDate || !notes || !image) {
				alert('Please fill all fields');
				return;
			}

			const formData = new FormData();
			formData.append('id', pharmacieOne.id);
			formData.append('createdUserId', createdUserId);
			formData.append('dueDate', new Date(dueDate).toISOString());
			formData.append('notes', notes);
			formData.append('district', district);
			formData.append('image', image);

			const response = await PUT('/order', formData);
			console.log(response);

			window.location.reload();
		} catch (error) {
			console.log(error);
		}
	};

	const handleClear = () => {
		setDueDate('');
		setNotes('');
		setDistrict('');
		setImage('');
		setIsShow(false);
	};

	return (
		<div className="flex flex-col items-center justify-center">
			<h1 className="text-2xl font-bold mb-4">Add report</h1>
			<div className="w-full ">
				<div className="flex flex-wrap -mx-3 mb-3">
					<div className="w-full px-3">
						<label
							htmlFor="dueDate"
							className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
						>
							Due Date
						</label>
						<input
							id="dueDate"
							type="date"
							className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
							value={dueDate}
							onChange={(e) => setDueDate(e.target.value)}
						/>
					</div>
				</div>
				<div className="flex flex-wrap -mx-3 mb-3">
					<div className="w-full px-3">
						<label
							htmlFor="notes"
							className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
						>
							Note
						</label>
						<input
							id="notes"
							type="text"
							className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
							value={notes}
							onChange={(e) => setNotes(e.target.value)}
						/>
					</div>
				</div>
				<div className="flex flex-wrap -mx-3 mb-3">
					<div className="w-full px-3">
						<label
							htmlFor="district"
							className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
						>
							Address
						</label>
						<select
							id="district"
							className="block appearance-none w-full bg-white border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
							value={district}
							onChange={(e) => setDistrict(e.target.value)}
						>
							<option value="">Enter address</option>
							{districts.map((district) => (
								<option key={district.id} value={district.id}>
									{district.name}
								</option>
							))}
						</select>
					</div>
				</div>
				<div className="flex flex-wrap -mx-3 mb-3">
					<div className="w-full px-3 mb-3">
						<label
							htmlFor="image"
							className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
						>
							Image
						</label>
						<input
							id="image"
							type="file"
							accept="image/*"
							className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
							onChange={(e) => {
								setImage(e.target.files[0]);
							}}
						/>
					</div>
				</div>
				<div className="flex items-center justify-between gap-10">
					{isShow ? (
						<>
							<button
								className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
								image="submit"
								onClick={handleUpdate}
							>
								Edit
							</button>
							<button
								className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
								image="submit"
								onClick={handleClear}
							>
								Clear
							</button>
						</>
					) : (
						<button
							className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
							image="submit"
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

export default OrderForm;
