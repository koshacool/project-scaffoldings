import { makeRequest, chain } from './utils';


const urls = [
  'http://jsonplaceholder.typicode.com/posts/1', 
  'http://jsonplaceholder.typicode.com/posts/2',
];
const badUrl = 'wrong';
const mockResult = 'result';
const mockFetch = data => jest.fn().mockImplementation(url => {
  if (!url || url === badUrl) {
    return Promise.reject('error');
  }

  return Promise.resolve({
    ok: true,
    json: async () => data
  });
});

window.fetch = mockFetch(mockResult);

describe('chain function::', () => {
  it('should return correct result', async () => {
    const res1 = await chain([urls[0]]);
    expect(res1).toEqual([mockResult]);
    expect(window.fetch).toHaveBeenCalledTimes(1);

    const res2 = await chain(urls);
    expect(res2).toEqual([mockResult, mockResult]);
    expect(window.fetch).toHaveBeenCalledTimes(3);
  });

  it('Should throw error when bad url', async () => {
    expect(chain([badUrl])).rejects.toEqual('error'); 		
  });

  it('Should throw error when exist bad url', async () => {
    expect(chain([...urls, badUrl])).rejects.toEqual('error'); 		
  });
});

describe('makeRequest function::', () => {
  it('should return correct result', async () => {
    const res = await makeRequest(urls[0]);

    expect(res).toEqual(mockResult);
  });

  it('Should throw error when bad url', async () => {
    expect(makeRequest(badUrl)).rejects.toEqual('error'); 		
  });
});
