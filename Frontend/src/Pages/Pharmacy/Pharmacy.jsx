import { useEffect, useState } from 'react';
import { GET } from '../../helpers/HttpHelper';
import PharmacyAll from './widgets/PharmacyAll';
import PharmacyForm from './widgets/PharmacyForm';
import districtJson from './../Data/Data.json';

function Pharmacy() {
	const { districts } = districtJson;
	const [pharmacies, setPharmacies] = useState([]); // pharmacies is an array of medicine objects
	const [pharmacieOne, setPharmacyOne] = useState({}); // pharmacieOne is a single medicine object
	const [loading, setLoading] = useState(true);
	const user = JSON?.parse(localStorage?.getItem('user'));
	const fetchMedicines = async () => {
		try {
			const response = await GET('/pharmacy');
			setPharmacies(response.data);
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
					<PharmacyAll
						pharmacies={pharmacies}
						loading={loading}
						setPharmacyOne={setPharmacyOne}
						districts={districts}
						fetchMedicines={fetchMedicines}
					/>
				</div>
				{user.role === 0 && (
					<div>
						<PharmacyForm
							fetchMedicines={fetchMedicines}
							pharmacieOne={pharmacieOne}
							districts={districts}
						/>
					</div>
				)}
			</div>
		</div>
	);
}

export default Pharmacy;
