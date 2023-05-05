// import {unixTimestamp} from "unix-timestamp"

export const corectData = (t) => {
  let date = new Date(t* 1000);




  return `${date.toLocaleDateString("en-US")}  ${date.toLocaleTimeString("en-US")}` ;

}


