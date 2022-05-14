// ==UserScript==
// @name         B站红黑名单
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
	var lstPanel,imgSty,tAutoScroll;
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
		name:'BBLst',
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
	var opened=false;

	function furtherLoading()
	{
		initLBox();
		//var transaction=mdb.transact('rid','readwrite');
		//var dbo=transaction.objectStore('rid');
		//dbo.add({id:"23790166", fav:"1"});
	}
	
	var blocked=[];

	function initLBox() {
		if(!lstPanel) {
			lstPanel = doc.createElement('DIV');
			lstPanel.id=LstBoxId;
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
							var lv=5;
							if(e.ctrlKey) {
								lv=3;
							}
							PinRoom(p,-1,lv);
							dbo.put({id:rid,fav:lv});
						} else {
							dbo.put({id:rid,fav:0});
							AddRoomToLstPane(p);
							p.remove();
							blocked.push(p);
						}
						log("撒哟娜拉！", rid, p.getElementsByClassName('Item_QAOnosoB')[0].innerText);
					}
				}
			});
		}
		if(!doc.getElementById(LstBoxId)) {
			lstPanel.className='side-bar-popup-cntr';
			lstPanel.style='bottom: 0px;z-index:111111;overflow-y:scroll;margin: 10px;height:80%; width: 244px;position: fixed;right: 64px;background-color: #fff;margin-right: 16px;border-radius: 8px;box-shadow: 0 6px 12px 0 rgb(106 115 133 / 22%);border: 1px solid #e9eaec;z-index: 9;';
			lstPanel.style.display='none';
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
	
	unsafeWindow.portFav = function(e, lv) {
		e=e.split('\n');
		if(lv) {
			lv = parseInt(lv);
			if(isNaN(lv)) lv=0;
		}
		for(var i=0;i<e.length;i++){
			var rid = /[0-9]+/.exec(e[i])
			if(rid) rid=rid[0];
			if(rid) {
				var fav;
				if(lv) {
					fav = lv;
				} else {
					fav = /"fav":([0-9]+)/.exec(e[i])
					if(fav) fav=fav[1];
				}
				//else fav='0';
				var transaction=mdb.transact('rid','readwrite');
				var dbo=transaction.objectStore('rid');
				if(fav==='0') {
					log('block::'+rid);
					dbo.put({id:rid,fav:0});
				} else if(lv) {
					log(rid, "fav="+lv);
					dbo.put({id:rid,fav:lv});
				} else {
					log(rid, "fav="+fav);
					dbo.add({id:rid,fav:4});
				}
			}
		}
	}
	
	unsafeWindow.restoreBk = function(e) {
		e=e.split('\n');
		var transaction=mdb.transact('rid','readwrite');
		for(var i=0;i<e.length;i++){
			var rid = /[0-9]+/.exec(e[i])
			if(rid) rid=rid[0];
			if(rid) {
				var fav = /"fav":"?([0-9]+)/.exec(e[i])
				if(fav) fav=fav[1];
				else fav='0';
				var dbo=transaction.objectStore('rid');
				if(fav==='0') {
					log('block::'+rid);
					dbo.put({id:rid,fav:0});
				} else {
					log(rid, "fav="+fav);
					dbo.put({id:rid,fav:fav});
				}
			}
		}
	}

	win.addEventListener('keydown', (e)=>{
		if(e.code==='KeyL'){
			initLBox();
			var sty=lstPanel.style; log(sty.display);
			if(sty.display==='none') sty.display='block';
			else sty.display='none';
		}
		else if(e.code==='KeyR'){
			restore(e.shiftKey);
		}
		else if(e.code==='KeyB'){
			if(e.shiftKey)backup();
		}
		else if(e.code==='Digit1' || e.code==='KeyE'){
			if(!opened) {
				openDB(mdb);
				let rawST = unsafeWindow.setTimeout;
				unsafeWindow.setTimeout = function(e, v) { // 关闭视频预览保护GPU降低能耗节能环保
					//log('window.setTimeout', e, v);
				if(e.toString().indexOf('.value=!0}')>=0) return 0;
					return rawST(e,v);
				}
				opened=1;
			}
			if(!imgSty) {
				imgSty = doc.createElement('STYLE');
				imgSty.id='STYNOIMG'
				imgSty.innerText='.Item_3ysKErMC,.index_1YPnvp1L,.index_3cJiJhYT,.blive-avatar-face{display: none;}';
			}
			var toNor = doc.getElementById(imgSty.id);
			if(toNor) {
				imgSty.remove();
				if(tAutoScroll) { // 停止滚动
					clearInterval(tAutoScroll);
					tAutoScroll = 0;
				}
			} else {
				doc.head.appendChild(imgSty);
				if(e.shiftKey || e.code==='KeyE') { // 开始滚动
					tAutoScroll = setInterval(function () {
						window.scrollTo(0, window.scrollY + 50);
					}, 35);
				}
			}
			toScreen();
		}
	});
	
	function toScreen(){
		var e=document.querySelector("#area-tag-list > div.tab__bar-wrap > div:nth-child(2) > div:nth-child(2)");
		if(e)e.click();
	}

	function restore(still){
		var transaction=mdb.transact('rid');
		var dbo=transaction.objectStore('rid');
		let rooms = Array.prototype.slice.call(doc.getElementsByClassName(TopCName));
		var rl=rooms[0].parentElement;
		if(still) {
			for(var i=0;i<blocked.length;i++) {
				var p = blocked[i];
				tintRoom(p, 0);
				p.style.display='unset';
				rl.appendChild(p);
			}
			blocked = [];
		}
		for(var i=0;i<rooms.length;i++) {
			let p = rooms[i];
			let idx=i;
			if(p.style.display!=='none') {
				let rid = GetRoomID(p);
				var request=dbo.get(rid+'');
				request.onsuccess=function(e){
					var ret=e.target.result;
					if(ret) {
						//console.log(ret);
						if(still) {
							tintRoom(p, ret.fav||0);
						} else {
							if((ret.fav||0)===0) {
								p.style.display='none';
								p.remove();
								AddRoomToLstPane(p);
								blocked.push(p);
								log("安宁哈塞哟！", rid, ret.fav, GetRoomName(p));
							} else {
								PinRoom(p, idx, parseInt(ret.fav)||0);
							}
						}
						
					}
				};
				//break;
			}
		}
		document.body.scrollTop=0;
		toScreen();
		var toNor = doc.getElementById(imgSty.id);
		if(toNor) {
			setTimeout(()=>{
				toNor.remove();
				clearInterval(tAutoScroll);
				document.body.scrollTop=0;
			},200)
		}
	}
	//restore();

	var PinIdx = [0,0,0];
	
	function GetRoomName(p){return p.getElementsByClassName('Item_QAOnosoB')[0].innerText};
	
	function PinRoom(p, idx, lv) {
		log('PinRoom lv=', GetRoomName(p), lv);
		tintRoom(p, lv);
		var PLv; // 0=lv5 顶级; 1=lv4 导入; <=3次级 
		if(lv>=5) PLv=0;
		else if(lv>=4) PLv=1;
		else PLv=2;
		// 导入 置后 
		if(lv==4) PLv=2;
		else if(lv==3) PLv=1;
		var roomLst = p.parentElement;
		if(idx<0)idx = Array.prototype.indexOf.call(roomLst.children,p);
		if(idx>=0&&idx<=PinIdx[2]) return;
		p.remove();
		roomLst.insertBefore(p, roomLst.childNodes[PinIdx[PLv]]);
		for(var i=PLv;i<3;i++) PinIdx[i]++;
	}
	
	function tintRoom(p, lv) {
		p.style.backgroundColor=lv>=5?'#f699b4':(lv>=4?'#fad4d7':(lv>=1?'#fee8fd':"#000"));
	}
	
	function AddRoomToLstPane(p) {
		if(p.className===TopCName){
			var lnkNmn = p.getElementsByClassName(LnkCName)[0].cloneNode(false);
			var mingPian = p.getElementsByClassName(NmnCName)[0].cloneNode(true);
			lnkNmn.appendChild(mingPian);
			log(p);
			lstPanel.prepend(lnkNmn);
			lnkNmn.style='height: auto;';
			mingPian.getElementsByClassName('Item_1Cr59yf9')[0].style.display='inline-block';
			mingPian.getElementsByClassName('Item_1Cr59yf9')[0].style='width:auto;display:inline-block;';
			mingPian.getElementsByClassName('Item_29AwQRu5')[0].style='display: none;';
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
		e = e.srcElement.parentElement;
		if(e) {
			var title=e.getAttribute('title');
			if(title==='直播间'||title==='开播设置') {
				restore();
			}
		}
	});

	function dumpBackup(data) {
		data = JSON.stringify(data);
		var urlObject = window.URL || window.webkitURL || window
		var export_blob = new Blob([data])
		var save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a')
		save_link.href = urlObject.createObjectURL(export_blob)
		save_link.download = "BBLst.txt"
		fakeClick(save_link)
	}
	function fakeClick(obj) {
	  var ev = document.createEvent('MouseEvents')
	  ev.initMouseEvent('click', true, false, unsafeWindow, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
	  obj.dispatchEvent(ev)
	}

	function backup() {
		let vals=[];
		var transaction=mdb.transact('rid','readonly');
		var dbo=transaction.objectStore('rid');
		var requsor = dbo.openCursor();
		requsor.onsuccess = function (event){
			if (event.target.result){
				vals.push(event.target.result.value);
				event.target.result['continue']();
			}
		};
		transaction.oncomplete = function (event) {
			//log(vals);
			dumpBackup(vals);
		};
	}
}

})();