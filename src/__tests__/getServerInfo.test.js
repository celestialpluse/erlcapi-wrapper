// __tests__/getServerInfo.test.js
jest.mock('axios');

const axios = require('axios');
const getServerInfo = require('../function/getServerInfo');
const { ERROR_MESSAGES } = require('../constants');

axios.create = jest.fn(() => {
    return {
        interceptors: {
            response: {
                use: jest.fn()
            }
        },
        get: jest.fn()
    };
});

describe('getServerInfo', () => {
    it('should throw an error if serverKey is missing', async () => {
        await expect(getServerInfo()).rejects.toThrow(ERROR_MESSAGES.MISSING_SERVER_KEY);
    });

    it('should return server info on successful API call', async () => {
        const mockResponse = { data: { info: 'Server Info' } };
        const mockAxiosInstance = axios.create();
        mockAxiosInstance.get.mockResolvedValue(mockResponse);

        const serverKey = 'LKvBOzlOBN-gtEJnTvXXUZYUCuaBsfEkQnoaVvlcVCASFrEMgWz';

        const result = await getServerInfo(serverKey);

        expect(result).toEqual(mockResponse.data);
        expect(mockAxiosInstance.get).toHaveBeenCalledWith('/server', {
            headers: {
                'Server-Key': serverKey,
                'Authorization': undefined // Replace with actual globalKey if needed
            },
            params: { filter: 'active,popular' }
        });
    });

    it('should handle API call failure', async () => {
        const errorMessage = 'Request failed';
        const mockAxiosInstance = axios.create();
        mockAxiosInstance.get.mockRejectedValue(new Error(errorMessage));

        const serverKey = 'LKvBOzlOBN-gtEJnTvXXUZYUCuaBsfEkQnoaVvlcVCASFrEMgWz';

        await expect(getServerInfo(serverKey)).rejects.toThrow(`Failed to retrieve server info: ${errorMessage}`);
    });
});
