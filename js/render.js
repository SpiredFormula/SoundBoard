

let Number = 0;
let PlayBackDevice = 0;
let plays = 0;
let Mute = false;
let Files;
function PlaySound(sound, DeviceNumber, PlayBackDevice) {
  if (plays === 0) {
    document.getElementById("sounds").innerHTML = "";
  }

  let audio = document.createElement("audio");
  audio.className = "audio";
  audio.src = sound;
  document.getElementById("sounds").appendChild(audio);
  let AudioDevices = window.localStorage.getItem("Devices");
  let AudioIDs = window.localStorage.getItem("IDs");
  AudioDevices = AudioDevices.split(",");
  AudioIDs = AudioIDs.split(",");

  let elements = document.getElementsByClassName("audio");
  for (let i = 0; i < elements.length; i++) {
    elements[i]
      .setSinkId(AudioIDs[DeviceNumber])
      .then(function () {
        console.log(
          "Audio output device attached: " + AudioDevices[DeviceNumber]
        );
        console.log(AudioIDs[DeviceNumber]);
      })
      .catch(function (error) {
        console.log(error);
        console.log(`id: ${AudioIDs[DeviceNumber]}`);
      });
  }
  audio.play();
  if(Mute != true){
    audio = document.createElement("audio");
    audio.className = "audioDefault";
    audio.src = sound;
    document.getElementById("sounds").appendChild(audio);
    AudioDevices = window.localStorage.getItem("Devices");
    AudioIDs = window.localStorage.getItem("IDs");
    AudioDevices = AudioDevices.split(",");
    AudioIDs = AudioIDs.split(",");

    elements = document.getElementsByClassName("audioDefault");
    for (let i = 0; i < elements.length; i++) {
      elements[i]
      .setSinkId(AudioIDs[PlayBackDevice])
      .then(function () {
        console.log("Audio output device attached: " + AudioDevices[PlayBackDevice]);
        console.log(AudioIDs[PlayBackDevice]);
      })
      .catch(function (error) {
        console.log(error);
        console.log(`id: ${AudioIDs[PlayBackDevice]}`);
      });
    }
    audio.play();
  }
  plays++;
}

let Check = () => {
  if (plays != 0) {
    plays = plays - 1;
  }
  setTimeout(Check, 1000);
};
let ChangeDevice = (number) => {
  Number = number;
};
let ChangeDefaultDevice = (number) => {
  PlayBackDevice = number;
};
let loadFiles = () => {
  fetch('./Json/Sounds.json')
  .then((response) => response.json())
  .then((data) => {
    let Sounds = data.Sounds
    Sounds = Sounds.split(",")
    console.log(Sounds.length) 
    for (let i = 0; i < Sounds.length; i++){
      let SoundButton = document.createElement("button")
      SoundButton.addEventListener('click', () =>{
        PlaySound(`./Sounds/${Sounds[i]}`, Number, PlayBackDevice)
      })
      SoundButton.innerText = `${Sounds[i]}`
      document.getElementById("SoundButtons").appendChild(SoundButton)
    }
  })
  .catch(error => console.log(error));
}
let LoadKeyBindSettings = () => {
  fetch('./Json/Sounds.json')
  .then((response) => response.json())
  .then((data) => {
    let Sounds = data.Sounds
    Sounds = Sounds.split(",")
    console.log(Sounds.length) 
    for (let i = 0; i < Sounds.length; i++){
      let SoundDiv = document.createElement("div")
      SoundDiv.innerHTML = `${Sounds[i]} <input id='${Sounds[i]}'><button onclick="window.electronAPI.Key(document.getElementById('${Sounds[i]}').value + ',' + '${Sounds[i]}'); document.getElementById('${Sounds[i]}').value = '';">RegisterKey</button></input>`

      document.getElementById("KeyBinds").appendChild(SoundDiv)
    }
  })
  .catch(error => console.log(error));
}
loadFiles()
LoadKeyBindSettings();

// Find Devices
navigator.mediaDevices
  .enumerateDevices()
  .then((devices) => {
    let AudioDevices = [];
    let AudioIDs = [];
    devices.forEach((device) => {
      if (
        device.kind === "audiooutput" &&
        device.deviceId !== "default" &&
        device.deviceId !== "communications"
      ) {
        AudioDevices.push(device.label);
        AudioIDs.push(device.deviceId);
        window.localStorage.setItem("Devices", AudioDevices.toString());
        window.localStorage.setItem("IDs", AudioIDs.toString());
      }
    });
    let i;
    for (i = 0; i < AudioDevices.length; i++) {
      let deviceName = document.createElement("button");
      deviceName.id = `Device ${i}`;
      deviceName.innerHTML = AudioDevices[i];
      document.getElementById("Dropdown").appendChild(deviceName);
      let number = i;
      document.getElementById(`Device ${i}`).addEventListener("click", () => {
        ChangeDevice(number);
      });
    }
    for (i = 0; i < AudioDevices.length; i++) {
      let deviceName = document.createElement("button");
      deviceName.id = `DefaultDevice ${i}`;
      deviceName.innerHTML = AudioDevices[i];
      document.getElementById("Dropdown2").appendChild(deviceName);
      let number = i;
      document
        .getElementById(`DefaultDevice ${i}`)
        .addEventListener("click", () => {
          ChangeDefaultDevice(number);
        });
    }
  })
  .catch((err) => {
    console.error(`${err.name}: ${err.message}`);
  });

//Dropdown Menu
function dropdown() {
  document.getElementById("Dropdown").classList.toggle("show");
}
function dropdown2() {
  document.getElementById("Dropdown2").classList.toggle("show");
}
window.onclick = function (event) {
  if (!event.target.matches(".dropbtn")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};
document.getElementById("dropdownbut").addEventListener("click", () => {
  dropdown();
});
document.getElementById("dropdown2but").addEventListener("click", () => {
  dropdown2();
});
Check();
//Keybinds
window.electronAPI.Play((_event, value) => {
  PlaySound(value, Number, PlayBackDevice);
  console.log("Playing Sound")
})
let mute = () => {
  if (Mute === false){
    Mute = true
    document.getElementById("Mute").innerText = " X "
  }
  else if (Mute === true){
    Mute = false
    document.getElementById("Mute").innerText = " - "
  }
}
const setButton = document.getElementById('btn')
const titleInput = document.getElementById('title')
setButton.addEventListener('click', () => {
    const key = titleInput.value
    window.electronAPI.Key(key)
});