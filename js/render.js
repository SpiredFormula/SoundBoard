let Number = 0;
let PlayBackDevice = 0;
let plays = 0;
let Mute = false;
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
// Sound Events get rid of this
document.getElementById("dropdownbut").addEventListener("click", () => {
  dropdown();
});
document.getElementById("dropdown2but").addEventListener("click", () => {
  dropdown2();
});
document.getElementById("vineboom").addEventListener("click", () => {
  PlaySound("./Sounds/vine boom.mp3", Number, PlayBackDevice);
});
document.getElementById("AMONGuS").addEventListener("click", () => {
  PlaySound("./Sounds/AMONG US.mp3", Number, PlayBackDevice);
});
document.getElementById("fart").addEventListener("click", () => {
  PlaySound("./Sounds/fart.mp3", Number, PlayBackDevice);
});
document.getElementById("AGHHHH").addEventListener("click", () => {
  PlaySound("./Sounds/AGHHHHHHH.mp3", Number, PlayBackDevice);
});
document.getElementById("BRAIN").addEventListener("click", () => {
  PlaySound("./Sounds/BRAIN FART.mp3", Number, PlayBackDevice);
});
Check();
//Keybinds
window.electronAPI.onUpdateCounter((_event, value) => {
    PlaySound(value, Number, PlayBackDevice);
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