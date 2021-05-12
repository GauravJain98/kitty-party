const { expect } = require("chai");

describe("KittyParty", function() {
    let TA;

    let owner;
    let u1;
    let u2;
    let others;
    let party;
    let ERC20abi = [
        "function balanceOf(address) view returns (uint)",
        "function approve(address spender, uint256 amount) external returns (bool)",
    ];

    before("should deploy the token", async function() {
        [owner, u1, u2, ...others] = await ethers.getSigners();
        const contract = "GLDToken";
        const Token = await hre.ethers.getContractFactory(contract);
        const token = await Token.deploy();

        await token.deployed();
        TA = token
        const airdrop = "Airdrop"
        const Air = await hre.ethers.getContractFactory(airdrop);
        const p = await Air.deploy(token.address);
        await p.deployed();
        party = p;
        await token.tranfer(u1.address);
        await token.tranfer(u2.address);
        expect(await p.balance(token.address, u1.address)).to.equal(hre.ethers.utils.parseEther("200"));
        expect(await p.balance(token.address, u2.address)).to.equal(hre.ethers.utils.parseEther("200"));

        // token.approve(token.address, hre.ethers.utils.parseEther("200"))
        // expect(await token.allowance(u2.address, token.address)).to.equal(hre.ethers.utils.parseEther("200"));
    })
    it("lets party", async function() {
        await TA.connect(u1).approve(party.address, hre.ethers.utils.parseEther("200"));
        expect(await TA.allowance(u1.address, party.address)).to.equal(hre.ethers.utils.parseEther("200"));
        await TA.connect(u2).approve(party.address, hre.ethers.utils.parseEther("200"));
        expect(await TA.allowance(u2.address, party.address)).to.equal(hre.ethers.utils.parseEther("200"));
        party.gamble(u1.address, hre.ethers.utils.parseEther("100"))
        expect(await party.balance(TA.address, party.address)).to.equal(hre.ethers.utils.parseEther("100"));
        party.gamble(u2.address, hre.ethers.utils.parseEther("100"))
        expect(await party.balance(TA.address, party.address)).to.equal(hre.ethers.utils.parseEther("200"));
        party.gamble(u1.address, hre.ethers.utils.parseEther("100"))
        expect(await party.balance(TA.address, u1.address)).to.equal(hre.ethers.utils.parseEther("300"));
    });
});