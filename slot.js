//EVM链上的数据不论私有与否，都是可读的；
//从etherscan上读取合约的地址以及想要读取的变量的slot值即可；
const hre=require('hardhat');
const ethers=hre.ethers;

//从constants.js文件中获取相关常量；
const {providerIDMAIN}=require('./constants')
const myprovider=new ethers.providers.JsonRpcProvider(providerIDMAIN)

//以下为DAI合约的toTotalsupply变量的相关信息；
const addressofContract='0x6B175474E89094C44Da98b954EedeAC495271d0F'
const slot='0x0000000000000000000000000000000000000000000000000000000000000001'

const main= async () =>{
    let ans=await myprovider.getStorageAt(addressofContract,slot)
    console.log(ans)
}
main()
