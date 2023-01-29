import React from 'react';
import { useLoaderData } from 'react-router-dom';

const BillingPage = () => {
    const billingData = useLoaderData()
    const {name, mobile, email, amount, _id } = billingData;
    console.log(billingData)
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table w-full">

          <thead>
            <tr>
              <th>id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Payable amount</th>
            </tr>
          </thead>
          <tbody>
            {
              billingData.map(billingRow => <>
                <tr>
                  <th>{billingRow._id}</th>
                  <td>{billingRow.name}</td>
                  <td>{billingRow.email}</td>
                  <td>{billingRow.mobile}</td>
                  <td>{billingRow.amount}</td>
                </tr>
              </>)
            }
            

          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BillingPage;