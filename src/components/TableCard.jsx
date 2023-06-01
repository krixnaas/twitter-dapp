import React, { useState, useContext } from "react";

import AppContext from "../appContext";

const TableCard = ({
  id,
  title,
  description,
  goal,
  current,
  creator,
  status,
}) => {
  const { dependencies } = useContext(AppContext);
  const { data, account } = dependencies;
  let [checked, setChecked] = useState(status);

  const toggleChecked = async (causeID) => {
    //console.log(causeID);
    await data.methods.toggleCause(causeID).send({ from: account });
    window.location.reload();
  };

  const withDraw = async (causeID) => {
    await data.methods.withdraw(causeID).send({ from: account });   
    window.location.reload();
  }

  return (
    <div className="bg-white shadow-lg m-2 p-4 rounded">
      <div className="flex flex-row justify-start ml-4">
        <div>
          <img
            className="rounded-full  h-24 w-24 flex items-center justify-center"
            src="https://images.unsplash.com/photo-1494253109108-2e30c049369b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tJTIwZm9vZCUyMHN0b3JlfGVufDB8fDB8fA%3D%3D&w=1000&q=80"
          />
        </div>
        <div className="flex flex-col justify-between ml-4">
          <div className="flex justify-evenly">
            <div className="">
              <h3 className="tracking-wide text-lg text-indigo-500 font-semibold">
                {title}
              </h3>
            </div>
            <div className="flex-end">
              <p className="inline-block bg-gray-200 rounded-full px-2 py-1 text-sm font-semibold text-gray-700  mb-2">
                Goal: {goal} ETH
              </p>
            </div>
          </div>
          <h2 className="text-gray-700">{description}</h2>
        </div>
      </div>
      <hr className="mt-4" />
      <div className="flex flex-row justify-between mt-2 ">        
        <div>
          <div class="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
            <input
              type="checkbox"
              name="toggle"
              id="toggle"
              class="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
              checked={checked}
              onChange={(e) => toggleChecked(id)}
            />
            <label
              for="toggle"
              class="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
            ></label>
          </div>
          <label for="toggle" class="text-xs text-gray-700">
            {checked==true?"Active":"Disabled"}
          </label>
        </div>
        <div>Balance: {current} ETH</div>
        {current != 0 && checked!=false? 
        <div>
            <button onClick={(e) => withDraw(id)}
              class="bg-blue-500 hover:bg-blue-700 text-white  py-1 px-1 rounded focus:outline-none focus:shadow-outline"              
            >
              Withdraw
              </button>
        </div>
        : ""}
      </div>
    </div>
  );
};

export default TableCard;
{
  /**

<div>
        
      </div>
*/
}
