import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

const VerifySubPayment = () => {
    const [searchParams] = useSearchParams();
    const [message, setMessage] = useState('Verifying...');
    const pidx = searchParams.get('pidx');

    useEffect(() => {
        if (pidx) {
            axios.post('http://localhost:8080/api/v1/auth/verify-registration-khalti', {
                pidx: pidx
            })
                .then(response => {
                    setMessage('Payment verified. Redirecting...');
                    setTimeout(() => {
                        window.location.href = 'http://discoverr.localhost:5173';
                    }, 2000);
                })
                .catch(error => {
                    console.error(error);
                    setMessage('Verification failed. Please contact support.');
                });
        } else {
            setMessage('No pidx found in URL');
        }
    }, [pidx]);

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold">Subscription Verification</h1>
            <p>{message}</p>
        </div>
    );
};

export default VerifySubPayment;
