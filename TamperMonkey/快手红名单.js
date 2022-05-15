// ==UserScript==
// @name         快手红名单
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://live.bilibili.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        unsafeWindow
// ==/UserScript==

(function() {
    'use strict';

var log = console.log;

var url=location.href, pass=url.startsWith('p/', 26) && !url.startsWith('p/html/',26)
	|| url.startsWith('p/all', 26);
//log("小姐姐我来啦！", pass, url);
if(pass)
{
	var TopCName='index_3Uym8ODI';
	var NmnCName='Item_2onI5dXq';
	var LnkCName='Item_1EohdhbR';
	var LstBoxId='SideLstPane';
	var lstPanel,imgSty;
	let win=window,doc=document;
	function openDB (dao) {
		var request=win.indexedDB.open(dao.name, dao.version || 1);
		request.onerror=function(e){
			log('Open Error!');
		};
		request.onsuccess=function(e){
			dao.db=e.target.result;
			//log(dao.db.version);
			furtherLoading();
		};
		request.onupgradeneeded=function(e){
			var db=e.target.result;
			if(!db.objectStoreNames.contains('rid')){
				db.createObjectStore('rid',{keyPath:"id"});
			}
			console.log('DB version changed to '+dao.version);
		};
	}

	var mdb={
		name:'FavLst',
		version:2,
		db:null,
		transact:function(e,v) {
			try {
				return this.db.transaction(e,v);
			} catch(err){
				log(err);
				openDB(mdb);
			}
			return 0;
		}
	};
	openDB(mdb);

	function furtherLoading()
	{
		initLBox();
		//var transaction=mdb.transact('rid','readwrite');
		//var dbo=transaction.objectStore('rid');
		//dbo.add({id:"23790166", fav:"1"});
	}

	function initLBox() {
		if(!lstPanel) {
			lstPanel = doc.createElement('DIV');
			lstPanel.id=LstBoxId;
			lstPanel.style.display='none';
			win.addEventListener('mousedown', (e)=>{
				if(e.button===2) {
					//log(e.srcElement);
					var p=FindRoomTopElement(e.srcElement);
					if(p) {
						e.preventDefault();
						var rid=GetRoomID(p);
						var transaction=mdb.transact('rid','readwrite');
						var dbo=transaction.objectStore('rid');
						if(e.shiftKey) {
							PinRoom(p,-1);
							dbo.add({id:rid,fav:5});
						} else {
							dbo.add({id:rid});
							AddRoomToLstPane(p);
							p.remove();
						}
						log("撒哟娜拉！", rid, p.getElementsByClassName('Item_QAOnosoB')[0].innerText);
					}
				}
			});
		}
		if(!doc.getElementById(LstBoxId)) {
			lstPanel.className='side-bar-popup-cntr';
			lstPanel.style='bottom: 0px;z-index:111111;overflow-y:scroll;margin: 10px;height:80%; width: 244px;position: fixed;right: 64px;background-color: #fff;margin-right: 16px;border-radius: 8px;box-shadow: 0 6px 12px 0 rgb(106 115 133 / 22%);border: 1px solid #e9eaec;z-index: 9;';
			var sideBar = doc.getElementsByTagName('live-sidebar')[0];
			if(!sideBar) {
				sideBar=doc.getElementsByTagName('aside')[0];
				if(sideBar)sideBar=sideBar.parentElement;
			}
			//log(sideBar);
			lstPanel.remove();
			if(sideBar)sideBar.appendChild(lstPanel);
			var xyz=lstPanel.getElementsByClassName('group-wrap')[0];
			if(xyz)xyz.remove();
		}
	}
	
	unsafeWindow.portFav = function(e) {
		e=e.split('\n');
		for(var i=0;i<e.length;i++){
			var rid = /[0-9]+/.exec(e[i])
			if(rid) rid=rid[0];
			if(rid) {
				log(rid);
				var transaction=mdb.transact('rid','readwrite');
				var dbo=transaction.objectStore('rid');
				dbo.add({id:rid,fav:2});
			}
		}
	}

	let rawST = unsafeWindow.setTimeout;
	unsafeWindow.setTimeout = function(e, v) { // 关闭视频预览保护GPU降低能耗节能环保
		//log('window.setTimeout', e, v);
		if(e.toString().indexOf('L.value=!0')>=0) return 0;
		return rawST(e,v);
	}
	
	win.addEventListener('keydown', (e)=>{
		if(e.code==='KeyL'){
			initLBox();
			var sty=lstPanel.style; log(sty.display);
			if(sty.display==='none') sty.display='block';
			else sty.display='none';
		}
		else if(e.code==='KeyR'){
			restore();
		}
		else if(e.code==='Digit1'){
			if(!imgSty) {
				imgSty = doc.createElement('STYLE');
				imgSty.id='STYNOIMG'
				imgSty.innerText='div.Item_3ysKErMC{display: none;}';
			}
			if(!doc.getElementById(imgSty.id)) {
				doc.head.appendChild(imgSty);
			} else {
				imgSty.remove();
			}
		}
	});
	
	function restore(){
		var transaction=mdb.transact('rid');
		var dbo=transaction.objectStore('rid');
		let rooms = Array.prototype.slice.call(doc.getElementsByClassName(TopCName));
		for(var i=0;i<rooms.length;i++) {
			let p = rooms[i];
			let idx=i;
			if(p.style.display!=='none') {
				var rid = GetRoomID(p);
				var request=dbo.get(rid+'');
				request.onsuccess=function(e){
					var ret=e.target.result;
					if(ret) {
						//console.log(ret);
						if(ret.fav==undefined) {
							p.style.display='none';
							p.remove();
							AddRoomToLstPane(p);
							log("安宁哈塞哟！", rid, ret.fav, p.getElementsByClassName('Item_QAOnosoB')[0].innerText);
						} else {
							PinRoom(p, idx);
						}
					}
				};
				//break;
			}
		}
	}
	//restore();

	var PinIdx = 0;
	
	function PinRoom(p, idx) {
		var roomLst = p.parentElement;
		if(idx<0)idx = Array.prototype.indexOf.call(roomLst.children,p);
		if(idx>=0&&idx<=PinIdx) return;
		p.remove();
		roomLst.insertBefore(p, roomLst.childNodes[PinIdx]);
		PinIdx++;
	}
	
	function AddRoomToLstPane(p) {
		if(p.className===TopCName){
			var lnkNmn = p.getElementsByClassName(LnkCName)[0].cloneNode(false);
			var mingPian = p.getElementsByClassName(NmnCName)[0].cloneNode(true);
			lnkNmn.appendChild(mingPian);
			log(p);
			lstPanel.appendChild(lnkNmn);
			lnkNmn.style='height: auto;';
			mingPian.getElementsByClassName('index_gbbNOmoH')[0].style.display='inline-block';
			mingPian.getElementsByClassName('Item_1Cr59yf9')[0].style='width:auto;display:inline-block;';
			mingPian.getElementsByClassName('Item_3aYF6_yi')[0].style='display: none;';
		}
	}

	function FindRoomTopElement(p) {
		while(p) {
			if(p.className===TopCName){
				return p;
			}
			p=p.parentElement;
		}
		return 0;
	}

	function GetRoomID(p) {
		var lnk = p.getElementsByClassName(LnkCName)[0];
		lnk=lnk.href;
		return /[0-9]+/.exec(lnk)[0];
	}

	win.addEventListener('mousedown', (e)=>{
		var title=e.srcElement.parentElement.getAttribute('title');
		if(title==='直播间'||title==='开播设置') {
			restore();
		}
	});

}

})();