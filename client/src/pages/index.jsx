import React from "react";
import Layouts from "@/layouts/default";
import { Swiper, SwiperSlide } from "swiper/react";

import { Button } from "flowbite-react";
import { useQuery } from "react-query";
import { API } from "@/config/api";

import "swiper/css";
import { Link } from "react-router-dom";

export default function () {



	let { data: promoBooks } = useQuery("listPromoBook", async () => {
		const response = await API.get("/listPromoBook");
		return response.data.data;
	});

	let { data: books } = useQuery("listAllBook", async () => {
		const response = await API.get("/listBook");
		return response.data.data;
	});





	return (
		<Layouts className={""}>
			<div>
				<section className='relative h-[56rem]'>
					{/* Hero Content */}
					<div className='pt-[20rem]'>
						<h1 className='text-5xl text-center leading-tight font-serif'>
							With us, you can shop online & help <br />
							save your high street at the same time
						</h1>
					</div>
					<div className='absolute -bottom-28 overflow-hidden w-screen px-64 '>
							<Swiper
								spaceBetween={150}
								slidesPerView={"auto"}
								pagination={{
									clickable: true,
								}}
								onSlideChange={() => console.log("slide change")}
								onSwiper={(swiper) => console.log(swiper)}
							>
								{promoBooks?.map((room, k) => {
									return (
									<SwiperSlide className='w-[42rem] cursor-grab rounded-none'>
										<div className='flex w-full'>
											<img
												src={room.thumbnail}
												alt=''
												className='w-[18rem] h-[24rem]'
											/>
											<div className='p-4 my-12 flex flex-col gap-4 bg-white'>
												<div>
													<h2 className='text-3xl font-semibold font-serif'>
														{room.title}
													</h2>
													<p className='text-gray-400 italic'>By. {room.author}</p>
												</div>
												<p className='text-justify line-clamp-3'>
													{room.description}
												</p>

												<p className='text-red-600 font-semibold text-lg '>
													<del>Rp. {room.price}</del>
												</p>

												<p className='text-yellow-400 font-semibold text-lg '>
													Rp. {room.discount_price}
												</p>
												<Button className='w-full rounded-none' color='dark'>
													Add to Cart
												</Button>
											</div>
										</div>
									</SwiperSlide>
									);
								})}
								
								
							</Swiper>
						
					</div>
					{/* Absolute Image Background */}
					<div className='h-full w-full  absolute top-0'>
						<img
							className='object-cover object-bottom h-full w-full'
							src='/img/bg.svg'
							alt=''
						/>
					</div>
				</section>
				<section className='bg-[#F3F3F3] h-screen pt-80 px-64'>
					<h1 className="font-black text-5xl font-serif mb-8">List Book</h1>
				{books?.map((book, k) => {
					return (
					
					<div className="grid grid-cols-4 gap-9">
						<Link
						to={"/detail/" + book.id}
						>
						<div className="w-[18rem] max-w-sm   rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 min-w-min ">
						
						<img className="px-5 pt-5 rounded-t-lg h-[22rem]" src={book.thumbnail}alt="product image" />
						
						<div className="px-5 py-5">
						
							<h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{book.title}</h5>
							
							<p className="text-sm text-gray-500 truncate dark:text-gray-400 my-5">
							<i>by {book.author}</i>
							</p>

							<p className='text-green-500 font-semibold text-lg '>
								Rp. {book.price}
							</p>
						
						</div>
					</div>
						</Link>
					
					</div>
					);
				})}
					

				</section>
			</div>
		</Layouts>
	);
}
