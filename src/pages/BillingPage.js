import React, { useContext } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useLoaderData } from 'react-router-dom';
import { authContext } from '../context/AuthProvider';
import BillingModal from '../components/BillingModal';
import { toast } from 'react-toastify';

const BillingPage = () => {
  
  const {user} = useContext(authContext)
  const queryClient = useQueryClient()
    // const billingData = useLoaderData()
    // const {name, mobile, email, amount, _id } = billingData;
    // console.log(billingData)

    const url = `http://localhost:5000/billing-list`

    const { data: billingData = [], isLoading, refetch } = useQuery({
        queryKey: ['bill'],
        queryFn: async () => {
            const res = await fetch(url, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('newAccessToken')}`
                }
            });
            const data = await res.json()
            return data;
        }
    })
    
    const handleDelete = (id) => {
      const agree = window.confirm('are you sure to delete?')

      if(agree){
          fetch(`http://localhost:5000/delete-billing/${id}`, {
              method: 'DELETE',
              headers: {
                  authorization: `bearer ${localStorage.getItem('newAccessToken')}`
              }
          })
          .then(res => res.json())
          .then(data => {
              console.log(data)
              if(data.deletedCount > 0){
              toast("deleted successfully")
              refetch()
              }
          })
      }
  };
      // const { data: billingData = [], isLoading, refetch } = useQuery({
      //     queryKey: ['bill'],
      //     queryFn: async () => {
      //         const res = await fetch('http://localhost:5000/billing-list');
      //         const data = await res.json()
      //         return data;
      //     }
      // })
      

    if(isLoading){
      return <div className="flex items-center justify-center ">
      <div className="w-16 h-16 border-b-2 border-gray-900 rounded-full animate-spin"></div>
      </div>
  }
 
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
              <th>update</th>
              <th>Delete</th>

            </tr>
          </thead>
          <tbody>
            {
              billingData.length && billingData?.map(billingRow => <>
                <tr>
                  <th>{billingRow._id}</th>
                  <td>{billingRow.name}</td>
                  <td>{billingRow.email}</td>
                  <td>{billingRow.mobile}</td>
                  <td>{billingRow.amount}</td>
                  <td><button className='btn btn-sm btn-success'>Update</button></td>
                  <td><button className='btn btn-sm btn-error' onClick={() => handleDelete(billingRow._id)}>Delete</button></td>
                 
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