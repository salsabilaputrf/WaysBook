import React from "react";
import Layouts from "@/layouts/default";
import { Swiper, SwiperSlide } from "swiper/react";
import { Button } from "flowbite-react";
import { useQuery } from "react-query";
import { API } from "@/config/api";

import "swiper/css";

export default function () {


	let { data: promoBooks } = useQuery("listPromoBook", async () => {
		const response = await API.get("/listPromoBook");
		return response.data.data;
	});

	console.log("list promo", promoBooks)


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
					<div className='absolute -bottom-28 overflow-hidden w-screen px-44 '>
						{promoBooks.length == 1 ? (
							<div className='flex w-[42rem] '>
							<img
								src='/uploads/book1.png'
								alt=''
								className='w-[64rem] h-[24rem]'
							/>
							<div className='p-4 my-12 flex flex-col gap-4 bg-white'>
								<div>
									<h2 className='text-3xl font-semibold font-serif'>
										Judul
									</h2>
									<p className='text-gray-400 italic'>By. Name Author</p>
								</div>
								<p className='text-justify line-clamp-3'>
									Lorem ipsum dolor sit amet consectetur, adipisicing elit.
									Quis provident autem doloremque ducimus aliquam. Facilis
									inventore, aut tenetur beatae ut, blanditiis obcaecati
									reiciendis nihil labore vitae, dolores atque nesciunt
									eveniet.
								</p>

								<p className='text-green-400 font-semibold text-lg '>
									Rp. 50.000
								</p>
								<Button className='w-full rounded-none' color='dark'>
									Add to Cart
								</Button>
							</div>
						</div>
						) : (
							<Swiper
								spaceBetween={50}
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
												src='/uploads/book1.png'
												alt=''
												className='w-[64rem] h-[24rem]'
											/>
											<div className='p-4 my-12 flex flex-col gap-4 bg-white'>
												<div>
													<h2 className='text-3xl font-semibold font-serif'>
														Judul
													</h2>
													<p className='text-gray-400 italic'>By. Name Author</p>
												</div>
												<p className='text-justify line-clamp-3'>
													Lorem ipsum dolor sit amet consectetur, adipisicing elit.
													Quis provident autem doloremque ducimus aliquam. Facilis
													inventore, aut tenetur beatae ut, blanditiis obcaecati
													reiciendis nihil labore vitae, dolores atque nesciunt
													eveniet.
												</p>

												<p className='text-green-400 font-semibold text-lg '>
													Rp. 50.000
												</p>
												<Button className='w-full rounded-none' color='dark'>
													Add to Cart
												</Button>
											</div>
										</div>
									</SwiperSlide>
									);
								})}
								
								{/* <SwiperSlide className='w-[42rem] cursor-grab rounded-none'>
									<div className='flex w-full'>
										<img
											src='/uploads/book1.png'
											alt=''
											className='w-[64rem] h-[24rem]'
										/>
										<div className='p-4 my-12 flex flex-col gap-4 bg-white'>
											<div>
												<h2 className='text-3xl font-semibold font-serif'>
													Judul
												</h2>
												<p className='text-gray-400 italic'>By. Name Author</p>
											</div>
											<p className='text-justify line-clamp-3'>
												Lorem ipsum dolor sit amet consectetur, adipisicing elit.
												Quis provident autem doloremque ducimus aliquam. Facilis
												inventore, aut tenetur beatae ut, blanditiis obcaecati
												reiciendis nihil labore vitae, dolores atque nesciunt
												eveniet.
											</p>
											<p className='text-green-400 font-semibold text-lg '>
												Rp. 50.000
											</p>
											<Button className='w-full rounded-none' color='dark'>
												Add to Cart
											</Button>
										</div>
									</div>
								</SwiperSlide>
								<SwiperSlide className='w-[42rem] cursor-grab rounded-none'>
									<div className='flex w-full'>
										<img
											src='/uploads/book1.png'
											alt=''
											className='w-[64rem] h-[24rem]'
										/>
										<div className='p-4 my-12 flex flex-col gap-4 bg-white'>
											<div>
												<h2 className='text-3xl font-semibold font-serif'>
													Judul
												</h2>
												<p className='text-gray-400 italic'>By. Name Author</p>
											</div>
											<p className='text-justify line-clamp-3'>
												Lorem ipsum dolor sit amet consectetur, adipisicing elit.
												Quis provident autem doloremque ducimus aliquam. Facilis
												inventore, aut tenetur beatae ut, blanditiis obcaecati
												reiciendis nihil labore vitae, dolores atque nesciunt
												eveniet.
											</p>

											<p className='text-green-400 font-semibold text-lg '>
												Rp. 50.000
											</p>
											<Button className='w-full rounded-none' color='dark'>
												Add to Cart
											</Button>
										</div>
									</div>
								</SwiperSlide>
								<SwiperSlide className='w-[42rem] cursor-grab rounded-none'>
									<div className='flex w-full'>
										<img
											src='/uploads/book1.png'
											alt=''
											className='w-[64rem] h-[24rem]'
										/>
										<div className='p-4 my-12 flex flex-col gap-4 bg-white'>
											<div>
												<h2 className='text-3xl font-semibold font-serif'>
													Judul
												</h2>
												<p className='text-gray-400 italic'>By. Name Author</p>
											</div>
											<p className='text-justify line-clamp-3'>
												Lorem ipsum dolor sit amet consectetur, adipisicing elit.
												Quis provident autem doloremque ducimus aliquam. Facilis
												inventore, aut tenetur beatae ut, blanditiis obcaecati
												reiciendis nihil labore vitae, dolores atque nesciunt
												eveniet.
											</p>
											<p className='text-green-400 font-semibold text-lg '>
												Rp. 50.000
											</p>
											<Button className='w-full rounded-none' color='dark'>
												Add to Cart
											</Button>
										</div>
									</div>
								</SwiperSlide> */}
							</Swiper>

						)}
						
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
				<section className='bg-[#F3F3F3] h-screen'>
					<div>something</div>
				</section>
			</div>
		</Layouts>
	);
}
