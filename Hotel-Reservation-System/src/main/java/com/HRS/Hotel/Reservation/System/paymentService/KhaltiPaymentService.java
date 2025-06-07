package com.HRS.Hotel.Reservation.System.paymentService;

import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;

@Service
public class KhaltiPaymentService {

    private static final String KHALTI_INITIATE_URL = "https://dev.khalti.com/api/v2/epayment/initiate/";
    private static final String KHALTI_LOOKUP_URL = "https://a.khalti.com/api/v2/epayment/lookup/"; // Corrected lookup URL
    private static final String SECRET_KEY = "191e809935014f76869721a2989cbc16";

    public String initiateKhaltiPayment(Double amount, String orderId, String orderName, String name, String email) throws Exception {
        int amountInPaisa = (int) (amount * 100);
        String jsonBody = String.format("""
                {
                    "return_url": "http://localhost:5173/verify-payment",
                    "website_url": "http://localhost:5173",
                    "amount": %d,
                    "purchase_order_id": "%s",
                    "purchase_order_name": "%s",
                    "customer_info": {
                        "name": "%s",
                        "email": "%s"
                    }
                }
                """, amountInPaisa, orderId, orderName, name, email);

        HttpClient client = HttpClient.newBuilder()
                .version(HttpClient.Version.HTTP_1_1)
                .connectTimeout(Duration.ofSeconds(10))
                .build();

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(KHALTI_INITIATE_URL))
                .timeout(Duration.ofSeconds(10))
                .header("Content-Type", "application/json")
                .header("Authorization", "Key " + SECRET_KEY)
                .POST(HttpRequest.BodyPublishers.ofString(jsonBody))
                .build();

        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        return response.body();
    }

    public String initiateSubKhaltiPayment(Double amount, String orderId, String orderName, String name, String email) throws Exception {
        int amountInPaisa = (int) (amount * 100);
        String jsonBody = String.format("""
                {
                    "return_url": "http://discover.localhost:5173/verify-sub-payment",
                    "website_url": "http://discover.localhost:5173",
                    "amount": %d,
                    "purchase_order_id": "%s",
                    "purchase_order_name": "%s",
                    "customer_info": {
                        "name": "%s",
                        "email": "%s"
                    }
                }
                """, amountInPaisa, orderId, orderName, name, email);

        HttpClient client = HttpClient.newBuilder()
                .version(HttpClient.Version.HTTP_1_1)
                .connectTimeout(Duration.ofSeconds(10))
                .build();

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(KHALTI_INITIATE_URL))
                .timeout(Duration.ofSeconds(10))
                .header("Content-Type", "application/json")
                .header("Authorization", "Key " + SECRET_KEY)
                .POST(HttpRequest.BodyPublishers.ofString(jsonBody))
                .build();

        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        return response.body();
    }

    public String verifyKhaltiPayment(String pidx) throws IOException, InterruptedException {
        String jsonBody = String.format("""
            {
                "pidx": "%s"
            }
            """, pidx);

        HttpClient client = HttpClient.newBuilder()
                .version(HttpClient.Version.HTTP_1_1)
                .connectTimeout(Duration.ofSeconds(10))
                .build();

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(KHALTI_LOOKUP_URL))
                .timeout(Duration.ofSeconds(10))
                .header("Content-Type", "application/json")
                .header("Authorization", "Key " + SECRET_KEY)
                .POST(HttpRequest.BodyPublishers.ofString(jsonBody))
                .build();

        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        return response.body();
    }
}
