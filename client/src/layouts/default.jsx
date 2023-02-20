import React, { useState, useContext } from "react";
import Header from "@/components/Header";
import {
	Navbar,
	Dropdown,
	Avatar,
	Button,
	Modal,
	TextInput,
	Label,
} from "flowbite-react";
import LoginModal from "@/components/Login";
import RegisterModal from "@/components/Register";
import { AppContext } from "@/context/AppContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


export default function Layouts(props) {
	const navigate = useNavigate();
	const [loginModal, setLoginModal] = useState(false);
	const [registerModal, setRegisterModal] = useState(false);

	const [state, dispatch] = useContext(AppContext);
	
	const isLogout = () => {
		dispatch({
			type: "LOGOUT",
		});
		navigate("/");
		Toast.fire({
			icon: "success",
			title: "Logout Success, Bye👋",
		});
	};

	return (
		<>
		<div {...props}>
			<Header className={"fixed w-full !bg-transparent z-30"}>
				<Navbar.Collapse
					className='bg-white md:bg-transparent p-2 
				!rounded-lg flex place-items-center'
				>
					{state.isLogin === true ? (
					<div className='pb-3 md:pb-0'>
						<Dropdown
							arrowIcon={false}
							inline={true}
							label={
								<Avatar
									alt='User settings'
									img={state.user.image}
									rounded={true}
								/>
							}
						>
						
							<Dropdown.Header>
								<span className='block text-sm'>{state.user.fullname}</span>
								<span className='block truncate text-sm font-medium'>
									{state.user.email}
								</span>
							</Dropdown.Header>
							{state.user.role === "reader" ? (
							<Dropdown.Item>
								<Link to="/profile" >
									<div className="flex items-center p-3 text-sm font-medium text-black-600  rounded-b-lg  hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-red-500 hover:underline">
									<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
										<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
									</svg>
										Profile
									</div>
									
								</Link>
								
							</Dropdown.Item>
							) : ( 
								<>
							<Dropdown.Item>
								<Link to="/addbook" >
									<div className="flex items-center p-3 text-sm font-medium text-black-600  rounded-b-lg  hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-red-500 hover:underline">
									<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
										<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
									</svg>
										Add Book
									</div>
									
								</Link>
						
							</Dropdown.Item>

							<Dropdown.Item>
							<Link to="/addpromo" >
								<div className="flex items-center p-3 text-sm font-medium text-black-600  rounded-b-lg  hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-red-500 hover:underline">
								<img src="https://img.icons8.com/dotty/80/000000/sale-price-tag.png" style={{width: "30px"}}/>
									Add Promo
								</div>
								
							</Link>

							</Dropdown.Item>
							</>
							)}
							<Dropdown.Divider />
							<Dropdown.Item>
							
									<div className="flex items-center p-3 text-sm font-medium text-red-600  rounded-b-lg  hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-red-500 hover:underline" onClick={isLogout}>
										<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
										<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
										</svg>
										Logout
									</div>
									
							<a href="#" class="">
								
							</a>
							</Dropdown.Item>
							
						</Dropdown>
					</div>
					) : (
					<div className='flex items-center gap-4'>
						<Button
							color='light'
							onClick={() => setLoginModal(true)}
							className='rounded-none !py-0 px-7 border-2 border-black'
						>
							Login
						</Button>
						<Button
							color='dark'
							onClick={() => setRegisterModal(true)}
							className='rounded-none !py-0 px-7 border-2 border-black'
						>
							Register
						</Button>
					</div>
					)}
				</Navbar.Collapse>
			</Header>
			{props.children}
			

			
		</div>

		<LoginModal
			show={loginModal}
			toRegister={() => setRegisterModal(true)}
			onHide={() => setLoginModal(false)}
				popup={true}
				dismissible={true}
				onClose={() => setLoginModal(false)}
		/>
		<RegisterModal
			show={registerModal}
			popup={true}
			dismissible={true}
			toLogin={() => setLoginModal(true)}
			onHide={() => setRegisterModal(false)}
			onClose={() => setRegisterModal(false)}
		/>
			</>
		

	);
}
