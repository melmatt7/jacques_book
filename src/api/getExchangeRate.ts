import axios from "axios";

/**
 * https://documenter.getpostman.com/view/10542928/T1LHFUV5
 * https://www.codegrepper.com/code-examples/javascript/dynamic+access+property+value+by+name+javascript+typescript+error
 */
type CoinGeckoReturnType = { data: { [tokenName: string]: { [value: string]: number } }, status: number }
const coinGeckoApi = axios.create();

/**
 * https://itnext.io/typescript-with-promises-and-async-await-63623b8e5e2a?gi=4999aca2086e
 */
export const getExchangeRate = async (from: string, to: string): Promise<Error | number> => {
    const result: CoinGeckoReturnType = await coinGeckoApi.get(`https://api.coingecko.com/api/v3/simple/price?ids=${from}&vs_currencies=${to}`);
    // https://stackoverflow.com/questions/4994201/is-object-empty
    if (result.status === 200 && Object.keys(result.data).length !== 0)
        return result.data[from][to];
    else
        return new Error(`"${from}" is not a valid token.`);
}