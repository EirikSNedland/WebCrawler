function printReport(pages){
    console.log(`----Start report----`)
    for(page in pages){
        console.log(`${page} apeared ${pages[page]} times`)
    }
    console.log(`----End Report----`)
}

module.exports = {
    printReport
};