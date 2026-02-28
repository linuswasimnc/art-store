export async function POST(req: Request) {
  try {
    const { id, price } = await req.json();

    const orderId = `order_${id}_${Date.now()}`;

    const response = await fetch(
      "https://sandbox.cashfree.com/pg/orders",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-version": "2023-08-01",
          "x-client-id": process.env.CASHFREE_APP_ID!,
          "x-client-secret": process.env.CASHFREE_SECRET_KEY!,
        },
        body: JSON.stringify({
          order_id: orderId,
          order_amount: price,
          order_currency: "INR",
          customer_details: {
            customer_id: "guest_" + Date.now(),
            customer_phone: "9999999999",
          },
          order_meta: {
            return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-success?order_id=${orderId}`,
          },
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error(data);
      return new Response("Cashfree error", { status: 500 });
    }

    return Response.json(data);
  } catch (err) {
    console.error(err);
    return new Response("Server error", { status: 500 });
  }
}