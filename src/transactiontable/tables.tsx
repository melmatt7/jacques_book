import React,{useState} from 'react';
import './tables.css';
import { Cell, Column, Table, Utils,SelectionModes } from "@blueprintjs/table";
import { Card, Checkbox,Icon,Elevation,Tag,Callout,Intent } from '@blueprintjs/core';
import '@blueprintjs/table/lib/css/table.css'

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
                <div className="table-content">
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
                <div style={{padding:'20px'}}>
                    <p>ETH Scalp</p>
                    <div >
                        <span style={{ float: 'left',paddingBottom:'20px' }}>
                            +$45.000
                        </span>
                        <span style={{ color: '#fff', float: 'right' }} className="bp3-intent-success">
                            {/* <Icon icon={'arrow-up'} /> */}
                            <Tag icon={'arrow-up'} >12%</Tag>
                        </span>
                    </div>
                </div>
                <div style={{clear:'both'}}></div>
                <div>
                    <PlaysCardListItem />
                    <PlaysCardListItem />
                    <PlaysCardListItem />
                </div>
                <div>

                </div>
        </div>
    </div>
    );
}


const PlaysCardListItem:React.FC <{
}>= ({})=>{
    return (
        <Card style={{padding:'none',borderRadius:'none'}}>
        <div style={{width:'100%',display:'inline-block'}}>
            <span style={{ float: 'left' }}>
                Swap
            </span>
            <span style={{ float: 'right' }}>
                @ $1200.ETH
            </span>
        </div>
        <div style={{width:'100%',display:'inline-block'}}>
            <span style={{ float: 'left' }}>
                $22,00  ETH
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
    <div  style={{textAlign:'right',color:'blue',paddingTop:'5ch'}}>
        <Icon icon={'add'}  /> Create New Play
    </div>
    );
}