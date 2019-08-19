exports.mapToObj = arrayOfObjs => {
  let resultObj = {};
  arrayOfObjs.map(item => {
    if (item.ref && item.ref.id && item.data) {
      resultObj[item.ref.id] = item.data;
    }
  });

  return resultObj;
};
