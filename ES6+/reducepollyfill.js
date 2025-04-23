const reduce = (arr, fn, initialvalue) => {
    const intialValue = initialvalue !== undefined;
    let accumulator = intialValue ? initialvalue : arr[0];
    const startFrom  =  intialValue ? 0 : 1;
    for(let i = startFrom; i < arr.length; i++){
      if(Object.hasOwn(arr, i)){
        accumulator += typeof fn === 'function' ? fn(arr[i]) : arr[i]
      }
    }
    return accumulator
  }
  
  console.log(reduce([10, 50], null, 4))
  