const updateStatus = (statusCode: string): string => {
  switch (statusCode) {
    case "ClosedOutEmpty":
      return "Empty Dropped";
    case "ClosedInFilled":
      return "Filled Available";
    case "FreeAtBU":
      return "Filled to picked";
    case "DraftInFilled":
      return "Filled Picked In Document";
    case "DraftOutEmpty":
      return "Empty Picked In Document";
    case "WTBER":
      return "Empty At Warehouse";
    case "WTCPF":
      return "Filled At Vehicle";
    case "IntransitOutEmpty":
      return "Empty At Vehicle";
    case "IntransitInFilled":
      return "Filled At Vehicle";
    case "CTWPE":
      return "Empty picked form Customer";
    case "DroppedInFilled":
      return "Filled Dropped";
    case "AtCust":
      return "Filled at Customer";
    case "Pending":
      return "Pending";
    case "Assigned":
      return "Assigned to Driver";
    case "Delivered":
      return "Delivered";
    case "Ready to Dispatch":
      return "Ready for Shipment";
    case "Pickup Request Initiated.":
      return "Request Initiated";
    case "Pickup Request Initiated":
      return "Request Initiated";
    case "Request Completed":
      return "Request Fulfilled";
    case "RequestCompleted":
      return "Request Fulfilled";
    case "Deactivated":
      return "Inactive";
    case "Completed":
      return "Order Fulfilled";
    case "Empty return":
      return "Refill Order";
    case "Empty pickup only":
      return "empty return";
    case "DraftInFilled":
      return "Filled Picked In Document";
    default:
      return statusCode;
  }
};

const updateInvoiceType = (type: string): string => {
  switch (type) {
    case "SecurityDeposit":
      return "Security Deposit";
    case "EmptyReturn":
      return "Refill Order";
    case "EmptyPickupOnly":
      return "Empty Return";
    default:
      return type;
  }
};

// export const updateStatusFunction = (
//   initialData: any,
//   statusCodeKey: string,
//   invoiceTypeKey: string
// ): any => {
//   const updatedData = (item: any): any => {
//     // let data1;
//     // for (const key in item) {
//     //   if (Array.isArray(item[key])) {
//     //     // item[key].map((updatedSingleData, index) => {
//     //     //   return console.log(updatedSingleData)
//     //     // });
//     //     console.log(`${key} is an array.`);
//     //   } else {
//     //     console.log(`${key} is not an array.`);
//     //     // return {
//     //     //   ...item,
//     //     //   status: updateStatus(item[statusCodeKey]),
//     //     //   invoiceType: updateInvoiceType(item[invoiceTypeKey]),
//     //     // };
//     //   }
//     // }
//     // return updatedData(initialData);
//     // console.log(data1);

//     // const data1 = Object.keys(item).reduce((acc: any, key: string) => {
//     //     acc[key] = Array.isArray(item[key])
//     //       ? item[key].map(updatedData) // Recursively process arrays
//     //       : item[key]; // Keep non-array values as is
//     //     return acc;
//     //   }, {});
//     // console.log(data1)
//     // if (Array.isArray(item)) {
//     //   // If the item is an array, process each element recursively
//     //   return item.map(updatedData);
//     // }
//     // if (typeof item === "object" && item !== null) {
//     //   // return Object.keys(item).reduce((acc: any, key: string) => {
//     //   //   acc[key] = Array.isArray(item[key])
//     //   //     ? item[key].map(updatedData) // Recursively process arrays
//     //   //     : item[key]; // Keep non-array values as is
//     //   //   return acc;
//     //   // }, {});
//     //   // // If the item is an object, update its status and invoiceType
//     //   return {
//     //     ...item,
//     //     status: updateStatus(item[statusCodeKey]),
//     //     invoiceType: updateInvoiceType(item[invoiceTypeKey]),
//     //   };
//     // }

//     // // Return the item as is for non-object or non-array data
//     // return item;
//   };

//   // return Array.isArray(initialData)
//   //   ? initialData.map(updatedData)
//   //   : updatedData(initialData);
//   return updatedData(initialData);
// };

export const updateStatusFunction = (
  initialData: any,
  statusCodeKey: string,
  invoiceTypeKey: string
): any => {
  const updatedData = (item: any): any => {
    const { orderInfo } = item;
    if (orderInfo) {
      return {
        ...item,
        orderInfo: {
          ...orderInfo,
          status: updateStatus(item?.orderInfo[statusCodeKey]),
          invoiceType: updateInvoiceType(item?.orderInfo[invoiceTypeKey]),
        },
      };
    }
    // const data1 = Object.entries(item).reduce((acc, [key, value]) => {
    //   acc[key] = Array.isArray(value)
    //     ? updatedData(value) // Recursively process arrays
    //     : key === statusCodeKey
    //     ? updateStatus(value.toString()) // Update status field
    //     : key === invoiceTypeKey
    //     ? updateInvoiceType(value.toString()) // Update invoiceType field
    //     : value; // Keep other values as is
    //   return acc;
    // }, {} as any);
    // console.log(data1);
    if (Array.isArray(item)) {
      // If the item is an array, process each element recursively
      return item.map(updatedData);
    }
    if (typeof item === "object" && item !== null) {
      const data1 = Object.entries(item).reduce((acc, [key, value]) => {
        acc[key] = Array.isArray(value)
          ? updatedData(value) // Recursively process arrays
          : key === statusCodeKey
          ? updateStatus(value.toString()) // Update status field
          : key === invoiceTypeKey
          ? updateInvoiceType(value.toString()) // Update invoiceType field
          : value; // Keep other values as is
        return acc;
      }, {} as any);
      // console.log(data1);
      return data1;
      // If the item is an object, update its status and invoiceType
    } else {
      return {
        ...item,
        status: updateStatus(item[statusCodeKey]),
        invoiceType: updateInvoiceType(item[invoiceTypeKey]),
      };
    }
    // Return the item as is for non-object or non-array data
    // return item;
  };

  // return Array.isArray(initialData)
  //   ? initialData.map(updatedData)
  //   : updatedData(initialData);
  return updatedData(initialData);
};
