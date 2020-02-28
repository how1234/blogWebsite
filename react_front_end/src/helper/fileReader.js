import {serialize,deserialize} from 'bson'

export const toBase64 = file =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
//https://stackoverflow.com/questions/35940290/how-to-convert-base64-string-to-javascript-file-object-like-as-from-file-input-f
export const fromBase64 = (dataurl, filename) => {
  var arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
};


export const fileToText = file =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsText(file);
    // reader.readAsArrayBuffer(file)

    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });


