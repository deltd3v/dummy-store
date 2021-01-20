export const PAYMENT_API = process.env.PAYMENT_API || "http://localhost:8000";

export const fetchPaymentApi = async (endpointURL: string, opts: any) => {
  const { method = "", body = {} } = {
    method: "POST",
    body: null,
    ...opts,
  };

  const res = await fetch(`${PAYMENT_API}/${endpointURL}`, {
    method,
    ...(body && { body: JSON.stringify(body) }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.json();
};
