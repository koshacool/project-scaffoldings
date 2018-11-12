export const makeRequest = async url => {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    throw err;
  }
};


export const chain = async urls => {
  const data = [];

  for (const url of urls) {
    const queryRes = await makeRequest(url);
    data.push(queryRes);
  }

  return data;
};
