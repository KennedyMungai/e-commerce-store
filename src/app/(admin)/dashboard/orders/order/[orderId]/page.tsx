type Props = {
  params: {
    orderId: string;
  };
};

const OrderPage = async ({ params }: Props) => {
  const { orderId } = await params;

  return <div>{orderId}</div>;
};

export default OrderPage;
