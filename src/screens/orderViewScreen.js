import react, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Table } from "@nextui-org/react";

const OrderViewScreen = () => {

    const navigate = useNavigate()

    // const [active, setActive] = useState('home')
    const [orderInfo, setOrderInfo] = useState([])
    //const [count, setCount] = useState(0);

    const [count, setCount] = useState(0);
    const [autoRefreshEnabled, setAutoRefreshEnabled] = useState(false);

  const handleRefresh = () => {
    setCount(prevCount => prevCount + 1);
  };

    const refresh = () => {
      setCount(prevCount => prevCount + 1);
    };

    useEffect(() => {
        const newfun = async () => {
            const { data } = await axios.get(`http://127.0.0.1:3001/api/order/getall`)
            console.log(data)
            setOrderInfo(data)
        }
        newfun()

        let timer;

        if (autoRefreshEnabled) {
          timer = setInterval(handleRefresh, 5000);
        }

        return () => clearInterval(timer);

    }, [autoRefreshEnabled])

    const toggleAutoRefresh = async (id) => {
      await axios.put(`http://127.0.0.1:3001/api/order/${id}/status`)
      const timer = setInterval(refresh, 5000);
      setAutoRefreshEnabled(prevEnabled => !prevEnabled);
      return () => clearInterval(timer);
    };

    const submitHandler = async (id) => {
        await axios.put(`http://127.0.0.1:3001/api/order/${id}/status`)
        const timer = setInterval(refresh, 5000);
        return () => clearInterval(timer);
    }
    

    return (
        <div className="hero-section-order">
            <Table
      aria-label="Example table with static content"
      css={{
        height: "auto",
        width: "100%"
      }}
    >
      <Table.Header>
        <Table.Column>id</Table.Column>
        <Table.Column>Customer name</Table.Column>
        <Table.Column>Menu items</Table.Column>
        <Table.Column>status</Table.Column>
        <Table.Column>table no</Table.Column>
        <Table.Column>Mark as delivered</Table.Column>
      </Table.Header>
      <Table.Body>
        
            {orderInfo.map((item, index) => (
                <Table.Row key="1">
                    <Table.Cell>{item._id}</Table.Cell>
                <Table.Cell>{item.customer_name}</Table.Cell>
                <Table.Cell>
                <ol>
                  {item.menu_items.map((item, index) => (
                    <li key={index}>
                       {item.item_name} x ({item.quantity})
                    </li>
                  ))}
                </ol>
                </Table.Cell>
                <Table.Cell>pending</Table.Cell>
                <Table.Cell>{item.table_number}</Table.Cell>
                <Table.Cell><button className="cta-button home-cta" onClick={() => toggleAutoRefresh(item._id)}>Deliver</button></Table.Cell>
                </Table.Row>
            ))}
        
        
      </Table.Body>
    </Table>
        </div>
    )
}


export default OrderViewScreen