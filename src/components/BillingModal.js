import React from 'react';

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
        console.log(bill)
        form.reset()
    }
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
                    {/* <label htmlFor="billingModal" className="btn btn-sm absolute right-2 bottom-2">submit</label> */}
                    </form>
                </div>
            </div>
        </>
    );
};

export default BillingModal;