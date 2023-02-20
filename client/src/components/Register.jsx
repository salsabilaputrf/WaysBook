import React, {useState} from "react";
import {API} from "@/config/api";
import { useMutation } from "react-query";
import {
	Button,
	Modal,
	TextInput,
	Label,
} from "flowbite-react";


const RegisterModal = (props) => {

    const [form, setForm] = useState({
		email: "",
		password: "",
		fullname: "",
	});
	const {
		email,
		password,
		fullname,
	} = form;


    const handleChangeRegister = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		});
	};

    const goLogin = () => {
		props.onHide();
		props.toLogin();
	};

    const handleSubmit = useMutation(async (e) => {
		try {
			e.preventDefault();

			// Configuration Content-type
			const config = {
				headers: {
					"Content-type": "application/json",
				},
			};

			// Data body
			const body = JSON.stringify(form);

			// Insert data user to database
			const response = await API.post("/register", body, config);
            console.log("response",response)
			// Notification
			if (response.data != null) {
                alert("Successfully Register");
				setForm({
					fullname: "",
					email: "",
					password: "",
				});
				props.onHide();
				props.toLogin();

				
			} 
		} catch (error) {
			alert("Failed to Register");
		}
	});

    return (
        <Modal
				size={"lg"}
				{...props}
			>
				<Modal.Header />
				<Modal.Body>
					<div className='space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8'>
						<h1 className='text-xl font-large text-gray-900 dark:text-white'>
							Register
						</h1>
						<div>
							<div className='mb-2 block'>
								<Label htmlFor='email' value='Email' />
							</div>
							<TextInput
								id='email'
                                name='email'
								placeholder='name@mail.com'
                                value={email}
                                type="email"
                                onChange={handleChangeRegister}
								required={true}
							/>
						</div>
						<div>
							<div className='mb-2 block'>
								<Label htmlFor='password' value='Password' />
							</div>
							<TextInput id='password' name='password' value={password} onChange={handleChangeRegister} type='password' required={true} />
						</div>
						<div>
							<div className='mb-2 block'>
								<Label htmlFor='fullname' value='Fullname' />
							</div>
							<TextInput id='fullname' name='fullname' value={fullname} onChange={handleChangeRegister} type='text' required={true} />
						</div>
						<div className='w-full'>
							<Button type='submit' onClick={(e) => handleSubmit.mutate(e)}>Register</Button>
						</div>
						<div className='text-sm font-medium text-gray-500 dark:text-gray-300'>
							Already have an account ? Click {" "}
							<span
                                onClick={(e) => goLogin()}
					
								className='text-blue-700 hover:underline dark:text-blue-500 hover:text-purple-600 cursor-pointer'
							>
								Here
							</span>
						</div>
					</div>
				</Modal.Body>
			</Modal>
    );


};

export default RegisterModal;
