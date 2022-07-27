setTimeout(()=>{console.log(2)})
process.nextTick(()=>{console.log(1)})
