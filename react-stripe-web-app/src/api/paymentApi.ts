import { fireAuth } from "../firebase";

export const PAYMENT_API =
  import.meta["env"].SNOWPACK_PUBLIC_PAYMENT_API! || "http://localhost:8000";

export const fetchPaymentApi = async (endpointURL: string, opts: any) => {
  const user = fireAuth.currentUser!;

  const { method = "", body = {} } = {
    method: "POST",
    body: null,
    ...opts,
  };

  const token = user && (await user.getIdToken());

  const res = await fetch(`${PAYMENT_API}/${endpointURL}`, {
    method,
    ...(body && { body: JSON.stringify(body) }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
};
