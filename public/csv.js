// Instanciate socket client
const socket = io()

// Type of activity template constant
const types = 
{
	twitch: 
	{
		message:"Streaming",
		elemColor:"#673ab7",
		imageFile:"twitch.svg",
	},
	coding:
	{
		message:"Coding",
		elemColor:"#d1e7ff",
		imageFile:"coding.png",
	},
	resting:
	{
		message:"Resting",
		elemColor:"#57a4ff",
		imageFile:"standby.svg",
	},
	gaming:
	{
		message:"Gaming",
		elemColor:"	#dedede",
		imageFile:"gaming.png",
	},
	working:
	{
		message:"Working",
		elemColor:"#2bdb83",
		imageFile:"working.png",
	}
}

// Initializing vue variables for further manipulation
var display = 
{
	title: new Vue(
	{
		el: "#title",
		data:{
			message: types.resting.message,
			elemColor: types.resting.elemColor,
		}
	}),
	
	icon: new Vue(
	{
		el: "#icon",
		data: {
			imageFile: types.resting.imageFile,
		}
	}),

}

function alterDisplay(data)
{
	display.title.message = data.message;
	display.title.elemColor = data.elemColor;
	display.icon.imageFile = data.imageFile;
}

// Listen to update event and change display accordingly
socket.on('update',function(data)
{
	var state = data.type;

	// If status is zero, state must change to resting, regardless of type
	if (data.status == 0)
		alterDisplay(types.resting)

	// If status is 1, we change view state based on type
	else
	{
		if (state === 'twitch')
			alterDisplay(types.twitch)
		else if (state === 'gaming')
			alterDisplay(types.gaming)
		else if (state === 'coding')
			alterDisplay(types.coding)
		else if (state === 'working')
			alterDisplay(types.working)
		else
			console.log('[csv.js] > Poorly sent request, unrecognized state');
	}

});
