import React from "react";
import Layouts from "@/layouts/default";
import css from "./index.module.css";
import {
	Table,
} from "flowbite-react";


export default function Home() {
	return (
		<Layouts className={""}>
            
            <div className={css.MaxWidth}>
				<div className={css.Card}>
					<h2 className='fw-bold fs-1 my-4 text-3xl text-gray-900 font-black'>Incoming Transaction</h2>
					<Table hover size='lg' className="w-full p-16 text-5xl text-left text-gray-500 dark:text-gray-400" >
						<thead className="text-xl  uppercase text-red-600 bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
							<tr >
								<th>No</th>
								<th>Users</th>
								<th>Product Purchased</th>
								<th>Total Payment</th>
								<th>Status Payment</th>
							</tr>
						</thead>
						<tbody>
                            <tr className="text-lg text-gray-900 bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td>1</td>
                                <td>Neng Tesla</td>
                                <td>Cerita Sangkuriang, Dongeng Si Kancil</td>
                                <td>5000000</td>
                                <td className={css.TextSuccess}>Success</td>
                            </tr>
                           
						
								{/* <tr>
									{" "}
									<td colSpan={6} className='text-center'>
										Data Kosong
									</td>
								</tr> */}
							
						</tbody>
					</Table>
				</div>
			</div>

            {/* Absolute Image Background */}
            <div className='h-full w-full  absolute top-0'>
                <img
                    className='object-cover object-bottom h-full w-full'
                    src='/img/bg.svg'
                    alt=''
                />
            </div>
        </Layouts>
	);
}
