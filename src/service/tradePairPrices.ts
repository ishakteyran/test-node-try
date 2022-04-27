import { btcToFiat } from "../data/btcToFiat";
import { ethToFiat } from "../data/ethToFiat";
import { xrpToFiat } from "../data/xrpToFiat";
import { trxToFiat } from "../data/trxToFiat";
import { adaToFiat } from "../data/adaToFiat";
import { tradePairRequest, tradePairResponse } from "./interfaces";

const random = (min, max) => Math.random() * (max - min) + min;

export const fetchTickerPrices = async () => {
    const data = await tradePairPrices();
    return data;

}

const tradePairPrices = async () => {
    const exchangePrices: tradePairRequest[] = formTradePairRequest();
    const response: tradePairResponse[] = [];

    exchangePrices.forEach(element => {
        response.push(generateTickerPrices(element));
    });
    return response;
}


function formTradePairRequest(): tradePairRequest[] {
    return [...btcToFiat, ...ethToFiat, ...xrpToFiat, ...trxToFiat, ...adaToFiat];
}

function generateTickerPrices(pair: tradePairRequest): tradePairResponse {
    return {
        name: pair.name, transactionDate: new Date(new Date().toUTCString()),
        base: pair.base, target: pair.target, price: random(pair.priceStart, pair.priceEnd).toFixed(pair.targetDecimalPlaces),
        baseDecimalPlaces: pair.baseDecimalPlaces, targetDecimalPlaces: pair.targetDecimalPlaces, baseUrl: pair.baseUrl, targetUrl: pair.targetUrl
    } as tradePairResponse;
}



