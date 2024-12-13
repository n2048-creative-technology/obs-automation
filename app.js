import { OBSWebSocket } from 'obs-websocket-js';

const obs = new OBSWebSocket();

let sceneNames=[
    "Scene 2",
    "Scene 3",
    "Scene 4",
    "blackmagic",
];

function getRandomScene() {
    const randomIndex = Math.floor(Math.random() * sceneNames.length);
    return sceneNames[randomIndex];
}


async function openOBSPreview() {
     try {
        // Connect to OBS WebSocket
        await obs.connect('ws://localhost:4455', '12345678');
        console.log('Connected to OBS WebSocket.');

        await obs.call('OpenVideoMixProjector', {
            videoMixType: 'OBS_WEBSOCKET_VIDEO_MIX_TYPE_PROGRAM', // For the Program view
            //monitor: 2, 
            projectorGeometry: "AdnQywADAAAAAAeKAAAAAAAADiAAAAO1AAAHgAAAAAAAAA4qAAADvwAAAAIABAAABqsAAAeAAAAAAAAADioAAAO/"
        });

     // Disconnect from OBS
        await obs.disconnect();
        console.log('Disconnected from OBS WebSocket.');

    } catch (err) {
        console.error('Error:', err);
    }
}

async function connectToOBS() {
    try {
        // Connect to OBS WebSocket
        await obs.connect('ws://localhost:4455', '12345678');
        console.log('Connected to OBS WebSocket.');

        // Send the OpenProjector request

        let response = null;

        response = await obs.call('GetSceneList', {});

        sceneNames = response.scenes.map(s=>s.sceneName);

        let currentScene = response.currentProgramSceneName;
        let nextScene = getRandomScene();

        while(nextScene === currentScene){
            nextScene = getRandomScene();
        }

        // response = await obs.call('GetHotkeyList', {});
        // console.log(response);

    	 // Change the scene to "Scene 4"
    	await obs.call('SetCurrentProgramScene', {
            sceneName: nextScene,
        });


        // Disconnect from OBS
        await obs.disconnect();
        console.log('Disconnected from OBS WebSocket.');
    } catch (err) {
        console.error('Error:', err);
    }
}

setTimeout(openOBSPreview, 1000);

setTimeout(connectToOBS, 2000);

setInterval(connectToOBS,3000);

//while(1) true;

