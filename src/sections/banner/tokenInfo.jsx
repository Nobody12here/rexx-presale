import React from 'react';
import './tokenInfoStyle.css';

function SalePhase({ title, totalTokens, price, startDate, endDate }) {
  return (
    <li >
      <div className='phase'>
      <div style={{ borderBottom: "2px solid #3c1963", paddingBottom: "8px" }}>
  <strong>{title}</strong>: {totalTokens} tokens
</div>
      <ul>
        
        <li><strong>Price per Token</strong>: ${price}</li>
        <li><strong>Start Date</strong>: {startDate}</li>
        <li><strong>End Date</strong>: {endDate}</li>
       
      </ul> 
      </div>
    </li>
  );
}

function TokenSalesInfo() {
  const icoPhases = [
    {
      title: 'Phase 1',
      totalTokens: '17,500,000',
      price: '0.0090',
      startDate: '9/22/2023',
      endDate: '10/22/2023',
    },
    {
      title: 'Phase 2',
      totalTokens: '17,500,000',
      price: '0.0100',
      startDate: '10/22/2023',
      endDate: '11/22/2023',
    },
    {
      title: 'Phase 3',
      totalTokens: '17,500,000',
      price: '0.0200',
      startDate: '11/22/2023',
      endDate: '12/22/2023',
    },
    {
      title: 'Phase 4',
      totalTokens: '17,500,000',
      price: '0.0300',
      startDate: '12/22/2023',
      endDate: '1/22/2024',
    },
  ];

  const idoPhases = [
    {
      title: 'Phase 1',
      totalTokens: '35,000,000',
      price: '0.0400',
      startDate: '1/25/2024',
      endDate: '1/31/2024',
    },
    {
      title: 'Phase 2',
      totalTokens: '35,000,000',
      price: '0.0500',
      startDate: '2/1/2024',
      endDate: '2/5/2024',
    },
    {
      title: 'Phase 3',
      totalTokens: '35,000,000',
      price: '0.0600',
      startDate: '2/6/2024',
      endDate: '2/10/2024',
    },
  ];

  const ieoPhases = [
    {
      title: 'Phase 1',
      totalTokens: '35,000,000',
      price: '0.0700',
      startDate: '2/16/2024',
      endDate: '2/20/2024',
    },
    {
      title: 'Phase 2',
      totalTokens: '35,000,000',
      price: '0.0800',
      startDate: '2/21/2024',
      endDate: '2/25/2024',
    },
    {
      title: 'Phase 3',
      totalTokens: '35,000,000',
      price: '0.0900',
      startDate: '2/26/2024',
      endDate: '3/1/2024',
    },
  ];

  return (
    <>
      <div className="container exchange" style={{ flex: 1,marginTop:'24px' }}>
        <h2 style={{ fontSize: '32px' }}>Public Exchange Listing</h2>
        <ul>
          <li>Token Sale Price on Exchange Listing: $0.1000 per token</li>
          <li>Exchange Listing Date: March 15, 2024</li>
        </ul>
      </div>
      <div className="token-sales-info" style={{display:'flex'}}>
        <div className="column">
          <h3>ICO SALE</h3>
          <ul>
            {icoPhases.map((phase, index) => (
              <SalePhase key={index} {...phase} />
            ))}
          </ul>
        </div>
        <div className="column">
          <h3>IDO SALE</h3>
          <ul style={{display:"flex",flexDirection:"column"}}>
            {idoPhases.map((phase, index) => (
              <SalePhase key={index} {...phase} />
            ))}
          </ul>
        </div>
        <div className="column">
          <h3>IEO SALE</h3>
          <ul style={{display:"flex",flexDirection:"column"}}>
            {ieoPhases.map((phase, index) => (
              <SalePhase key={index} {...phase} />
            ))}
          </ul>
          
        </div>
        
      </div>
      
      
    </>
  );
}

export default TokenSalesInfo;