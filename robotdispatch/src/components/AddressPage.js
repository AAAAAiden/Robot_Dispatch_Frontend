import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import {
  Form,
  Input,
  Select,
  DatePicker,
  InputNumber,
  message,
  Card,
  List,
  Button,
  Divider,
  Layout,
  TimePicker
} from 'antd';
import Text from "antd/lib/typography/Text";
import VehicleDetailInfoButton from './VehicleDetailInfoButton';
import { searchVehicle, searchVehicleByFilter, searchVehicleByWeight } from '../utils';

const { RangePicker } = DatePicker;
const { TextArea } = Input;
const { Option } = Select;
const { Content } = Layout;

const style = {
    padding: '8px 0',
    background: '#fafafa',
}


class AddressPage extends React.Component {
    state = {
        data: [],
        loading: false,
    };

    handleSearchVehicle = async (values) => {
        const formData = new FormData();
        // add other data to dataForm
        // formData.append("pickup_address", values.pickup_address);
        // formData.append("delivery_address", values.delivery_address);
        // formData.append("pickup_time", values.pickup_time);
        // formData.append("delivery_time", values.delivery_time);
        // formData.append("delivery_length", values.delivery_length);
        // formData.append("delivery_width", values.delivery_width);
        // formData.append("delivery_height", values.delivery_height);
        // formData.append("delivery_weight", values.delivery_weight);
        const deliverylength = Number.parseInt(values.delivery_length);

        formData.append("pickup_address", values.pickup_address);
        formData.append("delivery_address", values.delivery_address);
        formData.append("pickup_time", values.pickup_time.format("hh:mm:ss"));
        formData.append("delivery_time", values.delivery_time.format("hh:mm:ss"));
        formData.append("delivery_length", values.delivery_length);
        formData.append("delivery_width", 5);
        formData.append("delivery_height", 5);
        formData.append("delivery_weight", 5);
        console.log(formData);
    
        this.setState({
          loading: true,
        });
    
        try {
          const resp = await searchVehicle(formData);
          this.setState({
            data: resp,
          });
          message.success("Found Available Vehicle");
        } catch (error) {
          message.error(error.message);
        } finally {
          this.setState({
            loading: false,
          });
        }
      };

    search = async (values) => {
        this.setState({
            loading: false,
        });

        const {
            pickup_address,
            delivery_address,
            pickup_time,
            delivery_time,
            delivery_length, 
            delivery_width,
            delivery_height,
            delivery_weight,
        } = values;

        try {
            const resp = await searchVehicleByFilter(
                pickup_address,
                delivery_address,
                pickup_time,
                delivery_time,
                delivery_length, 
                delivery_width,
                delivery_height,
                delivery_weight,
            );
            this.setState({
                data: resp,
            });
            message.success("search success");
        } catch (error) {
            message.error(error.message);
        } finally {
            this.setState({
                loading: false,
            });
        }
    };

    // search = async (query) => {
    //     this.setState({
    //         loading: true,
    //     });

    //     try {
    //         const resp = await searchVehicleByDate(query);
    //         this.setState({
    //             data: resp,
    //         });
    //     } catch (error) {
    //         message.error(error.message);
    //     } finally {
    //         this.setState({
    //             loading: false,
    //         });
    //     }
    // }

    searchByWeight = async (values) => {
        this.setState({
          loading: false,
        });
        const delivery_weight = values.delivery_weight;
        try {
          const resp = await searchVehicleByWeight(delivery_weight);
          this.setState({
            data: resp,
          });
          message.success("search success");
        } catch (error) {
          message.error(error.message);
        } finally {
          this.setState({
            loading: false,
          });
        }
      };

    render() {
        return (
            <>

                <Form 
                    onFinish={this.handleSearchVehicle}
                    style={style}
                    labelCol={{ span: 3 }}
                    wrapperCol={{ span: 16 }}
                    // layout='horizontal'
                >
                    <Divider>From</Divider>
                    <Form.Item label="Name (From)" name="pickup_name">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Pick Up Address" name="pickup_address">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Pick Up Date" name="pickup_date" >
                        <DatePicker />
                    </Form.Item>
                    <Form.Item label="Pick Up Time" name="pickup_time" >
                        <TimePicker />
                    </Form.Item>

                    <Divider>To</Divider>
                    <Form.Item label="Name (To)" name="delivery_name">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Delivery Address" name="delivery_address">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Delivery Date" name="delivery_date" >
                        <DatePicker />
                    </Form.Item>
                    <Form.Item label="Delivery Time" name="delivery_time" >
                        <TimePicker />
                    </Form.Item>

                    <Divider >Package Information</Divider>
                    <Form.Item label="Length" name="delivery_length" rules={[{ type: "number" }]}>
                        <InputNumber min={1}/> inch
                    </Form.Item>
                    <Form.Item label="Width" name="delivery_width"  rules={[{ type: "number" }]}>
                        <InputNumber min={1}/> inch
                    </Form.Item>
                    <Form.Item label="Height" name="delivery_height"  rules={[{ type: "number" }]}>
                        <InputNumber min={1}/> inch
                    </Form.Item> 
                    <Form.Item label="Weight" name="delivery_weight" rules={[{ type: "number" }]}>
                        <InputNumber min={1} /> lbs
                    </Form.Item>
                    <Form.Item>
                    <Button loading={this.state.loading} type="primary" htmlType="submit">
                        Search
                    </Button>
                  </Form.Item>
                </Form>
             

                <List 
                    style={{ marginTop: 20 }} 
                    loading={this.state.loading}
                    grid={{
                        gutter:16,
                        xs: 1,
                        sm: 3,
                        md: 3,
                        lg: 3,
                        xl: 4,
                        xxl: 4,
                    }}
                    dataSource={this.state.data}
                    renderItem={(item) => (
                        <List.Item>
                            <Card
                                key={item.id}
                                title={
                                    <div style={{ display: "flex", alignItems: "center" }}>
                                    <Text ellipsis={true} style={{ maxWidth: 150 }}>
                                        Vehicle: {item.name}
                                    </Text>
                                    <VehicleDetailInfoButton vehicle={item} />
                                    </div>
                                }
                                >
                                <Text>ID: {item.id}</Text>
                                <Divider />
                                <Text>Status: {item.status}</Text>
                            </Card>
                        </List.Item>
                    )}
                />
            </>
          );
    }
}


export default AddressPage;
