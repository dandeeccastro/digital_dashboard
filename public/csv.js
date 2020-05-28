document.getElementById('twitch-chat').hidden = true;

const socket = io()

var status = 'standby'

function changeDisplayStatus(title,icon,iframe)
{
	document.getElementById('title').innerHTML = title;

	document.getElementById('icon').src = icon;
	
	if (iframe === true)
		document.getElementById('twitch-chat').hidden = !document.getElementById('twitch-chat')
}

socket.on('update',function(data)
{
	status = data.type;

	if (status == 'twitch')
	{
		console.log('[csv.js] > User is streaming')
		changeDisplayStatus('Streaming','twitch.svg',true);
	}

});
