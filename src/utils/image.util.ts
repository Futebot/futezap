const gis = require('g-i-s');
import util from "util";

// @ts-ignore
export async function getImageURLFromText(text: string, index: number = 0): string {
    const asyncFunction = util.promisify(gis);
    const result: any = await asyncFunction(text);

    return result[index].url;
}


// @ts-ignore
export async function getGifURLFromText(text: string, index: number = 0): string {
    const asyncFunction = util.promisify(gis);
    const opts = {
        searchTerm: text,
        queryStringAddition: '&tbs=itp:animated'
    };
    const result: any = await asyncFunction(opts);

    return result[index].url;
}
