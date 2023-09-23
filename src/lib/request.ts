

export const fetcher = async (key: string) => {

  const BASE_URL = process.env.HEADSCALE_SERVER;
  const url = `${BASE_URL}${key}`;


  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.HEADSCALE_APIKEY}`,
    },
  });
  return await res.json();
};
