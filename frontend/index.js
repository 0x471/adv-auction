let provider = new ethers.providers.Web3Provider(window.ethereum)
let signer

const ADDR = "0x07339fd7139498F8271650C7EaB08f8250977912"
const ABI = [{"inputs":[{"internalType":"string","name":"_imageLink","type":"string"},{"internalType":"string","name":"_text","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"string","name":"_imageLink","type":"string"},{"internalType":"string","name":"_text","type":"string"}],"name":"advertise","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"advertisement","outputs":[{"internalType":"string","name":"ImageLink","type":"string"},{"internalType":"string","name":"Text","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"latestPayment","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]
const contract = new ethers.Contract(ADDR, ABI, provider)

async function viewAd() {
    await contract.advertisement().then(data => {
        $("#text").text(data.Text)
        $('<img src="'+ data.ImageLink +'">').on('load', function(){
            $(this).width(900).height(600).appendTo('#image')
        }) 
    })
    await contract.latestPayment().then(data => {
        $("#ether").text("Latest payment: "+ethers.utils.formatEther(data).toString())
    })
   
    
}

async function advertise(that) {
    try {
        const transaction = await contract.connect(signer).advertise(that.imageLink.value, that.text.value, {value: ethers.utils.parseEther(that.ether.value)})
        console.log(await transaction.wait())
    } catch (e) {
        alert(e.data.message)
    }
    
}


function networkIsMumbaiTestnet() {

	if(window.ethereum.networkVersion != "80001") {
		return false;
	}
	return true;

}

window.addEventListener('load', async () => {

	accounts = await provider.send("eth_requestAccounts", []);
	if(accounts.length == 0) {
		console.log("No account found.")
		alert("No account found, make sure that client is configured properly.")
	}

	if(networkIsMumbaiTestnet() != true) {
		alert("Please connect to Mumbai Testnet.")
		return
	}

	console.log("Connected to Mumbai Testnet.")
	
	signer = await provider.getSigner();
	addr = await signer.getAddress()
	console.log("Account: "+addr)
    viewAd()

});

