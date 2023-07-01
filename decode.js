//使用ethers.js的interface解码调用erc20的transfer函数的交易；
//我们从交易哈希获取的交易数据是被编码过的，要想获取能被人类直接阅读的数据，需要解码；
const {privateKey,providerID,providerIDWSS}=require('./constants');
const { ethers } = require('hardhat');
const myprovider=new ethers.providers.WebSocketProvider(providerIDWSS)
let network=myprovider.getNetwork()
const iface = new ethers.utils.Interface([
    "function transfer(address, uint) public returns (bool)",
    ])
//以下这个函数用于限制请求的频率，否则会很快的达到rpc节点请求上限；
function throttle(fn,delay) {
    let timer;
    return function() {
        if (!timer)
        {
            fn.apply(this,arguments);
            setTimeout(() => {
                clearTimeout(timer)
                timer=null
            }, delay);
        }
    }
}
const main=async ()=> {
    console.log(`starting...`)
myprovider.on('pending',throttle(async function(txhash) {
   if (txhash)
   {
    let tx=await myprovider.getTransaction(txhash)
    if (tx)
    {
        if (tx.data.indexOf(iface.getFunction('transfer').selector)!==-1)
        {
           console.log(`[${(new data).toLocaleTimeString()}]: ${txhash}`)
           let parsedtx=iface.parseTransaction(tx)
           console.log(`未解码交易详情：`)
           console.log(tx)
           console.log("pending交易详情解码：")
                console.log(parsedtx);
                // Input data解码
                console.log("Input Data解码：")
                console.log(parsedtx.args);
        }   
    }
   } 
},100))
}
main()
