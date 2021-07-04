import React,{useState} from 'react';
import './tables.css';
import { Cell, Column, Table, Utils,SelectionModes } from "@blueprintjs/table";
import { Card, Checkbox,Icon,Elevation,Tag,Callout,Intent } from '@blueprintjs/core';
import '@blueprintjs/table/lib/css/table.css'
import { title } from 'process';


/**
 * 
 * for Component PlayCardListItemIndex
 */
class carditemindex{
    title : string
    diff  : number  
    datum : number //orgin price

    public constructor(tit:string,dif:number,dat:number){
        this.title =tit
        this.diff  = dif
        this.datum = dat
    }
}


class carditem{
    title : string
    priceold  : string  
    pricenow : string //orgin price
    amount :number  //token amount
    diff   :number //
    symbol  :string 

    public constructor(tit:string,old:string,new1:string,am:number,dif:number,sy:string){
        this.title =tit
        this.priceold = old
        this.pricenow = new1
        this.amount =am
        this.diff  = dif
        this.symbol  = sy
    }
}


export const  LayoutContent:React.FC = ()=> {

    return(
        <div className="wrap">
        <div  className="left">
                <div className="table-content">
                    <div className="bigfont">Transactions</div>
                    <div className="smallfont" style={{paddingBottom:"3ch"}}>todo</div>
                    {/* <Card elevation={Elevation.THREE}> */}
                         <TransactionTable  />
                    {/* </Card> */}
                </div>
        </div>
        <div className="right">
                <div className="table-content ra">
                    <div className="card-content">
                        <div className="bigfont">Plays</div>
                        <div className="smallfont">todo</div>
                        <PlaysCardofCreate />
                        <div>
                            <PlaysCard>
                                aaa
                            </PlaysCard>
                        </div>
                    </div>
                </div>
        </div>
        </div>
    );
}

const TransactionTable:React.FC<{
}> = ({})=> {
    const [ count, setCount ] = useState([false,false]);

    let data =[{"from":"ncccccccccccccccc","to":"xxxxxxxxxxxxxxxxx","txtype":"title1","amount":"title1","time":"5m ago"},
    {"from":"ncccccccccccccccc","to":"xxxxxxxxxxxxxxxxx","txtype":"title1","amount":"title1","time":"5m ago"},
    {"from":"ncccccccccccccccc","to":"xxxxxxxxxxxxxxxxx","txtype":"title1","amount":"title1","time":"5m ago"},
    {"from":"ncccccccccccccccc","to":"xxxxxxxxxxxxxxxxx","txtype":"title1","amount":"title1","time":"5m ago"},
    {"from":"ncccccccccccccccc","to":"xxxxxxxxxxxxxxxxx","txtype":"title1","amount":"title1","time":"5m ago"},
    {"from":"ncccccccccccccccc","to":"xxxxxxxxxxxxxxxxx","txtype":"title1","amount":"title1","time":"5m ago"},
    {"from":"ncccccccccccccccc","to":"xxxxxxxxxxxxxxxxx","txtype":"title1","amount":"title1","time":"5m ago"},
];

    const cellfromRenderer = (rowIndex: number) => {
        return <Cell>{data[rowIndex].from}</Cell>
    };
    const celltoRenderer = (rowIndex: number) => {
        return <Cell>{data[rowIndex].to}</Cell>
    };
    const celltxtypeRenderer = (rowIndex: number) => {
        return <Cell>{data[rowIndex].txtype}</Cell>
    };
    const cellamountRenderer = (rowIndex: number) => {
        return <Cell>{data[rowIndex].amount}</Cell>
    };
    const celltimeRenderer = (rowIndex: number) => {
        return <Cell>{data[rowIndex].time}</Cell>
    };
    // <Checkbox checked={this.state.isEnabled} label="Enabled" onChange={this.handleEnabledChange} />
    // {data[rowIndex].title}
   const handleEnabledChange = (rowindex:number)=>{
        count[rowindex]=!count[rowindex]
        setCount(count)
    }
    const cellcheckRenderer = (rowIndex:number)=>{
        return <Cell style={{textAlign:'center'}}   >
            <Checkbox checked={count[rowIndex]} label="" onChange={()=>handleEnabledChange(rowIndex)} />
        </Cell>
    }

    return (
    <Table  enableFocusedCell={true} numRows={data.length} enableMultipleSelection={true} className="tablewrap">
        <Column name="FROM" cellRenderer={cellfromRenderer}/>
        <Column name="TO" cellRenderer={celltoRenderer}/>
        <Column name="TX TYPE" cellRenderer={celltxtypeRenderer}/>
        <Column name="AMOUNT" cellRenderer={cellamountRenderer}/>
        <Column name="TIME" cellRenderer={celltimeRenderer}/>
        <Column name="" cellRenderer={cellcheckRenderer}/>
    </Table>
    );
}

const PlaysCard:React.FC<{
}> = ({})=> {

    return (
    <div>
        <div className='detail bp3-elevation-0' >
                
                <div >
                <PlayCardListItemIndex topborder={false} data={new carditemindex("ABC",130.3,3.5)} />
                </div>
                <div>
                    <PlaysCardListItem  bkcolor='#62D96B' data={new carditem("111","2000","2100",10,10,"ETH")} />
                    <PlaysCardListItem  bkcolor='#FF66A1' data={new carditem("222","2000","2100",10,10,"ETH")}  />
                    <PlaysCardListItem  bkcolor='#62D96B' data={new carditem("333","2000","2100",10,10,"ETH")}  />
                </div>
                <div style={{padding:'20px',color:'#2B95D6'}}>
                <p style={{ lineHeight:'100%'}}>
                <span style={{ float: 'left' }}>
                   <Icon icon='edit' /> Edit and calculate PNL
                </span>
                <span style={{  float: 'right' }} className="bp3-intent-success">
                    {/* <Icon icon={'arrow-up'} /> */}
                    View all
                </span> 
                </p>
                </div>
                <div>
                <PlayCardListItemIndex topborder={true} data={new carditemindex("ABC1",130.3,160.5)} />
                <PlayCardListItemIndex topborder={true} data={new carditemindex("ABC2",-130.3,300.5)} />
                </div>
        </div>
    </div>
    );
}

const PlayCardListItemIndex : React.FC<{
    topborder:boolean,
    data : carditemindex,
}> =({topborder,data}) => {
    let topclass = topborder?"topbord":""

    let up = data.datum+data.diff > data.datum; //up or down
    let color1 = '#A82A2A'
    let color2 = '#C23030'
    let color3 = '#F55656'
    let color4 = '#FF7373'
    if(up){
         color1 = '#1D7324'
         color2 = '#62D96B'
         color3 = '#43BF4D'
         color4 = '#29A634'   
    }

    return (
        <div style={{padding:'16px'}} className={topclass}>
        <p>ETH Scalp</p>
        <div style={{height:'20px',lineHeight:'150%'}} >
            <span style={{ float: 'left',color:color1,fontSize:'24px',fontWeight:'bolder' }}>
                {up? '+'+data.diff:''+data.diff}
            </span>
            <span style={{ float: 'right',fontSize:'12px'}} >
                {/* <Icon icon={'arrow-up'} /> */}
                <Tag style={{backgroundColor:color4}} >
                    {up?<Icon icon={'arrow-up'}  color={color2}></Icon>:<Icon icon={'arrow-down'}  color={color2}></Icon>}
                    <span color={color3}>12%</span> 
                </Tag>
            </span>
        </div>
        </div>
    );
}

const PlaysCardListItem:React.FC<{
    bkcolor:string,
    data:carditem
}>= ({bkcolor,data})=>{
    bkcolor = bkcolor || '';
    return (
        <Card style={{padding:'none',borderRadius:'0px', backgroundColor:bkcolor,boxShadow:'none' }}>
        <div style={{width:'100%',display:'inline-block',fontWeight:'bold'}}>
            <span style={{ float: 'left' }}>
                {data.title}
            </span>
            <span style={{ float: 'right' }}>
                 @ ${data.priceold+ '/'+data.symbol}
            </span>
        </div>
        <div style={{width:'100%',display:'inline-block',color:'#EBF1F5'}}>
            <span style={{ float: 'left' }}>
            {data.amount*Number(data.pricenow)+ ' -> '+data.amount+' '+data.symbol}
            </span>
            <span style={{ float: 'right' }}>
                0.0003 ETH
            </span>
        </div>
    </Card>
    );
}

const PlaysCardofCreate:React.FC<{
}> = ({})=> {

    return (
    <div  style={{textAlign:'right',color:'#2B95D6',paddingTop:'2ch',paddingBottom:'2ch'}}>
        <Icon icon={'add'}  /> Create New Play
    </div>
    );
}