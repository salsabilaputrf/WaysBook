import React, {useState} from "react";
import Layouts from "@/layouts/default";
import { useMutation } from "react-query";
import css from "./index.module.css";
import { useNavigate } from "react-router-dom";
import { API } from "@/config/api";



export default function AddBook() {
    const redirect = useNavigate();
    const [preview, setPreview] = useState(null);
    const [form, setForm] = useState({
        title: "",
        publicationDate: "",
        pages: "",
        isbn: "",
        price: "",
        description: "",
        author: "",
        bookAttachment: null,
        image: null,
    });

    

    const handleSubmit = useMutation(async (e) => {
		try {
			e.preventDefault();

			// Configuration
			const config = {
				headers: {
					"Content-type": "multipart/form-data",
				},
			};
			console.log("book data", form);
			const formData = new FormData();
			formData.append("title", form.title);
			formData.append("book_attachment", form.bookAttachment[0], form.bookAttachment[0].name);
            formData.append("image", form.image[0], form.image[0].name);
			formData.append("publication_date", form.publicationDate);
			formData.append("pages", form.pages);
            formData.append("author", form.author)
			formData.append("description", form.description);
			formData.append("isbn", form.isbn);
			formData.append("price", form.price);
			

			const response = await API.post("/addBook", formData, config);

			console.log("Book success to add", response);
            alert("Successfully to Add Book");
			
			setForm(null);

			redirect("/");
			
		} catch (err) {
			console.log("Failed to add book", err);
			alert("Failed to Add Book");


		
		}
	});

    const handleChange = (e) => {
		setForm({
			...form,
			[e.target.name]:
				e.target.type === "file" ? e.target.files : e.target.value,
		});

		// Create image url for preview
		if (e.target.type === "file") {
			let url = URL.createObjectURL(e.target.files[0]);
			setPreview(url);
		}
	};

	return (
		<Layouts className={""}>
            
            <div className="bg-slate-300 pb-5">
                <div className="flex h-screen items-center justify-center" >
                    
                    <form onSubmit={(e) => handleSubmit.mutate(e)} className="w-[90vw] max-w-lg bg-slate-300 rounded-lg  p-8 flex flex-col mt-16" >
                    <h1 className="text-3xl font-bold mb-1 text-center">Add Book</h1>
                        <div className="w-full max-w-5xl rounded-lg p-3 flex flex-col overflow-hidden">
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            id="title"
                            
                            name="title"
                            onChange={handleChange}
                            className="border border-gray-300 p-2 rounded-lg mb-2"
                        />

                        <label htmlFor="publication-date">Publication Date</label>
                        <input
                            type="date"
                            id="publication-date"
                      
                            name="publicationDate"
                            onChange={handleChange}
                            className="border border-gray-300 p-2 rounded-lg mb-2"
                        />

                        <label htmlFor="pages">Pages</label>
                        <input
                            type="number"
                            id="pages"
                           
                            name="pages"
                            onChange={handleChange}
                            className="border border-gray-300 p-2 rounded-lg mb-2"
                        />

                        <label htmlFor="isbn">ISBN</label>
                        <input
                            type="text"
                            id="isbn"
                        
                            name="isbn"
                            onChange={handleChange}
                            className="border border-gray-300 p-2 rounded-lg mb-2"
                        />

                        <label htmlFor="price">Price</label>
                        <input
                            type="number"
                            id="price"
 
                            name="price"
                            onChange={handleChange}
                            className="border border-gray-300 p-2 rounded-lg mb-2"
                        />

                        <label htmlFor="author">Author</label>
                        <input
                            type="text"
                            id="author"
 
                            name="author"
                            onChange={handleChange}
                            className="border border-gray-300 p-2 rounded-lg mb-2"
                        />

                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                          
                            name="description"
                            onChange={handleChange}
                            className="border border-gray-300 p-2 rounded-lg mb-2"
                        />
                    
                            <label htmlFor="book-attachment">Book Attachment</label>
                            <input
                                type="file"
                                id="book-attachment"
                                name="bookAttachment"
                                onChange={handleChange}
                                accept=".pdf"
                                className="border border-gray-300 p-2 rounded-lg "
                            />

                            <label htmlFor="image">Thumbnail</label>
                            <input
                                type="file"
                                id="image"
                                name="image"
                                onChange={handleChange}
                                className="border border-gray-300 p-2 mb-5"
                            />
                   

                        

                        <button type="submit" className="bg-blue-500 text-white rounded p-2 hover:bg-blue-700">
                            Add Book
                        </button>
                        </div>
                    </form>
                </div>
            
			</div>

            {/* Absolute Image Background
            <div className='h-full w-full  absolute top-0'>
                <img
                    className='object-cover object-bottom h-full w-full'
                    src='/img/bg.svg'
                    alt=''
                />
            </div> */}
        </Layouts>
	);
}
