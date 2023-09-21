import BannerWrapper from "./Banner.style";

import DocumentIcon from "../../../assets/images/icons/document-text.svg";
import PresaleLiveTextIcon from "../../../assets/images/icons/presale-live-text.svg";
import Abstrac1 from "../../../assets/images/banner/abstrac-1.png";
import Abstrac2 from "../../../assets/images/banner/abstrac-2.png";

import { FiArrowDownRight } from "react-icons/fi";
import { HiArrowLeft } from "react-icons/hi2";
// import Whitepaper from "../../../assets/pdf/whitepaper.pdf";

import Button from "../../../components/button/Button";
import SmoothSlider from "../../../components/smooth-slider/SmoothSlider";
import Progressbar from "../../../components/progressbar/Progressbar";
import Countdown from "../../../components/countdown/Countdown";
import Dropdown from "../../../components/dropdown/Dropdown";
import { useState, useEffect } from "react";


import Data from "../../../assets/data/bannarV1";
import TokenSaleInfo from "../tokenInfo";
import TokenInfo from "../../../components/tokenInfo/TokenInfo";
import {
  useAccount,
  useBalance,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
import {
  GetUSDExchangeRate,
  buyTokenCall,
  currentStageIdCall,
  currentStageInfoCall,
  buyTokenReference,
  hardCapCall,
  payWith,
  getActivePhase,
  presaleContractConfig,
  bnbToToken,
  getActivePhaseDetails,
  presaleTokenAmountCall,
  softCapCall,
  tokenSymbolCall,
  totalFundCall,
  totalSoldCall,
} from "../../../contracts/config";
import PresaleContractAbi from '../../../contracts/PresaleContractAbi.json'
import { formatEther, parseEther } from "viem";

const Banner = () => {
  const { address: walletAddress, isConnected: isWalletConnected } = useAccount();

  const [isCopied, setIsCopied] = useState(false);
  const [tokenAmountRex,setTokenAmountRex] = useState(0)

  // Function to copy wallet address to clipboard
  const copyWalletAddress = () => {
    if (isWalletConnected) {
      navigator.clipboard.writeText(window.location.href + "?href=" + walletAddress);
      setIsCopied(true);
    }
  };

  useEffect(() => {
    // Reset the copied state after a certain time (e.g., 3 seconds)
    if (isCopied) {
      const timeout = setTimeout(() => {
        setIsCopied(false);
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [isCopied]);
  const [userBalance, setUserBalance] = useState("28.25 BNB");
  const [isBuyNow, setIsBuyNow] = useState(false);
  const queryParams = new URLSearchParams(location.search);
  const refParam = queryParams.get('href');
  console.log("refeeerence",refParam)

  const buyNowHandle = () => {
    setIsBuyNow(!isBuyNow);
  };

  const [usdExRate, setUsdExRate] = useState(0);
  const [paymentUsd, setPaymentUsd] = useState(0);
  const [currentStage, setCurrentStage] = useState(1);
  const [currentBonus, setCurrentBonus] = useState("20");
  const [currentPrice, setCurrentPrice] = useState("0.0090");
  const [stageEnd, setStageEnd] = useState();
  const [presaleToken, setPresaleToken] = useState(70000000);
  const [tokenSymbol, setTokenSymbol] = useState("REXX");
  const [softCap, setSoftCap] = useState("400");
  const [hardCap, setHardCap] = useState("1000");
  const [totalFund, setTotalFund] = useState("20");
  const [paymentPrice, setPaymentPrice] = useState(0);
  const [paymentAmount, setPaymentAmount] = useState();
  const [buyAmount, setBuyAmount] = useState(0);
  const [bonusAmount, setBonusAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [tokenSold, setTokenSold] = useState(0);
  const [tokenPercent, setTokenPercent] = useState(20);

  const { address: addressData, isConnected } = useAccount();
  const { data: balanceData } = useBalance({
    address: addressData,
  });
  const { data: tokenSymbolData } = useContractRead({
    ...tokenSymbolCall,
  });
  const { data: presaleTokenAmountData } = useContractRead({
    ...presaleTokenAmountCall,
  });
  const { data: totalSoldData } = useContractRead({ ...totalSoldCall });
  const { data: currentStageIdData } = useContractRead({
    ...currentStageIdCall,
  });
  const { data: currentStageInfoData } = useContractRead({
    ...currentStageInfoCall,
    args: [currentStageIdData],
  });

  const { data: softCapData } = useContractRead({ ...softCapCall });
  const { data: hardCapData } = useContractRead({ ...hardCapCall });
  const { data: totalFundData } = useContractRead({ ...totalFundCall });
  const { data: activeStage } = useContractRead({ ...getActivePhase })
  const { data: getActivePhaseData } = useContractRead({
    ...getActivePhaseDetails,
    args: [activeStage]
  })
  const { isFetching, refetch: getTokenAmount } = useContractRead({
    ...bnbToToken,
    args: [parseEther(paymentPrice.toString()),activeStage],
    onSuccess(data) {
      console.log("heackkkker",data)
      setTokenAmountRex(data)
   },
   onError(err) {
    console.log("hackkkkkkerrrr",err)
      
   },
  })
  console.log("dfghfg",tokenAmountRex)

  
  // const { isFetching, refetch: readContract } = useContractRead({
  //   address: "0xfE0A103db1964B5207A4311e8CEa6955fE630395",
  //   abi: PresaleContractAbi,
  //   functionName: "bnbToToken",
  //   value: parseEther(paymentPrice.toString()),
  //   args: [activeStage],
  //   onSuccess(data) {
  //    console.log("heackkkker",data)
  // },
  // onError() {
     
  // },
  // })
  // console.log("active phase", activeStage)
  // console.log("active ", parseInt(getActivePhaseData[3].toString()))
  // console.log("Max",formatEther(hardCapData))
  // console.log("Min",formatEther(softCap));


  const { config } = usePrepareContractWrite({
    ...buyTokenCall,
    value: parseEther(paymentPrice.toString()),
    args: [activeStage],
  });

  const { write } = useContractWrite(config);
  const { config:confi2 } = usePrepareContractWrite({
    ...buyTokenReference,
    value: parseEther(paymentPrice.toString()),
    args: [activeStage,refParam],
  });
  const { write:call } = useContractWrite(confi2);

  useEffect(() => {
    if (isBuyNow) {
      document.querySelector(".gittu-banner-card").classList.add("flip");
    }

    if (!isBuyNow) {
      document
        .querySelector(".gittu-banner-card")
        .classList.remove("flip");
    }

    if (isConnected) {
      if (balanceData) {
        let tmp = parseFloat(balanceData?.formatted).toFixed(2);
        setUserBalance(`${tmp} ${balanceData?.symbol}`);
      }

      if (tokenSymbolData) {
        setTokenSymbol(tokenSymbolData);
      }

      if (getActivePhaseData) {
        let tmp = formatEther(getActivePhaseData[0]);
        setPresaleToken(tmp);
      }

      if (totalSoldData) {
        let tmp = formatEther(totalSoldData);
        setTokenSold(tmp.toString());
      }

      if (currentStageIdData) {
        setCurrentStage(currentStageIdData.toString());
      }

      if (currentStageInfoData) {
        setCurrentBonus(currentStageInfoData[1]?.toString());
        let tmp = formatEther(currentStageInfoData[2]);
        setCurrentPrice(tmp);
        setStageEnd(currentStageInfoData[4].toString());
      }

      if (softCapData) {
        console.log(softCapData)
        let tmp = formatEther(softCapData);
        setSoftCap(tmp.toString());
      }

      if (hardCapData) {
        let tmp = formatEther(hardCapData);
        setHardCap(tmp.toString());
      }

      if (totalFundData) {
        let tmp = formatEther(totalFundData);
        setTotalFund(tmp.toString());
      }
      if(getActivePhaseData){
      let supply = parseInt(getActivePhaseData[3])
      let max = parseInt(getActivePhaseData[3])

      let _tokenPercent = parseInt(supply* 100 / max);
      setTokenPercent(_tokenPercent);
      console.log("rawwwwwwwwwwwwwwwwwrrrrrr",_tokenPercent)
      if (_tokenPercent > 100) {
        setTokenPercent(100);
      }
    }
      

      GetUSDExchangeRate().then((res) => {
        setUsdExRate(parseFloat(res));
      });
     

      let pay = parseFloat(usdExRate * paymentPrice).toFixed(2);
      setPaymentUsd(pay);

      getTokenAmount()
      setStageEnd(parseInt(getActivePhaseData[3].toString())) 

    }
  }, [
    
    isConnected,
    getActivePhaseData,
    
    paymentPrice,
  ]);

  const handlePaymentInput = (e) => {
    let _inputValue = e.target.value;
    setPaymentAmount(_inputValue);

    if (_inputValue >= currentPrice) {
      let _amount = parseInt(_inputValue / currentPrice);
      setBuyAmount(_amount);

      let _bonusAmount = parseInt((_amount * currentBonus) / 100);
      setBonusAmount(_bonusAmount);

      let _totalAmount = _amount + _bonusAmount;
      setTotalAmount(_totalAmount);

      if (_inputValue != "" && _inputValue >= 0) {
        setPaymentPrice(_inputValue);
      }
    }
  };

  const buyToken = () => {
    if (paymentAmount != "" && paymentAmount >= currentPrice) {
      console.log("payment amount", paymentAmount)
      console.log("payment proce", parseEther(paymentPrice.toString()))
       if(refParam){
        console.log("referece")
        call();
       }else{
        console.log("simplke")
        write();
       }
      
    }
  };

  return (
    <BannerWrapper>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <div className="gittu-banner-left">
              <h1 className="banner-title">{Data.title}</h1>
              <h2 className="text-white">{Data.titleExtra}</h2>
              <h5 className="mt-15">{Data.subtitle}</h5>

              <div className="mt-40 mb-40">
                <a
                  className="whitepaper-btn"
                  href="https://coinrexx.com/Rexx-Whitepaper.pdf"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={DocumentIcon} alt="icon" />
                  Whitepaper
                </a>
              </div>

              <ul className="gittu-banner-list">
                <li>Total Supply: {presaleToken}</li>
                <li>
                  Minimum Buy: {softCap} {tokenSymbol}
                </li>
                <li>
                  Maximim Buy: {hardCap} {tokenSymbol}
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="gittu-banner-right">
              <div className="overlay">
                <a href="#" className="presale-live-btn">
                  <img src={PresaleLiveTextIcon} alt="Presale live" />
                  <span className="icon">
                    <FiArrowDownRight />
                  </span>
                </a>
              </div>
              <div className="gittu-banner-card">
                <div className="gittu-banner-card-inner">
                  <div className="bg-shape">
                    <div className="bg-shape-img img-1">
                      <img src={Abstrac1} alt="shape" />
                    </div>
                    <div className="bg-shape-img img-2">
                      <img src={Abstrac2} alt="shape" />
                    </div>
                  </div>

                  {isBuyNow ? (
                    <div className="card-content">
                      <button
                        className="presale-back-btn"
                        onClick={buyNowHandle}
                      >
                        <HiArrowLeft />
                      </button>

                      <div className="presale-item mb-20">
                        <div className="presale-item-inner">
                          <h5 className="fw-600 text-uppercase text-white">
                            Balance: {userBalance}
                          </h5>
                        </div>
                        <div className="presale-item-inner">
                          <h5 className="fw-600 text-uppercase text-white">
                            Price: {currentPrice} {"$"}
                          </h5>
                        </div>
                      </div>

                      <div className="presale-item mb-25">
                        <div className="presale-item-inner">
                          <h6>Select Token</h6>
                          <Dropdown />
                        </div>
                        <div className="presale-item-inner">
                          <h6>Amount</h6>
                          <input
                            type="number"
                            min={currentPrice}
                            step={currentPrice}
                            name=""
                            id=""
                            placeholder="0.5"
                            value={paymentAmount}
                            onChange={handlePaymentInput}
                          />
                        </div>
                      </div>

                      <div className="presale-item mb-37">
                        <div className="presale-item-inner">
                          <h6>$ Amount</h6>
                          <input
                            type="text"
                            name=""
                            id=""
                            placeholder="0"
                            value={paymentUsd}
                            disabled
                          />
                        </div>
                        <div className="presale-item-inner">
                          <h6>Get Amount ( {tokenSymbol} )</h6>
                          <input
                            type="text"
                            name=""
                            id=""
                            placeholder="0"
                            value={tokenAmountRex.toString()}
                            disabled
                          />
                        </div>
                      </div>

                      

                      <Button large onClick={buyToken}>
                        Approve
                      </Button>
                    </div>
                  ) : (
                    <div className="card-content">
                      <p className="presale-stage-title text-uppercase">
                        Stage {currentStage}
                      </p>
                      <h5 className="fw-600 text-white text-uppercase">
                        Private-Sale ends in
                      </h5>

                      <div className="mt-1 mb-17">
                        <Countdown endDate={stageEnd} />
                      </div>

                      <div className="mb-15">
                        <Progressbar done={tokenPercent} />
                      </div>

                      <div className="presale-raised fw-500 mb-25">
                        <p className="fs-15 text-white">
                          Raised: {tokenSold}
                        </p>
                        <p className="fs-15 text-white">
                          Goal: {presaleToken}
                        </p>
                      </div>

                      <div className="mb-35">
                        <TokenInfo />
                      </div>

                      <Button large onClick={buyNowHandle}>
                        Buy {tokenSymbol} now
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="wallet-address-container">
        <button
          className={`copy-address-button ${isCopied ? "copied" : ""}`}
          onClick={copyWalletAddress}
        >
          {isCopied ? "Copied!" : "Copy Referal Link:" + window.location.href + "?ref=" + (isWalletConnected ? walletAddress.slice(0, 6) + "...." + walletAddress.slice(-6) : "")}
        </button>
      </div>
      <div>
      <TokenSaleInfo/> 
      </div>
      <div className="gittu-banner-slider">
        <SmoothSlider />
      </div>
    </BannerWrapper>
  );
};

export default Banner;
