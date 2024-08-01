<!-- Shallow copy -->
const obj = { name: 'Version 1', additionalInfo: { version: 1 } };

const shallowCopy1 = { ...obj };
const shallowCopy2 = Object.assign({}, obj);
shallowCopy1.name = 'Version 2';
shallowCopy1.additionalInfo.version = 2;

shallowCopy2.name = 'Version 2';
shallowCopy2.additionalInfo.version = 2;

console.log(obj); // { name: 'Version 1', additionalInfo: { version: 2 } }
console.log(shallowCopy1); // { name: 'Version 2', additionalInfo: { version: 2 } }
console.log(shallowCopy2); // { name: 'Version 2', additionalInfo: { version: 2 } }

<!-- Deep copy -->
const obj = { name: 'Version 1', additionalInfo: { version: 1 } };

const deepCopy = JSON.parse(JSON.stringify(obj));


<!-- Performance -->
For obvious reasons, shallow copies are a lot faster than deep copies. But this doesn’t mean that you should always use a shallow copy, because sometimes you will also need a copy of the nested objects. So, which option should I use?

If the depth of your object is equal to one, use a shallow copy.
If the depth of your object is bigger than one, use a deep copy.