
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
    
                    // let dracoLoader = new THREE.DRACOLoader();
                    // dracoLoader.setDecoderPath( '/template/draco/' );
                    // gltfLoader.setDRACOLoader( dracoLoader );
    
                    let ts;

                    // gltfLoader.load( '/source/model/Songyan_0913.glb' , function ( gltf ) {
                    gltfLoader.load( '/source/model/all_nd_2048.glb' , function ( gltf ) {
                    
                        console.log('loadModel.js: root load ' , gltf );
                        let object = gltf.scene;
    
                        let root = document.createElement( 'a-entity' ) ; 
                        root.setAttribute('id', 'root');
    
                        // let mixer = new THREE.AnimationMixer( object );
                        // const action = mixer.clipAction( object.animations[ 0 ] );
                        // action.play();
    
                        object.traverse( function ( child ) {
    
                            if ( child.isMesh ) {

                                //// 基礎設置
                                child.material.roughness = 1;
                                child.material.metalness = 0;
                                child.material.blending = THREE.NoBlending;

                                // child.castShadow = true;
                                // child.receiveShadow = true;
                                if (child.name == 'Songyan_logo' ){

                                    // let cm = child.material.clone();
                                    // let nm = new THREE.MeshBasicMaterial({ name: cm.name, skinning: cm.skinning, map: cm.map, transparent: cm.transparent });

                                    // child.material = nm;

                                    child.material.depthTest = true;
                                    child.material.depthWrite = false;
                                    child.material.needsUpdate = true;
                                    child.material.blending = THREE.NormalBlending;
                                    child.material.opacity = 2.5;

                                }

                                //// 場景基底
                                if (child.name == 'Songyan_base_0'){
                                    child.material.depthTest = true;
                                    child.material.depthWrite = false;
                                    child.material.needsUpdate = true;
                                    child.renderOrder = 1; //// 確保「最後畫」呈現在最前面
                                    // child.material.blending = THREE.NormalBlending;
                                }

                                //// 花園主體，包含裝飾
                                if (child.name == 'baroque garden_0'){
                                    // child.material.depthTest = true;
                                    // child.material.depthWrite = false;
                                    // child.material.needsUpdate = true;
                                    // child.renderOrder = 1; //// 確保「最後畫」在「基底」之上
                                    child.material.blending = THREE.NormalBlending;
                                }

                                //// 花園草皮
                                if (child.name == 'baroque garden_1'){
                                    child.material.depthTest = true;
                                    child.material.depthWrite = false;
                                    child.material.needsUpdate = true;
                                    child.renderOrder = 3; //// 在「花園主體」/「花園磁磚地板」之上
                                    child.material.blending = THREE.NormalBlending;
                                }
    
                                //// 花園磁磚地板
                                if (child.name == 'baroque garden_2'){
                                    child.material.depthTest = true;
                                    child.material.depthWrite = false;
                                    child.material.needsUpdate = true;
                                    child.renderOrder = 2; //// 在「花園主體」之上
                                    child.material.blending = THREE.NormalBlending;
                                }
                                
                                //// 水池
                                if (child.name == 'Songyan_base_1'){
                                    child.renderOrder = 2;
                                    child.material.depthTest = true;
                                    child.material.depthWrite = false;
                                    child.material.needsUpdate = true;
                                }
    
                                //// 辦公室基底，由於要陰影，所以後畫
                                if (child.name == 'base_1' ){
                                    child.renderOrder = 3;
                                    child.material.depthTest = true;
                                    child.material.depthWrite = false;
                                    child.material.needsUpdate = true;
                                    // child.material.blending = THREE.NormalBlending;
                                }

                                //// 主建築基底
                                if (child.name == 'Tobacco_base&top001_1'){
                                    child.renderOrder = 2;
                                    child.material.depthTest = true;
                                    child.material.depthWrite = false;
                                    child.material.needsUpdate = true;
                                }

                                //// 鋼鐵材質： Tobacco_base_steel

                                if (child.name == 'Tobacco_base&top001_0' || child.name == 'chimney_0' ||  child.name == 'family_mart_2' ||  child.name == 'Warehouse_01_2' ||  child.name == 'Warehouse_02_2' ||  child.name == 'Warehouse_01_0' ||  child.name == 'Liuli_1' ||  child.name == 'bookmart_1' ||  child.name == 'Check room_1'  ){
                                    // let cm = child.material.clone();
                                    // let fm = new THREE.MeshPhongMaterial({ map: cm.map, name: cm.name,  });
                                    // child.material = fm;

                                    child.material.metalness = 0.074;
                                    child.material.roughness = 0.6;
                                    
                                }

                                //// 玻璃材質 
                                let mg = ['family_mart_1' , 'Boiler_1' , 'Check room_2', 'Warehouse_02_1', 'Liuli_2', 'bookmart_2', 'Tobacco_base&top001_2', 'front001_1' , 'wash room001_1' , 'outside001_1', 'inside house001_1', 'back001_1', 'side_1' , 'building1_1', 'wall_1' ];
                                mg.forEach( e => {
                                    if ( child.name == e ){
                                        child.material.metalness = 0.7;
                                        child.material.roughness = 0.25;
                                    }
                                })

                                /// 半透明材質 
                                let mhg = ['Warehouse_02_3'];
                                mhg.forEach( e => {
                                    if ( child.name == e ){

                                        child.material.depthWrite = false;
                                        child.material.blending = THREE.CustomBlending;
                                        child.material.blendEquation = THREE.AddEquation;
                                        child.material.blendSrc = THREE.OneFactor;
                                        child.material.blendDst = THREE.OneMinusSrcAlphaFactor;
                                        child.material.blendSrcAlpha = THREE.OneFactor;
                                        child.material.blendDstAlpha = THREE.OneMinusSrcAlphaFactor;
                                        child.material.transparent = true;
                                        child.material.opacity = 0.5;

                                        child.material.metalness = 0.7;
                                        child.material.roughness = 0.25;

                                    }
                                })
    
                            }
    
                        } );
    
                        // root.object3D.traverse(function(c){ if(c.isMesh ){ console.log(c.name ) }})
                        // root.object3D.traverse(function(c){ if(c.isMesh ){ console.log(  c.name, c.material.name ) }})
                        // root.object3D.traverse(function(c){ if(c.isMesh ){ if ( c.name == 'Tobacco_base&top001_1' ){ window.a = c } }})
                        // root.object3D.traverse(function(c){ if(c.isMesh ){ if ( c.name == 'Songyan_base_1' ){ window.b = c } }})
    
                        // root.object3D.traverse(function(c){ if(c.isMesh ){ if ( c.material.name.toLowerCase() == 'songyan_base' ){ console.log(c.name) } }})
    
                        //// 大小位置真的很怪
                        root.object3D.scale.set(0.5,0.5, 0.5);
                        root.object3D.position.set( 0, 0, 0 );
    
                        root.object3D.add(object);                    
                        homeModel.appendChild(root);

                        //// 遮擋用地板 ，讓模型的部份物件不會因為 depthWrite(false)而顯露
                        let ground = document.createElement('a-entity');
                        ground.setAttribute('id', 'ground');
                        ground.addEventListener("loaded", function (){

                            let geometry = new THREE.BoxGeometry( 1, 1, 1 );
                            let material = new THREE.MeshBasicMaterial( { color: 0x858585 } );
                            let go = new THREE.Mesh( geometry, material );
                            go.scale.set(33, 0.4, 20.5 );
                            go.position.set( -0.25 , 0.25, 0);
                            ground.object3D.add( go );

                        });

                        homeModel.appendChild(ground);

                        //// 燈光部份
                        //// 下方往上打方向光
                        let dlight1 = document.createElement("a-entity");
                        // let dlight1 = document.createElement("a-light");
                        dlight1.setAttribute("id", "dlight1");
                        dlight1.setAttribute("position" , " 0 -5 0" );
                        dlight1.setAttribute("rotation" , " -30 0 160" );
                        homeModel.appendChild(dlight1);
                        dlight1.addEventListener("loaded", function (){
                            let dl1 = new THREE.DirectionalLight( 0xf8f4e4, 1 );
                            dlight1.object3D.add(dl1);

                            let t1 = new THREE.Object3D();
                            dl1.target = t1;
                            dlight1.object3D.add( t1 );  

                            dlight1.object3D.children[0].intensity;

							// const sphereSize = 1;
							// const dlight1Helper = new THREE.DirectionalLightHelper( dl1, sphereSize );
                            // homeModel.object3D.add( dlight1Helper );                            
                        });
                        
                        // //// 近乎正上方往下打方向光
                        let dlight2 = document.createElement("a-entity");
                        dlight2.setAttribute("id", "dlight2");
                        dlight2.setAttribute("position" , " 0 7 0" );
                        dlight2.setAttribute("rotation" , " 20 0 -30" );
                        homeModel.appendChild(dlight2);
                        dlight2.addEventListener("loaded", function (){
                            let dl2 = new THREE.DirectionalLight( 0xfffAC7, 0.2 );
                            dlight2.object3D.add(dl2);
                            let t2 = new THREE.Object3D();
                            dl2.target = t2;
                            dlight2.object3D.add( t2 );  

                            // dlight2.object3D.children[0].intensity;

							// const sphereSize = 1;
							// const dlight2Helper = new THREE.DirectionalLightHelper( dl2, sphereSize );
                            // homeModel.object3D.add( dlight2Helper );                            
                        });
                        
                        // // //// 近乎右方往左打方向光
                        let dlight3 = document.createElement("a-entity");
                        dlight3.setAttribute("id", "dlight3");
                        dlight3.setAttribute("position" , " -15 5 0" );
                        dlight3.setAttribute("rotation" , " 0 0 80" );
                        homeModel.appendChild(dlight3);
                        dlight3.addEventListener("loaded", function (){
                            let dl3 = new THREE.DirectionalLight( 0xfffbca, 0.2 );
                            dlight3.object3D.add(dl3);

                            let t3 = new THREE.Object3D();
                            dl3.target = t3;
                            dlight3.object3D.add( t3 );  

                            // dlight3.object3D.children[0].intensity;

							// const sphereSize = 1;
							// const dlight3Helper = new THREE.DirectionalLightHelper( dl3, sphereSize );
                            // homeModel.object3D.add( dlight3Helper );                            
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