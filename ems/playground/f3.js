const firstName = "amit";
const lastName = "p";

/*  multiple values sholud be made as an object and then need to be exported
one approch
const exportObj = { firstName, lastName};    // object consize

second approch
const exportObj = {
    firstName: firstName
    lastName: lastName
}

*/

// third approch
const exportObj = {}
exportObj.firstName = firstName;
exportObj.lastName = lastName;

module.exports = exportObj;
