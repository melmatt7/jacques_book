import { Icon,Button, H2 } from '@blueprintjs/core';
import React,{useState} from 'react';
import './home.css';
import {LayoutContent} from '../transactiontable/tables'


export const Home:React.FC<{}> = ({})=>{


    return (
        <div id="body" style={{backgroundColor:'#fff',height:'100%'}}>
            <div style={{height:'60px',lineHeight:'60px',}}>
                <div style={{paddingLeft:'20px',float:'left'}} >
                    <span style={{padding:'20px'}}>
                        <Icon icon="book" iconSize={24} color='#2B95D6' />
                    </span>
                    <span style={{padding:'20px'}}>
                        Home
                    </span>
                    <span style={{padding:'20px'}}>
                        Plays
                    </span>
                </div>
                <div style={{paddingRight:'20px',float:'right'}}>
                <span style={{padding:'20px'}}>
                        View Demo
                    </span>
                    <span style={{padding:'20px'}}>
                        <Button className="bp3-intent-primary" style={{fontSize:'10px',backgroundColor:'#2B95D6',boxShadow:'none'}} >
                            Connect Wallet
                        </Button>
                    </span>   
                </div>
            </div>
            <div style={{height:'220px',backgroundColor:'#F7F7F7'}}>
                <div style={{textAlign:'center',paddingTop:'40px'}}>
                    <H2>profit tracking made easy with PLAYBOOK</H2>
                    <div style={{paddingTop:'10px',fontSize:'16px',color:'#929292'}}>
                    lorem ipsum dolor,site amet consectetur adipisicing elit. Repellendus repellat laudantium.
                    </div>
                    <div style={{width:'100%',}} >
                          <div className='flatwrap'>
                          <div className='flatpart' >
                                <p>$234,567</p>
                                <p> Total Assets</p>
                            </div>
                            <div className='flatpart' >
                                <p>$234,567</p>
                                <p> Total Assets</p>
                            </div>
                            <div className='flatpart'>
                                <p>100%</p>
                                <p> Total Assets</p>
                            </div>
                          </div>
                    </div>
                </div>
            </div>
            <div className='bottomdiv'>
                    <div className='empdiv'></div>
                    <LayoutContent/>
            </div>
        </div>
        
    );
}