import React, {useState, useContext} from "react";
import {API} from "@/config/api";
import { useMutation } from "react-query";
import {
	Button,
	Modal,
	TextInput,
	Label,
} from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "@/context/AppContext";

const LoginModal = (props) => {

    const navigate = useNavigate();
    const [state, dispatch] = useContext(AppContext);

    const [form, setForm] = useState({
		email: "",
		password: "",
	});
	const {
		email,
		password,
	} = form;

    const handleChangeLogin = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		});
	};

    const handleSubmit = useMutation(async (e) => {
		try {
			e.preventDefault();

			// Configuration
			const config = {
				headers: {
					"Content-type": "application/json",
				},
			};

			// Data body
			const body = JSON.stringify(form);

			// Insert data for login process
			const response = await API.post("/login", body, config);
            console.log("login", response)

			// Checking process
			if (response.data != null) {
                alert("Successfully Login");
				// Send data to useContext
				dispatch({
					type: "LOGIN",
					payload: response.data.data,
				});
				navigate("/");
				props.onHide();
	
			}
		} catch (error) {
			alert("Failed to Login");
		}
	});

    const goRegister = () => {
		props.onHide();
		props.toRegister();
	};


    return (
            <Modal
				size={"lg"}
				{...props}
			>
				<Modal.Header />
				<Modal.Body>
					<div className='space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8'>
						<h1 className='text-xl font-medium text-gray-900 dark:text-white'>
							Login
						</h1>
						<div>
							<div className='mb-2 block'>
								<Label htmlFor='email' value='Email' />
							</div>
							<TextInput
								id='email'
                                name='email'
                                type='email'
                                value={email}
                                onChange={handleChangeLogin}
								placeholder='name@mail.com'
								required={true}
							/>
						</div>
						<div>
							<div className='mb-2 block'>
								<Label htmlFor='password' value='Password' />
							</div>
							<TextInput id='password' name='password' value={password} onChange={handleChangeLogin} type='password' required={true} />
						</div>
						
						<div className='w-full'>
							<Button type='submit' onClick={(e) => handleSubmit.mutate(e)}>Login</Button>
						</div>
						<div className='text-sm font-medium text-gray-500 dark:text-gray-300'>
							Don't have an account ? Click{" "}
							<span
								onClick={(e) => goRegister()}
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

export default LoginModal;
