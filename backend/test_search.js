import { searchBreaches } from './search.js';

async function test() {
    console.log("Testing real leaked email:");
    const res1 = await searchBreaches("test@example.com");
    console.log(JSON.stringify(res1, null, 2));

    console.log("\nTesting non-leaked email:");
    const res2 = await searchBreaches("neverleaked123999@xyz.abc");
    console.log(JSON.stringify(res2, null, 2));
}

test();
