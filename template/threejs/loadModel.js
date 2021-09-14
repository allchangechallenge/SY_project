
//// 測試使用 FBX model
class LoadRootModel{
    constructor(){
        let aScene = document.getElementsByTagName( 'a-scene' )[ 0 ] ;   

        let self = this;

        this.loadGLTFModel = function(){

            let pRoot = new Promise( function( rootResolve, reject ){
                
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
    
                function  onASceneLoaded(){
    
                    let gltfLoader = new THREE.GLTFLoader();
    
                    let dracoLoader = new THREE.DRACOLoader();
                    dracoLoader.setDecoderPath( '/template/draco/' );
                    gltfLoader.setDRACOLoader( dracoLoader );
    
                    gltfLoader.load( '/source/model/Songyan_0913.glb' , function ( gltf ) {
                        console.log('loadModel.js: gltfLoader load ' , gltf );
                        let object = gltf.scene;
    
                        let root = document.createElement( 'a-entity' ) ; 
                        root.setAttribute('id', 'root');
    
                        // let mixer = new THREE.AnimationMixer( object );
                        // const action = mixer.clipAction( object.animations[ 0 ] );
                        // action.play();
    
                        object.traverse( function ( child ) {
    
                            if ( child.isMesh ) {

                                child.material.roughness = 1;
                                child.material.metalness = 0;

                                
                                // child.castShadow = true;
                                // child.receiveShadow = true;
                                if (child.name == 'Songyan_logo' || child.name == 'baroque garden_1' ){
                                    child.material.depthTest = true;
                                    child.material.depthWrite = false;
                                    child.material.needsUpdate = true;
                                }
    
                                if (child.name == 'Songyan_base_1'){
                                    child.renderOrder = 1;
                                    child.material.depthWrite = false;
                                    child.material.needsUpdate = true;
                                }
    
                                if (child.name == 'Tobacco_base&top001_1' ){
                                    //// 退後一層
                                    child.renderOrder = -1;
                                }

                                if (child.name == 'Tobacco_base&top001_0'){
                                    let cm = child.material.clone();
                                    let fm = new THREE.MeshPhongMaterial({ map: cm.map, name: cm.name,  });
                                    child.material = fm;

                                }

    
                            }
    
                        } );
    
                        // root.object3D.traverse(function(c){ if(c.isMesh ){ console.log(c.name ) }})
                        // root.object3D.traverse(function(c){ if(c.isMesh ){ console.log(  c.name, c.material.name ) }})
                        // root.object3D.traverse(function(c){ if(c.isMesh ){ if ( c.name == 'Songyan_base_1' ){ window.a = c } }})
    
                        // root.object3D.traverse(function(c){ if(c.isMesh ){ if ( c.material.name.toLowerCase() == 'songyan_base' ){ console.log(c.name) } }})
    
                        //// 大小位置真的很怪
                        root.object3D.scale.set(0.5,0.5, 0.5);
                        root.object3D.position.set( 0, 0, 0 );
    
                        root.object3D.add(object);                    
                        homeModel.appendChild(root);

                        //// 燈光部份
                        //// 下方往上打方向光
                        let dlight1 = document.createElement("a-entity");
                        // let dlight1 = document.createElement("a-light");
                        dlight1.setAttribute("id", "dlight1");
                        dlight1.setAttribute("position" , " 0 -5 0" );
                        dlight1.setAttribute("rotation" , " -30 0 160" );
                        homeModel.appendChild(dlight1);
                        dlight1.addEventListener("loaded", function (){
                            let dl1 = new THREE.DirectionalLight( 0xf8f4e4, 2 );
                            dlight1.object3D.add(dl1);

                            let t1 = new THREE.Object3D();
                            dl1.target = t1;
                            dlight1.object3D.add( t1 );  

                            dlight1.object3D.children[0];

							const sphereSize = 1;
							const dlight1Helper = new THREE.DirectionalLightHelper( dl1, sphereSize );
                            homeModel.object3D.add( dlight1Helper );                            
                        });
                        
                        //// 近乎正上方往下打方向光
                        let dlight2 = document.createElement("a-entity");
                        dlight2.setAttribute("id", "dlight2");
                        dlight2.setAttribute("position" , " 0 7 0" );
                        dlight2.setAttribute("rotation" , " 20 0 -30" );
                        homeModel.appendChild(dlight2);
                        dlight2.addEventListener("loaded", function (){
                            let dl2 = new THREE.DirectionalLight( 0xfffac7, 0.4 );
                            dlight2.object3D.add(dl2);
                            let t2 = new THREE.Object3D();
                            dl2.target = t2;
                            dlight2.object3D.add( t2 );  

                            // dlight2.object3D.children[0];

							const sphereSize = 1;
							const dlight2Helper = new THREE.DirectionalLightHelper( dl2, sphereSize );
                            homeModel.object3D.add( dlight2Helper );                            
                        });
                        
                        // //// 近乎正上方往下打方向光
                        let dlight3 = document.createElement("a-entity");
                        dlight3.setAttribute("id", "dlight3");
                        dlight3.setAttribute("position" , " -15 5 0" );
                        dlight3.setAttribute("rotation" , " 0 0 80" );
                        homeModel.appendChild(dlight3);
                        dlight3.addEventListener("loaded", function (){
                            let dl3 = new THREE.DirectionalLight( 0xfffbca, 0.7 );
                            dlight3.object3D.add(dl3);

                            let t3 = new THREE.Object3D();
                            dl3.target = t3;
                            dlight3.object3D.add( t3 );  

							const sphereSize = 1;
							const dlight3Helper = new THREE.DirectionalLightHelper( dl3, sphereSize );
                            homeModel.object3D.add( dlight3Helper );                            
						});


                        console.log('loadModel.js: root  ' , root.object3D );
                        rootResolve(root);
    
                    });
    
                }
    
            });

            return pRoot;
        }

    }

}

let loadRootModel = new LoadRootModel();