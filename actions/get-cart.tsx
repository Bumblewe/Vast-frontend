const URL=`${process.env.NEXT_PUBLIC_API_URL}/cart`;

const getCart = async (): Promise<any[]> => {

   const res = await fetch(URL, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      },
    })

  return res.json();
};

export default getCart;

