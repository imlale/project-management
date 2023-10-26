import { Avatar, List, Layout, Input, Button, Row, Col } from 'antd';


const data = [
    {
        title: 'Ant Design Title 1',
    },
    {
        title: 'Ant Design Title 2',
    },
    {
        title: 'Ant Design Title 3',
    },
    {
        title: 'Ant Design Title 4',
    },
    {
        title: 'Ant Design Title 5',
    },
    {
        title: 'Ant Design Title 6',
    },
    {
        title: 'Ant Design Title 7',
    },
    {
        title: 'Ant Design Title 8',
    },
];

const Discussion = () => {
    return <Layout style={{ height: "100%", overflow: "auto", backgroundColor: "white" }}>
        <Row style={{ padding: "16px" }} justify={"end"}>
            <Col span={24}>
            <Input.TextArea
                showCount
                maxLength={1000}
                bordered={false}
                style={{ height: 120, marginBottom: 24 }}

                placeholder="Write your message here..."
            />
            </Col>
          
            <Col>
            <Button type="primary">Submit</Button>
            </Col>
        </Row>
        <List
            style={{ padding: "0 16px", height: "100%" }}
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(item, index) => (
                <List.Item>
                    <List.Item.Meta
                        avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />}
                        title={<a href="https://ant.design">{item.title}</a>}
                        description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                    />
                </List.Item>
            )}
        />
    </Layout>
}

export default Discussion;