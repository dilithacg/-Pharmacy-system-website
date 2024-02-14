import { useEffect, useState } from 'react';
import { POST, PUT } from '../../../helpers/HttpHelper';

function MedicineForm({ fetchMedicines, medicineOne }) {
	// localStorage.getItem('user') get user from local storage json
	const user = JSON.parse(localStorage.getItem('user'));
	console.log(user);
	console.log(medicineOne);
	const [createdUserId, setCreatedUserId] = useState(user.id);
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [code, setCode] = useState('');
	const [type, setType] = useState(0);
	const [unit, setUnit] = useState('');
	const [isShow, setIsShow] = useState(false);

	useEffect(() => {
		if (Object.keys(medicineOne).length !== 0) {
			setName(medicineOne.name);
			setDescription(medicineOne.description);
			setCode(medicineOne.code);
			setType(medicineOne.type);
			setUnit(medicineOne.unit);
			setIsShow(true);
		} else {
			setName('');
			setDescription('');
			setCode('');
			setType(0);
			setUnit('');
			setIsShow(false);
		}
	}, [medicineOne]);

	const handleSubmit = async () => {
		try {
			if (!name || !description || !unit) {
				alert('Please fill all fields');
				return;
			}
			const medicine = {
				createdUserId,
				name,
				description,
				code,
				type,
				unit,
			};

			console.log(medicine);
			const response = await POST('/item', medicine);
			console.log(response);

			window.location.reload();
		} catch (error) {
			console.log(error);
		}
	};

	const handleUpdate = async () => {
		try {
			if (!name || !description || !unit) {
				alert('Please fill all fields');
				return;
			}
			const medicine = {
				id: medicineOne.id,
				createdUserId: medicineOne.createdUserId,
				name,
				description,
				code,
				type,
				unit,
			};

			console.log(medicine);
			const response = await PUT('/item', medicine);
			console.log(response);

			window.location.reload();
		} catch (error) {
			console.log(error);
		}
	};

	const handleClear = () => {
		setName('');
		setDescription('');
		setCode('');
		setType(0);
		setUnit('');
		setIsShow(false);
	};

	return (
		<div className="flex flex-col items-center justify-center">
			<h1 className="text-2xl font-bold mb-4">Medicines</h1>
			<div className="w-full sm:max-w-md xl:max-w-lg">
				<div className="flex flex-wrap -mx-3 mb-3">
					<div className="w-full px-3">
						<label
							htmlFor="name"
							className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
						>
							Name
						</label>
						<input
							id="name"
							type="text"
							className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</div>
				</div>
				<div className="flex flex-wrap -mx-3 mb-3">
					<div className="w-full px-3">
						<label
							htmlFor="description"
							className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
						>
							Description
						</label>
						<input
							id="description"
							type="text"
							className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						/>
					</div>
				</div>
				<div className="flex flex-wrap -mx-3 mb-3">
					<div className="w-full px-3">
						<label
							htmlFor="code"
							className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
						>
							Code
						</label>
						<input
							id="code"
							type="text"
							className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
							value={code}
							onChange={(e) => setCode(e.target.value)}
						/>
					</div>
				</div>
				<div className="flex flex-wrap -mx-3 mb-3">
					<div className="w-full md:w-1/2 px-3 mb-3 md:mb-0">
						<label
							htmlFor="type"
							className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
						>
							Type
						</label>
						<input
							id="type"
							type="number"
							min={0}
							className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
							value={type}
							onChange={(e) => setType(parseInt(e.target.value))}
						/>
					</div>
					<div className="w-full md:w-1/2 px-3">
						<label
							htmlFor="unit"
							className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
						>
							Unit
						</label>
						<input
							id="unit"
							type="text"
							className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
							value={unit}
							onChange={(e) => setUnit(e.target.value)}
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

export default MedicineForm;
