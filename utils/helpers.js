export const dataReformat = (arr) => {
  return arr.map((el) => ({
    id: el.ID,
    name: el.name,
    size: el.variationSize.displayName,
    color: el.color,
    available: el.status.available,
    addToCartLink: el.addToCartLink,
  }));
};

export const isAvailable = (arr) => {
  return arr.filter((el) => el.available);
};

export const productMapping = (arr) => {
  return arr.reduce((accu, curr) => {
    if (accu.color) {
      if (!accu.color.includes(curr.color)) {
        accu.color.push(curr.color);
      }
    }
    if (!accu.color) {
      accu.color = [curr.color];
    }

    if (accu.size) {
      if (!accu.size.includes(curr.size)) {
        accu.size.push(curr.size);
      }
    }
    if (!accu.size) {
      accu.size = [curr.size];
    }
    return accu;
  }, {});
};

export const sortDemand = (productArray, form) => {
  return Object.keys(form).reduce((accu, curr) => {
    const list = form[curr];
    let newArr = [];
    list.forEach((el) => {
      const filter = accu.filter((pt) => pt[curr] === el);
      newArr = newArr.concat(filter);
    });
    return newArr;
  }, productArray);
};
