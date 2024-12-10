type Props = {
  params: {
    userId: string;
  };
};

const UserOrders = async ({ params }: Props) => {
  const { userId } = await params;

  return <div>{userId}</div>;
};

export default UserOrders;
