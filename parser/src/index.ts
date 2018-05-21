import { parse } from './parser';

console.time('parse');

parse()
    .then(() => {
        console.timeEnd('parse');
    })
    .catch(e => {
        console.error('Error occured:');
        console.log(e);
        throw e;
    });
