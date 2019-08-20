//Helper function to convert customers and products to an object with key of the ref id

exports.mapToObj = arrayOfObjs => {
  const resultObj = {};
  arrayOfObjs.map(item => {
    if (item.ref && item.ref.id && item.data) {
      resultObj[item.ref.id] = item.data;
    }
  });

  return resultObj;
};
