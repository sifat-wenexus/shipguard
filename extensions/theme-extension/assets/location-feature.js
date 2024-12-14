

document.addEventListener('DOMContentLoaded', () => {
 const geoLocation= window.WeNexusShipGuardPackageProtectionSettings.geoLocation
  if(geoLocation?.length===0) return;
  fetch('https://ipinfo.io/json?token=08cc4efb8924c2')
    .then((response) => response.json())
    .then((data) => {
      if(window) window.wenexusUserLocation = data;
    })
    .catch((error) => console.log('Error detecting location:', error));
});


