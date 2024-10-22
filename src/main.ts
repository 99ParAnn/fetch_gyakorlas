import './style.css'

export interface Termek {
  id: number
  rating: number
  status: string
}

async function adatLetoltes(){
  try{
  const response = await fetch('https://retoolapi.dev/49UDBU/termekek')
  if(!response.ok){
    console.log("rossz kérés! Hibakód: " + response.status);
    return;
  }
  console.log(response.status)
  const adatok = await response.json() as Termek[];
  const adatokElem = document.getElementById('data')!;
  adatok.sort((a,b) => {return a.rating-b.rating;})
  adatok.forEach(adat => {
    const tblRow = document.createElement('tr');
    tblRow.innerHTML = `<tr>
                          <td>${adat.id}</td> 
                          <td>${adat.rating}</td>
                          <td>${adat.status}</td>
                          <td>
                              <button class="delete"></button>
                          </td>
                        </tr>`;
    adatokElem.appendChild(tblRow);
  
  })
  }catch(e: any){
    console.log("something is on fire idk");
  }    
  };

  document.addEventListener("DOMContentLoaded", async () =>{
    adatLetoltes();
    document.getElementById("addThing")!.addEventListener("click", async (event) =>
    {     
      event.preventDefault();
      console.log("clicked add thing button");
      const newID = (document.getElementById("idInput") as HTMLInputElement).value;
      const newRating = (document.getElementById("rating") as HTMLInputElement).value;
      const newStatus = (document.getElementById("status") as HTMLInputElement).value;
      const ujTermek: Termek = {
        id: parseInt(newID),
        rating: parseInt(newRating),
        status: newStatus
        //placeholder
      }
      
      const res = await fetch('https://retoolapi.dev/49UDBU/termekek', {
        method:'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(ujTermek),
      })
      if(res.ok)
      {
        console.log("uwu")
      }
      
    })
  })