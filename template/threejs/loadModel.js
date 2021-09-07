
//// 測試使用 FBX model
class LoadFBXModel{
    constructor(){
        let aScene = document.getElementsByTagName( 'a-scene' )[ 0 ] ;   

        if (aScene.hasLoaded ){
            console.log('loadModel.js: aScene 0 ' , aScene );

            onASceneLoaded();

        }else{
            aScene.addEventListener('loaded', loaded );

            function loaded(){
                console.log('loadModel.js: aScene 1 ' , aScene );
                onASceneLoaded();
                aScene.removeEventListener('loaded', loaded );
            }   
        }

        function onASceneLoaded(){
            let fbxLoader = new THREE.FBXLoader();
            fbxLoader.load( '/source/model/FBX/Songyan_0903.FBX', function ( object ) {

                console.log('loadModel.js: fbxLoader load ' , object );

                let root = document.createElement( 'a-entity' ) ; 
                root.setAttribute('id', 'root');

                // let mixer = new THREE.AnimationMixer( object );

                // const action = mixer.clipAction( object.animations[ 0 ] );
                // action.play();

                object.traverse( function ( child ) {

                    if ( child.isMesh ) {

                        child.castShadow = true;
                        child.receiveShadow = true;

                    }

                } );

                //// 大小位置真的很怪
                root.object3D.scale.set(0.005,0.005, 0.005);
                root.object3D.position.set( 0, 0, 0 );

                // root.object3D.scale.set(0.05,0.05, 0.05);
                // root.object3D.position.set( 0, -50, 0 );

                root.object3D.add(object);
                console.log('loadModel.js: root  ' , root.object3D );
            
                aScene.appendChild(root);

            } );
        }
    }

}

let loadFBXModel = new LoadFBXModel();