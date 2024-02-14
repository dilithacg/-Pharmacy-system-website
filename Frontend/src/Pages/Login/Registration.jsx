import React, { useEffect, useState } from 'react';
import { GET, POST } from '../../helpers/HttpHelper';

function Registration() {
	const user = JSON?.parse(localStorage?.getItem('user'));
	console.log(user);
	const [createdUserId, setCreatedUserId] = useState(0);
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('admin@gmail.com');
	const [password, setPassword] = useState('123456');
	const [role, setRole] = useState(1);
	const [pharmacyId, setPharmacyId] = useState(0);

	const [passwordType, setPasswordType] = useState('password');

	const handleSubmit = async () => {
		try {
			const ob = {
				createdUserId: Number(createdUserId),
				firstName,
				lastName,
				email,
				password,
				role,
				pharmacyId: pharmacyId.id,
			};
			console.log(ob);
			const response = await POST('/user', ob);
			window.location.href = '/';
		} catch (error) {
			console.log(error);
		}
	};

	const togglePassword = () => {
		if (passwordType === 'password') {
			setPasswordType('text');
			return;
		}
		setPasswordType('password');
	};

	const [pharmacies, setPharmacies] = useState([]);
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

	return (
		<div className="flex flex-col items-center h-screen justify-center">
			<h1 className="text-2xl font-bold mb-4 mt-40">User Registration</h1>
			<div className="w-full md:max-w-md md:px-0 file:px-10">
				<div className="flex flex-wrap -mx-3 mb-6">
					<div className="w-full px-3">
						<label
							className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
							htmlFor="firstName"
						>
							First Name
						</label>
						<input
							className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
							id="firstName"
							type="text"
							placeholder="First Name"
							value={firstName}
							onChange={(event) => setFirstName(event.target.value)}
						/>
					</div>
				</div>
				<div className="flex flex-wrap -mx-3 mb-6">
					<div className="w-full px-3">
						<label
							className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
							htmlFor="lastName"
						>
							Last Name
						</label>
						<input
							className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
							id="lastName"
							type="text"
							placeholder="Last Name"
							value={lastName}
							onChange={(event) => setLastName(event.target.value)}
						/>
					</div>
				</div>
				<div className="flex flex-wrap -mx-3 mb-6">
					<div className="w-full px-3">
						<label
							className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
							htmlFor="email"
						>
							Email
						</label>
						<input
							className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
							id="email"
							type="email"
							placeholder="Email"
							value={email}
							onChange={(event) => setEmail(event.target.value)}
						/>
					</div>
				</div>
				<div className="flex flex-wrap -mx-3 mb-6">
					<div className="w-full px-3">
						<label
							className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
							htmlFor="password"
						>
							Password
						</label>
						<div className="flex">
							<input
								className="appearance-none block w-full rounded-tr-none rounded-br-none bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
								id="password"
								type={passwordType}
								placeholder="Password"
								value={password}
								onChange={(event) => setPassword(event.target.value)}
							/>
							{passwordType === 'password' ? (
								<button
									className="bg-gray-300 rounded rounded-tl-none rounded-bl-none py-3 px-4 mb-3  hover:bg-slate-200 "
									onClick={togglePassword}
								>
									<i className="fa-solid fa-eye"></i>
								</button>
							) : (
								<button
									className="bg-gray-500 rounded rounded-tl-none rounded-bl-none py-3 px-4 mb-3  hover:bg-slate-600"
									onClick={togglePassword}
								>
									<i className="fa-sharp fa-solid fa-eye-slash"></i>
								</button>
							)}
						</div>
					</div>
				</div>
				{user?.role === 0 && (
					<>
						<div className="flex flex-wrap -mx-3 mb-6">
							<div className="w-full px-3">
								<label
									className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
									htmlFor="role"
								>
									Role
								</label>
								<select
									className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
									id="role"
									value={role}
									onChange={(event) => setRole(event.target.value)}
								>
									<option value="">Select Role</option>
									<option value="0">Admin</option>
									<option value="1">Pharmacist</option>
									<option value="2">Customer</option>
								</select>
							</div>
						</div>
						<div className="flex flex-wrap -mx-3 mb-6">
							<div className="w-full px-3">
								<label
									className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
									htmlFor="pharmacyId"
								>
									Pharmacy Id
								</label>

								<select
									className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
									id="pharmacyId"
									value={JSON.stringify(pharmacyId)}
									onChange={(event) => {
										setPharmacyId(JSON.parse(event.target.value));
										setCreatedUserId(JSON.parse(event.target.value).district);
									}}
								>
									<option value="">Select Pharmacy</option>
									{pharmacies?.map((pharmacy) => (
										<option key={pharmacy?.id} value={JSON.stringify(pharmacy)}>
											{pharmacy.name}
											{console.log(pharmacy)}
										</option>
									))}
								</select>
							</div>
						</div>
					</>
				)}
				<div className="flex flex-wrap -mx-3 mb-6">
					<div className="w-full px-3">
						<button
							className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
							type="submit"
							onClick={handleSubmit}
						>
							Submit
						</button>
						<div className="flex flex-col md:flex-row items-center justify-center">
							<p className="text-gray-500 text-sm italic">Already have an account?</p>
							<a className="text-blue-500 hover:text-blue-700 text-sm italic" href="/">
								Login
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Registration;
