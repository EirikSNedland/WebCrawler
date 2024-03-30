const { argv } = require('node:process');
const readline = require('node:readline');
const { crawlPage } = require('./crawl.js');
const { printReport } = require('./report.js');

async function main(){
    let pages = [];
    if(argv.length < 3){
        console.log('require at least one argument');
    } else if(argv.length > 3){
        console.log('only accepts 1 argument, no more');
    } else {
        console.log(`crawler starting...`)
        pages = await crawlPage(argv[2],argv[2],pages);
    }
    printReport(pages)
  }

  main()