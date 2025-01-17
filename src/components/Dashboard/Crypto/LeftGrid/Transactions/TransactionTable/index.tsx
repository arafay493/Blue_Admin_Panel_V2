import FeatherIconCom from 'CommonElements/Icons/FeatherIconCom';
import React from 'react'
import { Table } from 'reactstrap';

type propstype = {
    tableData: {
        title: string;
        subTitle: string;
        price: string;
        coins: string;
        totalPrice: string;
        trend: string;
    }[]
    filterCoins: string
}

const TransactionTable = ({ filterCoins, tableData }: propstype) => {
    const updatedCoins = filterCoins === 'All' ? tableData : tableData.filter((item) => item.title.includes(filterCoins));
    return (
        <Table>
            <tbody>
                {updatedCoins?.map((item, i) => (
                    <tr key={i}>
                        <td>
                            <div className='d-flex'>
                                {item.trend === 'up' ? <FeatherIconCom iconName='TrendingUp' className='font-success me-2' /> : <FeatherIconCom className='font-danger me-2' iconName='TrendingDown' />}
                                <div>
                                    <h6 className='f-14 mb-0'>{item.title}</h6>
                                    <span className='f-light'>{item.subTitle}</span>
                                </div>
                            </div>
                        </td>
                        <td>
                            <span className='f-light f-w-500'>
                                {item.price} {item.coins}
                            </span>
                        </td>
                        <td>
                            <span className='f-light f-w-500'>${item.totalPrice}</span>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    )
}

export default TransactionTable