import { useState, useContext, useEffect } from "react";
import { Route, Routes } from "react-router-dom";

// Pages
import Home from "@/pages/index";
import AddBook from "@/pages/Admin/AddBook";
import AddPromo from "@/pages/Admin/AddPromo";
import Detail from "@/pages/Reader/Detail";
import Order from "@/pages/Reader/Order";
import {AppContext}  from "@/context/AppContext";
import Dashboard from "@/pages/Admin/index";
import {API, setAuthToken} from "@/config/api";
import IsLogin from "@/components/IsLogin";
if (localStorage.token) {
	setAuthToken(localStorage.token);
}


function App() {

	const [state, dispatch] = useContext(AppContext);

	useEffect(() => {
		if (localStorage.token) {
			setAuthToken(localStorage.token);
		}
	}, [state]);

	const checkUser = async () => {
		try {
			const response = await API.get('/check-auth');

			// If the token incorrect
			if (response.data.code === 404) {
				return dispatch({
					type: 'AUTH_ERROR',
				});
			}

			// Get user data
			let payload = response.data.data;
			// Get token from local storage
			payload.token = localStorage.token;

			// Send data to useContext
			dispatch({
				type: 'LOGIN',
				payload,
			});
		} catch (error) {
			console.log(error);
		}
	};
console.log("state", state)

	useEffect(() => {
		if (localStorage.token) {
			checkUser();
		}
	}, []);

	return (
		<Routes>
			{state.isLogin === true && state.user.role === "admin" ? (

			<>
				<Route path="/" element={<Dashboard />} />
				<Route path="/addbook" element={<AddBook />} />
				<Route path="/addpromo" element={<AddPromo />} />
			</>
			) : (
			<>
				<Route path="/" element={<Home />} />
				<Route path="/detail/:id" element={<Detail />} />
				<Route path="/" element={<IsLogin />} >
					{/* <Route path="/profile" element={<Profile />} /> */}
					<Route path="/order" element={<Order />} />
				</Route>
			</>
			)}
		</Routes>
	);
}

export default App;
