import CustomerBill from "@/components/CustomerBill";

export default function Page({
  params,
}: {
  params: {
    restaurantId: string;
    billId: string;
  };
}) {
  return (
    <CustomerBill restaurantId={params.restaurantId} billId={params.billId} />
  );
}
