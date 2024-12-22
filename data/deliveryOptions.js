export const deliveryOptions = [
  {
    id: '1',
    deliveryDays: 7,
    shippingFee: 0
  },
  {
    id: '2',
    deliveryDays: 3,
    shippingFee: 499
  },
  {
    id: '3',
    deliveryDays: 1,
    shippingFee: 999
  }
];

// export function getDeliveryDaysById(deliveryOptionID) {
//   let deliveryDays;

//   // loop to extract matching delivery option
//   deliveryOptions.forEach((option) => {
//     if(option.id === deliveryOptionID) {

//     }
//   })
// }


export function getDeliveryOption(deliveryOptionID) {
  let deliveryOption;

  // loop to extract matching delivery option
  deliveryOptions.forEach((option) => {
    if(option.id === deliveryOptionID) {
      deliveryOption = option;
    }
  });

  // return delivery option and the default delivery option for 0 shipping fee
  return deliveryOption || deliveryOptions[0];
}