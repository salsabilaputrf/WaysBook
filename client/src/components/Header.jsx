import React from "react";
import { Navbar } from "flowbite-react";

export default function Header(props) {
	return (
		<Navbar {...props} fluid={true} rounded={true}>
			<div className='max-w-screen-xl w-full mx-auto md:flex md:justify-between p-4'>
				<div className='w-full md:w-auto flex md:block justify-between mb-2'>
					<Navbar.Brand to='/navbars'>
						<img src='/img/logo.svg' alt='waysbook Logo' />
					</Navbar.Brand>
					<Navbar.Toggle />
				</div>
				{props.children}
			</div>
		</Navbar>
	);
}
