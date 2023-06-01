import React, { useState, useEffect, useContext } from "react";
import AppContext from "../appContext";
import { useForm } from "react-hook-form";

const Card = ({ title, description, goal, balance, creator, causeId }) => {
  const [showModal, setShowModal] = useState(false);
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
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (formData) => {
    console.log(formData);
    await data.methods
      .donate(formData.id)
      .send({ from: account, value: Number(formData.amount) });
    reset();
    setShowModal(false);
    window.location.reload();
    //setCause(await getData());
  };

  useEffect(() => {
    (async function () {
      // setupCreatePostListener();
      setCause(await getData());
      setLoading(true);
    })();
  }, []);

  return (
    <>
      <div className="rounded bg-white overflow-hidden shadow-lg justify-center ">
        <img
          className="w-full"
          src="https://images.unsplash.com/photo-1494253109108-2e30c049369b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tJTIwZm9vZCUyMHN0b3JlfGVufDB8fDB8fA%3D%3D&w=1000&q=80"
          alt="Sunset in the mountains"
        />
        <div className="px-4 py-1">
          <div className="font-bold text-lg uppercase">{title}</div>
        </div>

        <div className="px-4 py-1">
          <p className="text-gray-700 text-base">{description}</p>
        </div>

        <div className="px-4 pt-4 pb-2">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            {balance} of<small> {goal} ETH</small>
          </span>
        </div>
        
        <div className="px-4 pt-1 pb-2">
          <button
            onClick={(e) => setShowModal(true)}
            className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
            type="button"
            data-modal-toggle="popup-modal"
          >
            Donate Now
          </button>
        </div>
      </div>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="shadow-md rounded px-8 pt-6 pb-6 mb-2"
            >
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                    <h3 className="text-3xl font-semibold">{title}</h3>
                  </div>
                  {/*body*/}
                  <div className="relative p-6 flex-auto">
                    <div class="mb-4">
                      <label class="block text-gray-700 text-sm font-bold mb-2"></label>
                      <input
                        {...register("id", { required: true })}
                        class="shadow appearance-none border rounded w-full 
              py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="amount"
                        type="hidden"
                        value={causeId}
                      />
                      <input
                        {...register("amount", { required: true })}
                        class="shadow appearance-none border rounded w-full 
              py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="amount"
                        type="text"
                        placeholder="Amount In ETH"
                      />
                      {errors.amount && (
                        <p className="text-red-600">Amount is required.</p>
                      )}
                    </div>
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-center p-6 border-t border-solid border-blueGray-200 rounded-b">
                    <button
                      className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4  mr-2 rounded focus:outline-none focus:shadow-outline"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </button>
                    <div class="flex items-center justify-between">
                      <input
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="Submit"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default Card;
