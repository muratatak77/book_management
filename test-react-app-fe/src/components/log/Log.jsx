import React from "react";

const Log = (key, val) => {
  let str = ""
  if (key){
    str += `${key} :`
  }
  if (val){
    if (typeof val === 'object'){
      val = JSON.stringify(val);
    }
    str += val
  }
  console.log(str);
}

export default Log;