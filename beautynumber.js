//生成一个靓号
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
