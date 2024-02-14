import { useEffect, useState } from 'react';
import { GET } from '../../helpers/HttpHelper';
import OrderAll from './widgets/OrderAll';
import OrderForm from './widgets/OrderForm';
import districtJson from '../Data/Data.json';

function Home() {
	const { districts } = districtJson;

	const [pharmacies, setPharmacies] = useState([]); // pharmacies is an array of medicine objects
	const [pharmacieOne, setPharmacyOne] = useState({}); // pharmacieOne is a single medicine object
	const [loading, setLoading] = useState(true);

	const user = JSON?.parse(localStorage?.getItem('user'));
	// console.log(user);

	const fetchMedicines = async () => {
		try {
			const allUser = await GET('/user');

			// get  createdUserId from user table by email. user.email is from local storage
			// const createdUserId = allUser.find((userOne) => userOne.email === user.email).createdUserId;

			if (user?.role === 0) {
				const response = await GET('/order');
				setPharmacies(response.data);
				console.log(response.data);
				setLoading(false);
				return;
			}

			if (user?.role === 1) {
				const response = await GET(`/order/district/${user?.id}`);
				setPharmacies(response.data);
				console.log(response.data);
				setLoading(false);
				return;
			}
			if (user?.role === 2) {
				const response = await GET(`/order/my-orders/${user?.id}`);
				setPharmacies(response.data);
				console.log(response.data);
				setLoading(false);
				return;
			}
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
					<OrderAll
						pharmacies={pharmacies}
						loading={loading}
						setPharmacyOne={setPharmacyOne}
						districts={districts}
						fetchMedicines={fetchMedicines}
					/>
				</div>
				{user?.role === 2 && (
					<div>
						<OrderForm fetchMedicines={fetchMedicines} pharmacieOne={pharmacieOne} districts={districts} />
					</div>
				)}
			</div>
		</div>
	);
}

export default Home;
