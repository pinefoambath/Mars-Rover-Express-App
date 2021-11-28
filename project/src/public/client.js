let store = {
    user: { name: "Visitor" },
    apod: '',
    rovers: ['Curiosity', 'Opportunity', 'Spirit', 'Perseverance'],
    selectedRover: '',
}

// add our markup to the page
const root = document.getElementById('root')

const updateStore = (store, newState) => {
    store = Object.assign(store, newState)
    render(root, store)
}

const render = async (root, state) => {
    root.innerHTML = App(state)
}


// create content
const App = (state) => {
    let { rovers, apod } = state

    return `
        <header></header>
        <main>
            <div class="container">
                ${Greeting(store.user.name)}
                <section>
                    <h3>Let's learn something about Mars Rovers (while I learn about Node.JS and Express.JS) 👾  🛰</h3>
                    <p>There are four Rovers currently on Mars (that we know of 👀): ${store.rovers.join(', ')}.</p>
                    <p>You can fetch recent, real-world data from each one of them here:</p>
                    <div class="rover_group">
                        <div class="rover_tag" onclick="SelectRover('Curiosity')">
                          <div id="curiosity">
                            Curiosity
                          </div>
                        </div>  
                        <div id="opportunity" onclick="SelectRover('Opportunity')">
                          <div class="rover_tag">
                            Opportunity
                          </div>
                        </div>
                        <div id="spirit" onclick="SelectRover('Spirit')">
                          <div class="rover_tag">
                            Spirit
                          </div>
                        </div>  
                        <div id="perseverance" onclick="SelectRover('Perseverance')"> 
                          <div class="rover_tag">
                            Perseverance
                          </div>
                        </div>
                    </div>
                    ${ManifestData()}
                    ${ImageOfTheDay(apod)}
                </section>
            </div>
        </main>
        <footer></footer>
    `
}

// listening for load event because page should load before any JS is called
window.addEventListener('load', () => {
    render(root, store)
})


// ------------------------------------------------------  COMPONENTS

// Pure function that renders conditional information -- THIS IS JUST AN EXAMPLE, you can delete it.
const Greeting = (name) => {
    if (name) {
        return `
            <h1>Welcome, ${name}!</h1>
        `
    }

    return `
        <h1>Hello!</h1>
    `
}

// Example of a pure function that renders infomation requested from the backend
const ImageOfTheDay = (apod) => {
    // If image does not already exist, or it is not from today -- request it again
    const today = new Date()
    const photodate = new Date(apod.date)
    if (!apod || apod.date === today.getDate() ) {
        getImageOfTheDay(store)
    }

    // check if the photo of the day is actually type video!
    if (apod.media_type === "video") {
        return (`
            <p>See today's featured video <a href="${apod.url}">here</a></p>
            <p>${apod.title}</p>
            <p>${apod.explanation}</p>
        `)
    } else {
        return `
            <img src="${apod.image.url}" height="350px" width="100%" />
            <p>${apod.image.explanation}</p>
        `
    }
}

//render the data from the Curiosity Manifest API call 
const ManifestData = () => {
    if (!store.manifest_data) {
      getManifestData(store.selectedRover);
      return "";
    } else {
      return ` 
     
      <div>
        You're viewing information about "${store.selectedRover}":
      </div>

      <div> 
        Launch date:
      </div>
      <div>
        ${store.manifest_data.latest_photos[0].rover.launch_date}
      </div>
      <div> 
        Landing date:
      </div>
      <div>
        ${store.manifest_data.latest_photos[0].rover.landing_date}
      </div> 
      <div> 
      Status:
      </div>
      <div>
        ${store.manifest_data.latest_photos[0].rover.status}
      </div>
      <div>
        Latest Photo, taken on Earth Date ${store.manifest_data.latest_photos[0].earth_date}:
      </div>  
      <img src="${store.manifest_data.latest_photos[0].img_src}" height="350px" width="100%" />
      `;
    }
  };
  
    

// ------------------------------------------------------  API CALLS

// Example API call
const getImageOfTheDay = (state) => {
    let { apod } = state

    fetch(`http://localhost:3000/apod`)
        .then(res => res.json())
        .then(apod => updateStore(store, { apod }))
}

// getting the manifest data from the backend
const getManifestData = (rover) => {
    const manifestData = fetch(`http://localhost:3000/manifest_data_${rover}`)
      .then((res) => res.json())
      .then((res) =>
        updateStore(store, {
          manifest_data: res.manifest_data,
        })
      )
      .then(() => console.log(store));
  };

// listening for the selection of a rover
const SelectRover = (rover) =>  {
      updateStore(store, {
        selectedRover: rover,
      });
      console.log("I selected this rover");
      console.log(store);
}
