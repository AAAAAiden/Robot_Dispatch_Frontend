// utils.js负责前后端通信： (暂时用proxy)
// 生成url

const domain = "";

export const login = (credential, asAdmin) => {
  const loginUrl = `${domain}/authenticate/${asAdmin ? "admin" : "guest"}`;
  return fetch(loginUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credential),
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("Fail to log in");
    }

    return response.json();
  });
};

export const register = (credential, asAdmin) => {
  const registerUrl = `${domain}/register/${asAdmin ? "admin" : "guest"}`; // 和上面唯一的区别
  return fetch(registerUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credential),
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("Fail to register");
    }
  });
};

export const getShipments = () => {
  const authToken = localStorage.getItem("authToken");
  const listReservationsUrl = `${domain}/deliveries`;

  return fetch(listReservationsUrl, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("Fail to get shipment list");
    }

    return response.json();
  });
};


export const getStaysByHost = () => {
  const authToken = localStorage.getItem("authToken");
  const listStaysUrl = `${domain}/stays/`;

  return fetch(listStaysUrl, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("Fail to get stay list");
    }

    return response.json();
  });
};


export const cancelReservation = (shipmentId) => {
  const authToken = localStorage.getItem("authToken");
  const cancelReservationUrl = `${domain}/deliveries/${shipmentId}`;

  return fetch(cancelReservationUrl, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("Fail to cancel shipment");
    }
  });
};


export const getVehicleById = (id) => {
  const authToken = localStorage.getItem("authToken");
  const getVehicleByIdUrl = `${domain}/vehicles/${id}`;

  return fetch(getVehicleByIdUrl, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("Fail to search vehicle");
    }
    return response.json();
  });
};


export const listVehicleByCenter = (center_id) => {
  const authToken = localStorage.getItem("authToken");
  const listVehicleByCenterUrl = `${domain}/vehicles/center/${center_id}`;

  return fetch(listVehicleByCenterUrl, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("Fail to search vehicles");
    }
    return response.json();
  });
};


export const addNewVehicle = (data) => {
  const authToken = localStorage.getItem("authToken");
  const addNewVehicleyUrl = `${domain}/vehicles`;

  return fetch(addNewVehicleyUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    body: data,
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("Fail to add new vehicle");
    }
    return response.json();
  });
};


export const deleteVehicle = (vehicleId) => {
  const authToken = localStorage.getItem("authToken");
  const deleteVehicleUrl = `${domain}/vehicles/${vehicleId}`;

  return fetch(deleteVehicleUrl, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("Fail to delete vehicle");
    }
  });
};


export const getDeliveryByOrderId = (order_id) => {
  const authToken = localStorage.getItem("authToken");
  const getDeliveryUrl = `${domain}/deliveries_admin/${order_id}`;
  return fetch(getDeliveryUrl, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("Fail to search delivery");
    }
    return response.json();
  });
};


export const getDeliveryByOrderDate = (start_date, end_date) => {
  const authToken = localStorage.getItem("authToken");
  const getDeliveryUrl = `${domain}/deliveries`;
  return fetch(getDeliveryUrl, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("Fail to search delivery");
    }
    return response.json();
  });
};


export const deleteDelivery = (order_id) => {
  const authToken = localStorage.getItem("authToken");
  const deleteDeliveryUrl = `${domain}/deliveries/${order_id}`;

  return fetch(deleteDeliveryUrl, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("Fail to delete delivery");
    }
  });
};


export const searchVehicleByWeight = (delivery_weight) => {
  const authToken = localStorage.getItem("authToken");
  const searchVehicleByDateUrl = `${domain}/available_vehicles/${delivery_weight}`;

  return fetch(searchVehicleByDateUrl, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("No Available Vehicle");
    }
    return response.json();
  });
}

export const searchVehicle = (data) => {
  const authToken = localStorage.getItem("authToken");
  const searchVehicleUrl = `${domain}/available_vehicles`;

  return fetch(searchVehicleUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    body: data,
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("No Available Vehicle");
    }
    return response.json();
  });
};


export const searchVehicleByFilter = ( 
  pickup_address,
  delivery_address,
  pickup_time,
  delivery_time,
  delivery_length, 
  delivery_width,
  delivery_height,
  delivery_weight,  
) => {
  const authToken = localStorage.getItem("authToken");
  const searchVehicleUrl = `${domain}/available_vehicles/${pickup_address}_${delivery_address}}_${pickup_time}_${delivery_time}_${delivery_length}_${delivery_width}_${delivery_height}_${delivery_weight}`;
  return fetch(searchVehicleUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("No Available Vehicle");
    }
    return response.json();
  });
};


export const addDeliveryOrder = (data) => {
  const authToken = localStorage.getItem("authToken");
  const addOrderUrl = `${domain}/deliveries`;
  console.log(data.get("vehicle_id"));
  console.log(data.get("center_id"));

  return fetch(addOrderUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${authToken}`,
      //"Content-Type": "application/json",
    },
    body: data,
  }) .then ((response) => {
    if(response.status !== 200) {
      throw Error("Fail to Create Order");
    }
    console.log(response);
    return response.json();
  });
}


export const estimateDeliveryTime = (data) => {
  const authToken = localStorage.getItem("authToken");
  const searchVehicleByDateUrl = `${domain}/estimate_time/${data.get("expect_pickup_time")}_${data.get("pickup_address")}_${data.get("deliver_address")}_${data.get("vehicle_id")}`;

  return fetch(searchVehicleByDateUrl, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("No Estimate Time");
    }
    return response.json();
  });
}
