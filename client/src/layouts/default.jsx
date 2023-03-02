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
					<div className='pb-3 md:pb-0 flex gap-12'>
						{state.user.role === "reader" ? (
						<Link to="/order" >
						
  
							<div className="flex items-center p-3 text-sm font-medium text-black-600  rounded-b-lg  hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-red-500 hover:underline">
								<img style={{width: "40px"}} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAACp0lEQVR4nO2ZvWsUQRjGfysRjKWFGNEEg8bO+NGJ2CgnCPoXGAUFC69QTBBMkcpCIgpJ1MIvTBptFBS8iIIkQi5izn9BEVGwslB7GXgPXudmb293Z/f2YH8wpHjem32enWE+NlBSUpIF+4Bp4AXwDLgG7KIHWAdcAj4CDat9AM5QcPNTDuN2u0CPmL8ObAeGgbtFDhEAVy2DUxKqyXrgplVzkR4xX9gQQQzzhQsRJDBfmBBBCvNdDxF4MN+1EIFH87mHCDIw3yTzEFmazzxEHua9hdgMzAF11cE34K9q3zs466Rpn4Cf1jO/KN14mxWvLdxxdPg7R/ONkBC/HDW3XQHeOwq/An9kJPIw31AhfsgL/OzQjdcWXqqCEYrHiPJnvLYwrQpOUjxOKH/GawtnVcEViseE8nfOVXBQFTyieNxX/g65CjapguWQTqqylFUT6Gl+GwBLyp9zGTU8lIIHIXpdXdD7HPqq6KsxtT7ps7nW22xT5t/Qhn7ggPx1sag6GnDoeqmLo21VWs2hH1G62WwTM686GvUYYK/SHjv0qtLDpuB/821YzibtltqKxwDHIpbIWaUfjQowKYULjkPbuOpozGOA00q77NCfK30wKoAuNiOhGVPauMcAE0o75dDNd6Q1GQkzQ9pyS3V23NIqEUOdNMCNiKlp2EiHnG8znKNKm/cYYEFpe0jJYdXZPUsbUNqixwCvlbYlzdtHdrlmZ0vWnIvacJJuZPWQDTKQeb8W93vqWxXCfKD1cVxIog0qH2Zx6Zi5OOtuhlSUj5k4P9Q7n9kXusWk8hFrCu22rm9D5M+Qdc01nhKfe2oynGGHPJ/0y7NqEeejSHYA76zlrxttGdiZ9G3st95E3u2V/MczFRvkDvoUWMnB9ArwRO7o5tklJSWE8w/DGM+MRpBpHgAAAABJRU5ErkJggg=="/>
								<div class="inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full object-right-top  dark:border-gray-900">20</div>
  
							</div>
							
						</Link>
						) : (
							<div></div>
						)}
						
						<Dropdown
							arrowIcon={false}
							inline={true}
							label={
								<Avatar
									alt='User settings'
									img={state.user.image}
									rounded={true}
									style={{paddingTop: "8px"}}
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
							<Dropdown.Item>
							<Link to="/listPromoBook" >
								<div className="flex items-center p-3 text-sm font-medium text-black-600  rounded-b-lg  hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-red-500 hover:underline">
								<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAABsklEQVR4nO2ZsUoDQRCGPzGFgiCITcBWsLKxt/ABRC2SKr6Cb+ADiGBEGxFREBtPvJhTH8ImaGNjJ0QfQxZHGI5LNMls7g73g2G5XW7+ndu7WXYOAoHAv6AC1IAmEAOJJ4tFoyaaZpPf9zjppIftWQVRz2HyiZhbiZE5VA43LJc2A+d7U+kdYIB+531O/odK6psYGb2k4yKx1AwBFHUFtoEIaKT6WgNkmZbck0sAkfRdZ/QNYlFeATTKvgI+SUIAirACQ5CENKoIaZTB0+idjLu2lB/xjui5tpQBOKYxIq8AzCh9AKcyedeWkqqcU10b4PvMW5diQdwjvT4DXeCkaE/sLzWmDvAp9k7B+K3G9KQm/wFcWIjOAmvS+qwxrQJtNb4LTBpociQOXeurxrQM3Kox95pNUcB9IMvXYuosfQzMGGj1FbXyVQUuVd85MG+g01fUytcccKaur4AFA42+ola+HlMf9A2whCcsi7vOxwPwpnzGwAoe0U9qa8Qg7oFXyfPOX1tStFdqQ1TbetmL2qjc9TpjoCK/eywC6KpdNusoWfiffB0JwmWfiXEGEAgEKCZfRuZHKgLr0lYAAAAASUVORK5CYII=" style={{width: "30px"}}/>
									List Book Promo
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

					<>
			
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
					</>
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
