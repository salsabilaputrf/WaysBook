import React, {useState, useContext} from "react";
import Layouts from "@/layouts/default";
import { useMutation } from "react-query";
import { useQuery } from "react-query";
import { useParams, useNavigate } from "react-router-dom";
import { API } from "@/config/api";
import { AppContext } from "@/context/AppContext";
import Swal from "sweetalert2";

export default function Detail() {
	const { id } = useParams();
    const [state, dispatch] = useContext(AppContext);

    let { data: book } = useQuery("bookCache", async () => {
		const response = await API.get("/book/" + id);
		return response.data.data;
	});

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

    const handleOrder = useMutation (async (id) => {
        try {

			// Configuration Content-type
			// const config = {
			// 	headers: {
			// 		"Content-type": "multipart/form-data",
			// 	},
			// };

			// Data body
			// console.log("book data", form);
			

			// Insert data user to database
			const response = await API.post("/addOrder/" + id);

			// Notification
			if (response.data != null) {

				Toast.fire({
					icon: "success",
					title: "Successfully Add to Cart",
				});
			}
		} catch (error) {
			Toast.fire({
				icon: "error",
				title: "Failed to Add Cart",
			});
		
		}
    });

    const handleIsLogin = () => {
        Toast.fire({
            icon: "error",
            title: "You must login first",
        });
    };

    console.log(book)

    return (
        <Layouts className={""}>
            
            <div className=" bg-slate-300 pb-10">
                <div className="pb-7 pt-32 px-96 flex flex-row gap-16">
                <div>
                    <img src={book?.thumbnail} className="w-[28rem] h-[38rem]"/>
                </div>
                <div className="grid grid-rows-5 gap-4">
                    <div>
                        <h1 className="font-serif text-5xl font-bold">{book?.title}</h1>
                        <p className="text-slate-500 mt-3 text-lg"><i>By. {book?.author}</i></p>
                    </div>

                    <div>
                        <h1 className="text-2xl font-bold mb-2">Publication Date</h1>
                        <p  className="text-slate-500 mt-3 text-lg">{book?.publication_date}</p>
                    </div>

                    <div>
                        <h1 className="text-2xl font-bold mb-2">Pages</h1>
                        <p className="text-slate-500 mt-3 text-lg">{book?.pages}</p>
                    </div>

                    <div>
                        <h1 className="text-2xl font-bold mb-2 text-red-600">ISBN</h1>
                        <p className="text-slate-500 mt-3 text-lg">{book?.ISBN}</p>
                    </div>

                    <div>
                        <h1 className="text-2xl font-bold mb-2">Price</h1>
                        <p className="text-green-500 mt-3 text-lg">Rp. {book?.price}</p>
                    </div>
                </div>
                </div>

                <div className="pb-7 px-96 ">
                    <h1 className="font-serif text-5xl font-bold mt-10">About This Book</h1>
                    <p className="text-slate-500 mt-3 text-lg text-justify">{book?.description}</p>
                </div>
                <div className="px-96 flex justify-end">
                {state.isLogin === true ? (
                <button onClick={() => handleOrder.mutate(book?.id)} type="button" className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-sm hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Add to Cart
                    <img style={{width: "30px", marginLeft:"15px"}} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAACp0lEQVR4nO2ZvWsUQRjGfysRjKWFGNEEg8bO+NGJ2CgnCPoXGAUFC69QTBBMkcpCIgpJ1MIvTBptFBS8iIIkQi5izn9BEVGwslB7GXgPXudmb293Z/f2YH8wpHjem32enWE+NlBSUpIF+4Bp4AXwDLgG7KIHWAdcAj4CDat9AM5QcPNTDuN2u0CPmL8ObAeGgbtFDhEAVy2DUxKqyXrgplVzkR4xX9gQQQzzhQsRJDBfmBBBCvNdDxF4MN+1EIFH87mHCDIw3yTzEFmazzxEHua9hdgMzAF11cE34K9q3zs466Rpn4Cf1jO/KN14mxWvLdxxdPg7R/ONkBC/HDW3XQHeOwq/An9kJPIw31AhfsgL/OzQjdcWXqqCEYrHiPJnvLYwrQpOUjxOKH/GawtnVcEViseE8nfOVXBQFTyieNxX/g65CjapguWQTqqylFUT6Gl+GwBLyp9zGTU8lIIHIXpdXdD7HPqq6KsxtT7ps7nW22xT5t/Qhn7ggPx1sag6GnDoeqmLo21VWs2hH1G62WwTM686GvUYYK/SHjv0qtLDpuB/821YzibtltqKxwDHIpbIWaUfjQowKYULjkPbuOpozGOA00q77NCfK30wKoAuNiOhGVPauMcAE0o75dDNd6Q1GQkzQ9pyS3V23NIqEUOdNMCNiKlp2EiHnG8znKNKm/cYYEFpe0jJYdXZPUsbUNqixwCvlbYlzdtHdrlmZ0vWnIvacJJuZPWQDTKQeb8W93vqWxXCfKD1cVxIog0qH2Zx6Zi5OOtuhlSUj5k4P9Q7n9kXusWk8hFrCu22rm9D5M+Qdc01nhKfe2oynGGHPJ/0y7NqEeejSHYA76zlrxttGdiZ9G3st95E3u2V/MczFRvkDvoUWMnB9ArwRO7o5tklJSWE8w/DGM+MRpBpHgAAAABJRU5ErkJggg=="/>
                </button>
                ) : (
                <button onClick={handleIsLogin} type="button" className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-sm hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Add to Cart
                    <img style={{width: "30px", marginLeft:"15px"}} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAACp0lEQVR4nO2ZvWsUQRjGfysRjKWFGNEEg8bO+NGJ2CgnCPoXGAUFC69QTBBMkcpCIgpJ1MIvTBptFBS8iIIkQi5izn9BEVGwslB7GXgPXudmb293Z/f2YH8wpHjem32enWE+NlBSUpIF+4Bp4AXwDLgG7KIHWAdcAj4CDat9AM5QcPNTDuN2u0CPmL8ObAeGgbtFDhEAVy2DUxKqyXrgplVzkR4xX9gQQQzzhQsRJDBfmBBBCvNdDxF4MN+1EIFH87mHCDIw3yTzEFmazzxEHua9hdgMzAF11cE34K9q3zs466Rpn4Cf1jO/KN14mxWvLdxxdPg7R/ONkBC/HDW3XQHeOwq/An9kJPIw31AhfsgL/OzQjdcWXqqCEYrHiPJnvLYwrQpOUjxOKH/GawtnVcEViseE8nfOVXBQFTyieNxX/g65CjapguWQTqqylFUT6Gl+GwBLyp9zGTU8lIIHIXpdXdD7HPqq6KsxtT7ps7nW22xT5t/Qhn7ggPx1sag6GnDoeqmLo21VWs2hH1G62WwTM686GvUYYK/SHjv0qtLDpuB/821YzibtltqKxwDHIpbIWaUfjQowKYULjkPbuOpozGOA00q77NCfK30wKoAuNiOhGVPauMcAE0o75dDNd6Q1GQkzQ9pyS3V23NIqEUOdNMCNiKlp2EiHnG8znKNKm/cYYEFpe0jJYdXZPUsbUNqixwCvlbYlzdtHdrlmZ0vWnIvacJJuZPWQDTKQeb8W93vqWxXCfKD1cVxIog0qH2Zx6Zi5OOtuhlSUj5k4P9Q7n9kXusWk8hFrCu22rm9D5M+Qdc01nhKfe2oynGGHPJ/0y7NqEeejSHYA76zlrxttGdiZ9G3st95E3u2V/MczFRvkDvoUWMnB9ArwRO7o5tklJSWE8w/DGM+MRpBpHgAAAABJRU5ErkJggg=="/>
                </button>
                )}
                
                </div>

                    
            </div>
        </Layouts>
    );
}