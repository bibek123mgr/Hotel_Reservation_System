import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSearchParams, useNavigate } from 'react-router-dom';

const VerifyPayment = () => {
    const [searchParams] = useSearchParams();
    const [message, setMessage] = useState("Verifying payment...");
    const navigate = useNavigate();

    useEffect(() => {
        const pidx = searchParams.get("pidx");
        const token = localStorage.getItem('access-token');

        const verifyPayment = async () => {
            try {
                const response = await axios.post(
                    'http://localhost:8080/api/v1/reservation/verify-khalti-payment',
                    { pidx },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setMessage("✅ Payment verified successfully. Redirecting to home...");
                setTimeout(() => navigate('/'), 3000);
            } catch (error) {
                console.error("Verification Error:", error);
                setMessage("❌ An error occurred while verifying payment.");
            }
        };

        if (pidx && token) {
            verifyPayment();
        } else {
            setMessage("❌ Missing token or payment identifier.");
        }
    }, [searchParams, navigate]);

    return (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
            <h2>{message}</h2>
        </div>
    );
};

export default VerifyPayment;
