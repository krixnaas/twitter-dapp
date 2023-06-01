import React, { useContext, useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Web3 from "web3";
import AppContext from "../appContext";

import TableCard from "../components/TableCard";

const New = () => {
  const [cause, setCause] = useState([]);
  const [loading, setLoading] = useState(true);
  const { dependencies } = useContext(AppContext);
  const { data, account } = dependencies;

  const getData = async () => {
    const homeData = await data.methods.getHomeData().call();
    console.log(homeData);
    return homeData;
    //return constructcauseArray(homeData);
  };
  useEffect(() => {
    (async function () {
      // setupCreatePostListener();
      setCause(await getData());
      setLoading(true);

      Doners();
    })();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (formData) => {
    await data.methods
      .createEvent(
        formData.title.charAt(0).toUpperCase() + formData.title.slice(1),
        formData.description,
        Number(formData.goal)
      )
      .send({ from: account });
    reset();

    setCause(await getData());
  };

  const Doners= async () => {
    const donersData= await data.methods.getInvestors().call();
    console.log(donersData);
  }

  return (
    <div className="max-w-6xl container  px-6 mx-auto flex flex-wrap flex-col md:flex-row ">
      <div className="flex flex-col w-full xl:w-2/5 mt-2 lg:items-start overflow-y-hidden">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white shadow-md rounded px-8 pt-6 pb-6 mb-2 w-full"
        >
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="title"
            >
              Title
            </label>
            <input
              {...register("title", { required: true })}
              class="shadow appearance-none border rounded w-full 
              py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="title"
              type="text"
              placeholder="Title"
            />
            {errors.title && <p className="text-red-600">Title is required.</p>}
          </div>
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="description"
            >
              Description
            </label>
            <textarea
              {...register("description", { required: true })}
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight 
              focus:outline-none focus:shadow-outline"
              id="description"
              type="text"
              placeholder="Description"
            ></textarea>
            {errors.description && (
              <p className="text-red-600">Description is required.</p>
            )}
          </div>
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="goal"
            >
              Goal (ETH)
            </label>
            <input
              {...register("goal", { required: true })}
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="goal"
              type="text"
              placeholder="Goal"
            />
            {errors.goal && (
              <p className="text-red-600">Goal for the cause is required.</p>
            )}
          </div>
          <div class="flex items-center justify-between">
            <input
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="Submit"
            />
          </div>
        </form>
      </div>
      <div className="w-full xl:w-3/5 overflow-y-hidden">
        <div>
          {cause.map((item) => {
            if (item.creator == account) {
              return (
                <TableCard
                  id={item.id}
                  title={item.title}
                  description={item.des}
                  goal={item.goal}
                  current={item.current}
                  status={item.status}
                />
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default New;
