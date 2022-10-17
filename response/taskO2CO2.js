var main = (()=>{
	function read_CO2(hex){
		let subHex= hex.substring(78, 82);
		let str = parseInt("0x" + subHex).toString();
		let num = Number(str);
		if (isNaN(num)) return 0;
		return num;
	}
	function read_O2(hex){
		let subHex= hex.substring(82, 86);
		let str = parseInt("0x" + subHex).toString()
		let num = Number(str) / 100;
		if (isNaN(num)) return 0;
		return num;
	}
	return {
		read_O2,
		read_CO2
	}
})()
if (typeof (exports) !== 'undefined') exports.main = main;