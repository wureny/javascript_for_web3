//利用ethersjs自带的createrandom函数以及正则表达式，生成一个靓号；
//这种方式主打一个安全；
//缺点是耗时较长，以下生成一个0x0604开头的地址，耗时2-3min；
const hre=require('hardhat');
const ethers=hre.ethers;
var wallet;
var isvalid=false;
const te=/^0x0604.*$/;
console.log(`开始生成：\n`);
while(!isvalid)
{
    wallet=new ethers.Wallet.createRandom();
    isvalid=te.test(wallet.address);
}
console.log(`钱包地址：${wallet.address}`);
console.log(`钱包私钥：${wallet.privateKey}`);
