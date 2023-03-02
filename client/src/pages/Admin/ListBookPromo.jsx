import React from "react";
import Layouts from "@/layouts/default";
import { useQuery, useMutation } from "react-query";
import Swal from "sweetalert2";
import { Button } from "flowbite-react";
import { API } from "@/config/api";

export default function ListBookPromo() {
  const { data: books } = useQuery("listPromo", async () => {
    const response = await API.get("/listPromoBook");
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

  const handleRemovePromo = useMutation(async (id) => {
    try {
      const response = await API.patch(`/removePromo/${id}`);

      if (response.data != null) {
        Toast.fire({
          icon: "success",
          title: "Successfully Remove Promo",
        });
      }
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: "Failed Remove Promo",
      });
    }
  });

  return (
    <Layouts className="">
      <div className="h-screen pt-24 px-28 relative">
        <div className="grid grid-cols-4 gap-9 mt-10 mx-10">
          {books?.map((book) => (
            <div
              key={book.id}
              className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 min-w-min"
            >
              <img
                className="p-8 rounded-t-lg"
                src={book.thumbnail}
                alt="product image"
              />

              <div className="px-5 pb-5">
                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                  {book.title}
                </h5>

                <p className="text-sm text-gray-500 truncate dark:text-gray-400 my-5">
                  by {book.author}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-gray-900 dark:text-white">
                    Rp. {book.price}
                  </span>

            z
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Absolute Image Background */}
        <img
          className="object-cover object-bottom h-full w-full absolute top-0"
          src="/img/bg.svg"
          alt=""
        />
      </div>
    </Layouts>
  );
}