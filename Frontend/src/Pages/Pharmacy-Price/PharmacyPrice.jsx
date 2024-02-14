import { useEffect, useState } from 'react';
import { GET } from '../../helpers/HttpHelper';
import PharmacyPriceAll from './widgets/PharmacyPriceAll';
import PharmacyPriceForm from './widgets/PharmacyPriceForm';

function PharmacyPrice() {
	const [pharmacyPrice, setPharmacyPrice] = useState([]); // pharmacyPrice is an array of medicine objects
	const [pharmacyLocation, setPharmacyLocation] = useState([]); // pharmacyPrice is an array of medicine objects
	const [orderID, setOrderID] = useState([]); // pharmacyPrice is an array of medicine objects
	const [pharmacyPriceOne, setPharmacyPriceOne] = useState({}); // pharmacyPriceOne is a single medicine object
	const [loading, setLoading] = useState(true);

	const fetchMedicines = async () => {
		try {
			const response1 = await GET('/pharmacy-price');
			const response2 = await GET('/item');
			const response3 = await GET('/pharmacy');
			setPharmacyPrice(response1.data);
			setOrderID(response2.data);
			setPharmacyLocation(response3.data);
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
					<PharmacyPriceAll
						pharmacyPrice={pharmacyPrice}
						loading={loading}
						setPharmacyPriceOne={setPharmacyPriceOne}
						pharmacyLocation={pharmacyLocation}
						orderID={orderID}
					/>
				</div>
				<div>
					<PharmacyPriceForm
						fetchMedicines={fetchMedicines}
						pharmacyPriceOne={pharmacyPriceOne}
						pharmacyLocation={pharmacyLocation}
						orderID={orderID}
					/>
				</div>
			</div>
		</div>
	);
}

export default PharmacyPrice;
