// Example code for loading text in aFrame
this.loadText = function (obj, position, rotation, scale) {
    let anchor = document.createElement('a-entity');
    self.setTransform(anchor, position, rotation, scale);
    anchor.setAttribute("id", obj.obj_id); //// fei add
    self.makarObjects.push(anchor);
    if (obj.behav) {
        anchor.setAttribute('class', "clickable"); //// fei add
    }
    else {
        anchor.setAttribute('class', "unclickable"); //// fei add
    }
    // let textEntity = document.createElement('a-entity');
    // // textEntity.setAttribute("geometry","primitive: plane; width: auto; height: auto; width: auto");
    // // textEntity.setAttribute("material","color: #FFFFFF");
    // // textEntity.setAttribute("text","value: "+obj.content+"; color:red; shader: msdf; font:https://raw.githubusercontent.com/etiennepinchon/aframe-fonts/master/fonts/notosans/NotoSans-Regular.json");
    // // textEntity.setAttribute("text","value: hello; color:red; shader: msdf; font:https://raw.githubusercontent.com/etiennepinchon/aframe-fonts/master/fonts/creepster/Creepster-Regular.json");
    // textEntity.setAttribute("text","value: "+obj.content+"; color:blue; font:font/edukai-4.0-msdf.json");
    // =======================================================================
    let textEntity = document.createElement('a-text');
    textList = obj.content.split('\n');
    let longestSplit = 0;
    const REGEX_CHINESE = /[\u4e00-\u9fff]|[\u3400-\u4dbf]|[\u{20000}-\u{2a6df}]|[\u{2a700}-\u{2b73f}]|[\u{2b740}-\u{2b81f}]|[\u{2b820}-\u{2ceaf}]|[\uf900-\ufaff]|[\u3300-\u33ff]|[\ufe30-\ufe4f]|[\uf900-\ufaff]|[\u{2f800}-\u{2fa1f}]/u;
    const isChinese = (str) => REGEX_CHINESE.test(str);
    for (let i = 0; i < textList.length; i++) {
        textLength = 0;
        for (let j = 0; j < textList[i].length; j++) {
            if (isChinese(textList[i][j])) { // chinese
                textLength += 1.6;
            }
            else if (textList[i][j] == textList[i][j].toUpperCase() && textList[i][j] != textList[i][j].toLowerCase()) { // upper-case
                textLength += 1;
            }
            else if (textList[i][j] == textList[i][j].toLowerCase() && textList[i][j] != textList[i][j].toUpperCase()) { // lower-case
                // textLength += 0.85;
                textLength += 1;
            }
            else if (!isNaN(textList[i][j] * 1)) { //numeric
                textLength += 1;
            }
            else { // other symbols
                textLength += 1.25;
            }
        }
        console.log(textList[i], textLength);
        if (textLength > longestSplit)
            longestSplit = textLength;
    }
    textEntity.setAttribute("value", obj.content);
    textEntity.setAttribute("width", longestSplit * 0.08); // 4 for 0.46  per 0.115
    textEntity.setAttribute("wrap-count", longestSplit); // 1 for 1
    textEntity.setAttribute("anchor", "center");
    textEntity.setAttribute("align", "left");
    // textEntity.setAttribute("geometry","primitive:plane; width:auto; height:auto");
    // textEntity.setAttribute("material","opacity: 0");
    textEntity.setAttribute("backcolor", obj.back_color); //// 這邊注意一重點，自己設定的 attribute 不能使用 『大寫英文』，否則aframe data內會找不到，參照 text物件
    textEntity.setAttribute("textcolor", obj.color); //// 暫時沒有用，假如未來文字支援『透明度』功能時候會需要
    textEntity.setAttribute("side", "double");
    // textEntity.setAttribute("font","font/bbttf-msdf.json");
    var fontUrl = "https://s3-ap-northeast-1.amazonaws.com/makar.webar.defaultobject/resource/fonts/";
    fonts = [fontUrl + "1-msdf.json", fontUrl + "2-msdf.json", fontUrl + "3-msdf.json", fontUrl + "4-msdf.json", fontUrl + "5-msdf.json",
    fontUrl + "6-msdf.json", fontUrl + "7-msdf.json", fontUrl + "8-msdf.json", fontUrl + "9-msdf.json", fontUrl + "10-msdf.json",
    fontUrl + "11-msdf.json", fontUrl + "12-msdf.json"];
    // fonts = [ fontUrl + "1-msdf.json" ];
    textEntity.setAttribute("font", fonts);
    textEntity.setAttribute("negate", "false");
    textEntity.setAttribute('crossorigin', 'anonymous');
    let rgb = obj.color.split(",");
    let color = new THREE.Color(parseFloat(rgb[0]), parseFloat(rgb[1]), parseFloat(rgb[2]));
    textEntity.setAttribute("color", "#" + color.getHexString());
    if (obj.behav) {
        textEntity.setAttribute('class', "clickable"); //// fei add
    }
    else {
        textEntity.setAttribute('class', "unclickable"); //// fei add
    }
    // textEntity.setAttribute( "id", obj.obj_id );//// fei add
    // textEntity.setAttribute("makarVRIndex", i ); //// fei add
    // self.setTransform(textEntity, position, rotation, scale);
    // self.makarObjects.push( textEntity );
    textEntity.addEventListener("loaded", function (evt) {
        if (evt.target == evt.currentTarget) {
            setTimeout(function () {
                textEntity.setAttribute("cursor-listener", true); //// fei add
            }, 500);
            let r = new THREE.Vector3();
            r.set(0, Math.PI, 0);
            textEntity.object3D.rotation.setFromVector3(r);
            // textEntity.object3D.children[0].rotation.setFromVector3(r);
            // textEntity.object3D.children[0].position.x = -textEntity.object3D.children[0].position.x;
            textEntity.object3D["makarObject"] = true;
            if (obj.behav) {
                textEntity.object3D["behav"] = obj.behav;
            }
            if (obj.behav_reference) {
                textEntity.object3D["behav_reference"] = obj.behav_reference;
            }
        }
    });
    ///
    anchor.appendChild(textEntity);
    ///
    //20191227-start-thonsha-add
    if (obj.behav_reference) {
        for (let i = 0; i < obj.behav_reference.length; i++) {
            if (obj.behav_reference[i].behav_name != 'PlayAnimation') {
                // textEntity.setAttribute("visible", false);
                // textEntity.setAttribute('class', "unclickable" );
                anchor.setAttribute("visible", false);
                anchor.setAttribute('class', "unclickable");
                break;
            }
        }
    }
    //20191227-end-thonsha-add
    if (obj.obj_parent_id) {
        // textEntity.setAttribute("visible", false);
        // textEntity.setAttribute('class', "unclickable" );
        let timeoutID = setInterval(function () {
            let parent = document.getElementById(obj.obj_parent_id);
            if (parent) {
                if (parent.object3D.children.length > 0) {
                    parent.appendChild(anchor);
                    window.clearInterval(timeoutID);
                }
            }
        }, 1);
    }
    else {
        self.vrScene.appendChild(anchor);
        // self.vrScene.appendChild(textEntity);
    }
};






