//token contract abi json
import TokenContractAbi from "./TokenContractAbi.json";

//token presale contract abi json
import PresaleContractAbi from "./PresaleContractAbi.json";

//token contract address
const tokenContractAddress = "0xC0413e59e251AF96ce1c0e46A3820Ce57e03291C";

//token presale contract address
const presaleContractAddress = "0xfE0A103db1964B5207A4311e8CEa6955fE630395";

//payment with (eg. ETH, BNB, MATIC etc.)
export const payWith = "BNB";

//token contract configuration
export const tokenContractConfig = {
  address: tokenContractAddress,
  abi: TokenContractAbi,
};

//token name read
export const tokenNameCall = {
  ...tokenContractConfig,
  functionName: "name",
  watch: true,
};



//token symbol read
export const tokenSymbolCall = {
  ...tokenContractConfig,
  functionName: "symbol",
  watch: true,
};

//token Presale contract configuration
export const presaleContractConfig = {
  address: presaleContractAddress,
  abi: PresaleContractAbi,
};

//get ActivePhase read
export const getActivePhase = {
  ...presaleContractConfig,
  functionName: "getActivePhase",
  watch: true,

}

// get active phase details read
export const getActivePhaseDetails = {
  ...presaleContractConfig,
  functionName: "presalePhases",
  watch: true
}

//presale token amount read
export const presaleTokenAmountCall = {
  ...presaleContractConfig,
  functionName: "presaleTokenAmount",
  watch: true,
};

//token total sold read
export const totalSoldCall = {
  ...presaleContractConfig,
  functionName: "totalSold",
  watch: true,
};

//maximum stage read
export const maxStageCall = {
  ...presaleContractConfig,
  functionName: "maxStage",
  watch: true,
};

//current stage id read
export const currentStageIdCall = {
  ...presaleContractConfig,
  functionName: "getActivePhase",
  watch: true,
};

//stage info read
export const currentStageInfoCall = {
  ...presaleContractConfig,
  functionName: "stages",
  watch: true,
};

//soft cap read
export const softCapCall = {
  ...presaleContractConfig,
  functionName: "minbuyToken",
  watch: true,
};
//BNB to token read
export const bnbToToken = {
  ...presaleContractConfig,
  functionName: "bnbToToken",
  watch: true,
};

//hard cap read
export const hardCapCall = {
  ...presaleContractConfig,
  functionName: "maxbuyToken",
  watch: true,
};

//total fund read
export const totalFundCall = {
  ...presaleContractConfig,
  functionName: "totalFund",
  watch: true,
};

//buy token write
export const buyTokenCall = {
  ...presaleContractConfig,
  functionName: "buyTokens",
  watch: true,
};

//buy token write
export const buyTokenReference = {
  ...presaleContractConfig,
  functionName: "buyTokensWithReferral",
  watch: true,
};

//ETH to USD exchange rate
export const GetUSDExchangeRate = async () => {
  var requestOptions = { method: "GET", redirect: "follow" };
  return fetch(
    "https://api.coinbase.com/v2/exchange-rates?currency=BNB",
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      return result.data.rates.USD;
    })
    .catch((error) => {
      return "error", error;
    });
};
