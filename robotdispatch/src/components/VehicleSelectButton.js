import { message, Button } from "antd";
import React from "react";

class VehicleSelectButton extends React.Component {
    state = {
        data: this.props.data,
        loading: false,
        modalVisible: false,
    };

    handleVehicleSelect = () => {
        this.setState({
            modalVisible: true,
        });
    };
    
    handleCancel = () => {
        this.setState({
            modalVisible: false,
        });
    };

    handleSelect = () => {
        const vehicle = this.props.vehicle;
        const data = this.props.data;
        
        const dataForm = data;
        dataForm.set("vehicle_id", vehicle.id);
        dataForm.set("center_id", vehicle.center_id);
        this.props.setData(dataForm);

        this.setState({
            loading: true,
        });

        try {

            message("Vehicle Selected")
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
                <Button 
                    onClick={this.handleSelect} 
                    shape="round" 
                    type="primary"
                >
                    Select
                </Button>
            </>
        )
    }
}

export default VehicleSelectButton;