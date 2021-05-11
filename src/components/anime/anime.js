import React from 'react';

export class Anime extends React.Component {
    constructor(){
        super();
        this.state={

        }
    }
    render(){
        return(
            <section className="pt-mobile-80">
            <div className="container">
              <div className="row medium-padding100">
            
                <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12 mb30" data-mh="pricing-item" >
                  <div className="crumina-module crumina-pricing-table pricing-table--style1" style={{height:'350px',background:'linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url(https://static.bunnycdn.ru/i/cache/images/2018/04/916939764c0315fb150b95602bece7f7.jpg)',backgroundSize:'cover',backgroundPosition:'center'}}>
                    
                    <h5 className="pricing-title"> <span style={{color:'white'}}>JoJo's bizzare Adventure</span></h5>
                  
                    <a href="005_coin_market.html" className="btn btn--large btn--green-light btn--transparent">Watch Now</a>
                  </div>
                </div>
              </div>
           
            </div>
         </section>
        )
    }   
}