
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useQueryClient } from 'react-query';
import { toast } from 'react-toastify';


const BillingModal = () => {
    const handleBillingModal = event => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const mobile = form.mobile.value;
        const amount = form.amount.value;

        const bill = {
            name, email, mobile, amount 
        }
       
        fetch('https://programming-job-task-server.vercel.app/add-billing',{
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(bill)
        })
        .then(res => res.json())
        .then(data => {
            if(data.acknowledged === true){
                toast('Bill added successfully')
                refetch()
            }
        
        })
        form.reset()
        
    }
    
    const url = `https://programming-job-task-server.vercel.app/billing-list`

    const { data: billingData = [], isLoading, refetch } = useQuery({
        queryKey: ['bill'],
        queryFn: async () => {
            const res = await fetch(url, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('newAccessToken')}`
                }
            });
            const data = await res.json()
            console.log(data)
            return data;
        }
    })
    return (
        <>
            <input type="checkbox" id="billingModal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    
                    <form onSubmit={handleBillingModal}>
                    <input type="text" name='name' placeholder="Full Name" className="input input-bordered w-full max-w-xs m-2" />
                    <input type="text"  name='email' placeholder="Your Email" className="input input-bordered w-full max-w-xs m-2" />
                    <input type="text" name='mobile' placeholder="Mobile No" className="input input-bordered w-full max-w-xs m-2" />
                    <input type="text" name='amount' placeholder="Payable amount" className="input input-bordered w-full max-w-xs m-2" /> <br />
                    <button type='submit'><label htmlFor="billingModal" className="btn btn-sm absolute right-2 bottom-2">submit</label></button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default BillingModal;