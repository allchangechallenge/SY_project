
//// 測試使用 FBX model
class CameraViewControl{
    constructor(){
        let aScene = document.getElementsByTagName( 'a-scene' )[ 0 ] ;   

        if (aScene.hasLoaded ){
            console.log('cameraSceneControl.js: aScene 0 ' , aScene );

            onASceneLoaded();

        }else{
            aScene.addEventListener('loaded', loaded );

            function loaded(){
                console.log('cameraSceneControl.js: aScene 1 ' , aScene );
                onASceneLoaded();
                aScene.removeEventListener('loaded', loaded );
            }   
        }

        function onASceneLoaded(){
            console.log("cameraSceneControl.js: _onASceneLoaded: ");


        }
    }

    setAndshowTags( bn ){

        let self = this;

        if ( bn.getAttribute('id') == 'button2-1-hover' ){
            
            // let tag360s = document.getElementsByClassName('tag360');
            // for(let i = 0; i < tag360s.length; i++ ){
            //     tag360s[i].style.visibility = 'visible';
            // }

            let b_tag = document.getElementById('b_tag');
            let y_tag = document.getElementById('y_tag');
            let r_tag = document.getElementById('r_tag');
            let p_tag = document.getElementById('p_tag');
            
            //// 顯示出全螢幕遮罩
            let tline = gsap.timeline();
            tline.set(sceneMaskDiv, {visibility: 'visible'});

            let camOP = cam.object3D.children[0].position.clone();
            let camFP = new THREE.Vector3( 12 , 19 , 18 ); 

            tline.to(gsapEmpty, {
                duration: 1,
                onUpdate:function(){
                    
                    let dp = camFP.clone().sub(camOP);
                    let qp = camOP.clone().add( dp.multiplyScalar( this._time/1 ) );
                    
                    cam.object3D.children[0].position.copy(qp);

                },
                onComplete: function(){
                    //// 完成位移後，關閉控制
                    // cam.setAttribute( 'orbit-controls', 'enabled : false' ) ;

                    //// 計算 3D 場景內部的特定點，在2D 的位置
                    
                    set3Dto2D( b_tag , b_cube );
                    set3Dto2D( y_tag , y_cube );
                    set3Dto2D( r_tag , r_cube );
                    set3Dto2D( p_tag , p_cube );

                    function set3Dto2D( div2D, obj3D ){
                        let point3D = new THREE.Vector3() ;
                        let point2D = new THREE.Vector2() ; 

                        point3D = obj3D.object3D.position.clone();
                        point3D.project( aScene.camera ) ;
                        point2D.x = Math.round( ( 0.5 + point3D.x / 2 ) * ( aScene.canvas.width / window.devicePixelRatio ) ) ;
                        point2D.y = Math.round( ( 0.5 - point3D.y / 2 ) * ( aScene.canvas.height / window.devicePixelRatio ) ) ;
                        div2D.style.top = point2D.y + 'px';
                        div2D.style.left = point2D.x + 'px';
                        div2D.innerText = '';
                    }

                }
            });

            tline.set('.tag360', {visibility: 'visible'});
            tline.set(sceneMaskDiv, {visibility: 'hidden'});


        }
        if ( bn.getAttribute('id') == 'button2-2-hover' ){
            
        }


    }


}

let cameraViewControl = new CameraViewControl();