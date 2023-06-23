
var bip39 = require("bip39");
var hdkey = require("hdkey");
var createHash = require("create-hash");
var bs58check = require("bs58check");
// const { networks } = require("bitcoinjs-lib");

//for mainnet 00 /testnet 6f version byte;
var versionByte = '6f';

//Enter your mnemonic
const mnemonic = "crazy horse battery bakery stapled fresh dolittle height"; //generates string
const seed = bip39.mnemonicToSeed(mnemonic); //creates seed buffer
// console.log('seed', seed);

seed.then(seedValue => {
    console.log('seedvalue', seedValue.toString('hex'));
    const root = hdkey.fromMasterSeed(seedValue);
    console.log('root',root);
    const masterPrivateKey = root.privateKey.toString('hex'); 
    console.log('master private key',masterPrivateKey.toString('hex'));
    //derive the address of length 0
    const addrnode = root.derive("m/44'/0'/0'/0/10");

    //generate a bitcoin address from the public key
    const step1 = addrnode._publicKey;
    console.log('public address derived', addrnode._publicKey.toString('hex'));
    console.log('private address derived', addrnode._privateKey.toString('hex'));
    // console.log(step1.toString('hex'));
    const step2 = createHash('sha256').update(step1).digest();
    const step3 =
    createHash('rmd160').update(step2).digest();

    const step4 = versionByte + step3.toString('hex');

    console.log('step4encoding', bs58check.encode(Buffer.from(step4,'hex')));
    var step9 = bs58check.encode(Buffer.from(step4,'hex'));

    
});

