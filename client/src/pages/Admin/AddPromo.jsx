import React, {useState} from "react";
import Layouts from "@/layouts/default";
import { useMutation } from "react-query";

import { API } from "@/config/api";
import { useQuery } from "react-query";
import Swal from "sweetalert2";

import { Button, Modal, Label, TextInput } from "flowbite-react";


export default function AddPromo() {
    const [promo, setPromo] = useState(false)

    let { data: books } = useQuery("listAddPromo", async () => {
		const response = await API.get("/listAddPromo");
		return response.data.data;
	});

    const [form, setForm] = useState({
        discount: null,
    });

    const handleChange = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		});
	};

    const Toast = Swal.mixin({
		toast: true,
		position: "top-end",
		showConfirmButton: false,
		timer: 2000,
		timerProgressBar: true,
		didOpen: (toast) => {
			toast.addEventListener("mouseenter", Swal.stopTimer);
			toast.addEventListener("mouseleave", Swal.resumeTimer);
		},
	});

    const handlePromo = useMutation (async (id) => {
        try {

			// Configuration Content-type
			const config = {
				headers: {
					"Content-type": "multipart/form-data",
				},
			};

			// Data body
			console.log("book data", form);
			

			// Insert data user to database
			const response = await API.patch("/addPromo/" + id, form, config);

			// Notification
			if (response.data != null) {
				setForm(null);
				setPromo(false)

				Toast.fire({
					icon: "success",
					title: "Successfully Add to Promo",
				});
			}
		} catch (error) {
			Toast.fire({
				icon: "error",
				title: "Failed to Add Promo",
			});
		
		}
    });

    return (
        <Layouts className={""}>
            <div className="bg-slate-300 h-[100vh] pt-24 px-28">
                <div class="grid grid-cols-4 gap-9 mt-10 mx-10">
                {books?.map((room, k) => {
                    return (
                       <>
                        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 min-w-min ">
                    
                            <img className="p-8 rounded-t-lg" src={room.thumbnail}alt="product image" />
                            
                        <div className="px-5 pb-5">
                            
                            <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{room.title}</h5>
                            
                            <p className="text-sm text-gray-500 truncate dark:text-gray-400 my-5">
                            by {room.author}
                            </p>
                            <div className="flex items-center justify-between">
                                <span className="text-xl font-bold text-gray-900 dark:text-white">Rp. {room.price}</span>
                                <Button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button" data-modal-target="discount-modal" data-modal-toggle="discount-modal" onClick={() => setPromo(true)}>Add to Promo</Button>
                            </div>
                        </div>
                    </div>

                    <Modal
                        size={"lg"}
                        show={promo}
                        popup={true}
			            dismissible={true}
                        onClose={() => setPromo(false)}
                    >
                        <Modal.Header />
                        <Modal.Body>
                            <div className='space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8'>
                                <h1 className='text-xl font-medium text-gray-900 dark:text-white'>
                                    Promo
                                </h1>
                                <div>
                                    <div className='mb-2 block'>
                                        <Label htmlFor='discount' value='Example : 45 ' />
                                    </div>
                                    <TextInput
                                        id='discount'
                                        name='discount'
                                        type='number'
                                    
                                        onChange={handleChange}
                                        required={true}
                                    />
                                </div>
                            
                                
                                <div className='w-full'>
                                    <Button type='submit' onClick={() => handlePromo.mutate(room.id)}>Add to Promo</Button>
                                </div>
                                
                            </div>
                        </Modal.Body>
                    </Modal>
                    </>
                       
                    );
                })}
                    

                </div>
            </div>
        </Layouts>
    );
}