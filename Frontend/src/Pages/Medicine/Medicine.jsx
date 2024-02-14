import { useEffect, useState } from 'react';
import { GET } from '../../helpers/HttpHelper';
import MedicineAll from './widgets/MedicineAll';
import MedicineForm from './widgets/MedicineForm';

function Medicine() {
	const [medicines, setMedicines] = useState([]); // medicines is an array of medicine objects
	const [medicineOne, setMedicineOne] = useState({}); // medicineOne is a single medicine object
	const [loading, setLoading] = useState(true);

	const fetchMedicines = async () => {
		try {
			const response = await GET('/item');
			setMedicines(response.data);
			setLoading(false);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchMedicines();
	}, []);

	return (
		<div className="bg-cover bg-center bg-no-repeat h-full lg:h-screen bg-[#ffffff62]">
			<div className="flex flex-col-reverse lg:flex-row gap-4 p-10 justify-evenly">
				<div>
					<MedicineAll medicines={medicines} loading={loading} setMedicineOne={setMedicineOne} />
				</div>
				<div>
					<MedicineForm fetchMedicines={fetchMedicines} medicineOne={medicineOne} />
				</div>
			</div>
		</div>
	);
}

export default Medicine;
