const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};
export async function AJAX(url, uploadData = undefined) {
  try {
    let fetchPro = uploadData
      ? fetch(url, {
          method: 'POST',
          headers: {
            // we use application/json' to tell API that data we send will be in json format
            'Content-Type': 'application/json',
          },
          // body--data we want to send and convert to JSON
          body: JSON.stringify(uploadData),
        })
      : fetch(url);

    return fetchPro.then(response => response.json());
  } catch (er) {
    console.log(er);
  }
}
// // export async function getJSON(url) {
//   try {
//     console.log(url);
//     //  downloading recipe
//     const fetchPr = fetch(url);
//     let res = await Promise.race([fetchPr, timeout(2.5)]);
//     let data = await res.json();
//     if (!res.ok) throw new Error(`${data.message} (${res.status})`);
//     return data;
//   } catch (er) {
//     console.log(er);
//   }
// }
// export async function sendJSON(url, uploadData) {
//   try {
//     // we need 'POST' request for sending API, so besides URL we need to pass an object of options
//     const fetchPr = fetch(url, {
//       method: 'POST',
//       headers: {
//         // we use application/json' to tell API that data we send will be in json format
//         'Content-Type': 'application/json',
//       },
//       // body--data we want to send and convert to JSON
//       body: JSON.stringify(uploadData),
//     });
//     let res = await Promise.race([fetchPr, timeout(2.5)]);
//     let data = await res.json();
//     if (!res.ok) throw new Error(`${data.message} (${res.status})`);
//     return data;
//   } catch (er) {
//     console.log(er);
//   }
// //
console.log(BUG);
}