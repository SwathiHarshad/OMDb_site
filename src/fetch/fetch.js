export const GET = url => {
  fetch(url)
    .then(res => res.json())
    .then((success) => { console.log(success) } )
    .catch((error)=>{ console.log(error)});
}