// ==UserScript==
// @name         B站红黑名单
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://live.bilibili.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        unsafeWindow
// @grant        GM_xmlhttpRequest
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

	function FFDBC(data, cb){
		// var x = new XMLHttpRequest();
		// x.open('POST', 'http://127.0.0.1:8080/DB.jsp', true);
		// x.responseType = 'json';
		// x.onload = function(e) {
		// 	if(cb) cb(e);
		// };
		// x.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
		// x.send("data="+JSON.stringify(data));
		GM_xmlhttpRequest({
			method: "POST"
			, url: 'http://127.0.0.1:8080/DB.jsp'
			, data:"data="+JSON.stringify(data)
			, onload: function(e) {
				//debug(e);
				if(cb)cb(e);
			}
			, headers : {
				'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
			}
		});
	}

	var FFDB = true;
	function openDB (dao) {
		if(FFDB) {
			FFDBC({table:dao.name, json:{rowId:0,rid:'',fav:0,name:''}, indexed:{rid:1}}
			, function(e){
				dao.ffdbc(true);
				furtherLoading();
			});
		}
		else {
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
	}

	var mdb={
		name:'BBLst'
		,version:2
		,db:null
		,useCache : true
		,ffdb : false
		,ffdbc : function(e) {
			if(e) mdb.ffdb = true;
			else return mdb.ffdb;
		}
		,removed: {}
		,dumped: {}
		,objectStore:function() {
			return mdb.transact().objectStore();
		}
		,transact:function(e,v) {
			//debug('transact', this);
			if(mdb.ffdb) {
				return {
					objectStore : function() {
						return {
							get : function(d, w) {
								if(mdb.cached) {
									var ret = mdb.cached[w.rid];
									if(ret!=undefined){
										d.fav = ret;
										this.onsuccess({response:JSON.stringify(d)});
									}
									return;
								}
								FFDBC({table:mdb.name, json:d, where:w}, this.onsuccess);
							}
							, getBatch : function(d, array) {
								FFDBC({table:mdb.name, json:d, where:{}, batch:array}, this.onsuccess, this.onerror)
							}
							, add : function(d) {
								FFDBC({table:mdb.name, json:d}, this.onsuccess)
							}
							, put : function(d, xiaoJiejie) {
								if(xiaoJiejie && d.fav>0) {
									d.name = xiaoJiejie;
								}
								FFDBC({table:mdb.name, json:d}, this.onsuccess)
							}
							, putBatch : function(array) {
								FFDBC({table:mdb.name, batch:array}, this.onsuccess, this.onerror)
							}
							, fSetRemove : function(array) {
								let this_=this;
								FFDBC({fSet:array}, function(e) {
									if(array.length==0) {
										e = e.responseText.split('\n');
										for(var i=0;i<e.length;i++) {
											mdb.removed[e[i]]=1;
										}
									}
									if(this_.onsuccess) this_.onsuccess(e);
								})
							}
							, fSetDump : function(array) {
								let this_=this;
								FFDBC({fSet:array, table:'sample1'}, function(e) {
									if(array.length==0) {
										e = e.responseText.split('\n');
										for(var i=0;i<e.length;i++) {
											mdb.dumped[e[i]]=1;
										}
									}
									if(this_.onsuccess) this_.onsuccess(e);
								})
							}
							, onsuccess : null
							, onerror : null
						};
					}
				};
			}
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
	var selected=[];
	var lastSelected;

	function select(p, s) {
		if(s) {
			selected.push(p);
			p.classList.add('selected');
		} else {
			selected.splice(selected.indexOf(p), 1);
			p.classList.remove('selected');
		}
	}
	
	function clearSelection() {
		for(var i=0;i<selected.length;i++) {
			selected[i].classList.remove('selected');
		}
		selected=[];
	}
	
	function removeRoom(p) {
		p.style.display='none';
		p.classList.add('removed');
		p.remove();
		AddRoomToLstPane(p);
		blocked.push(p);
	}

	function prepareFHDB(remove, tintSortNew) {
		if(!mdb.preparedRemove) {
			mdb.preparedRemove = 1;
			var dbo=mdb.objectStore();
			dbo.onsuccess = function() {
				dbo=mdb.objectStore();
				dbo.onsuccess = function() {
					if(remove)
						removeAll(tintSortNew);
				}
				dbo.fSetRemove([]); // 再获取remove
			};
			dbo.fSetDump([]); // 先获取dump
		}
	}

	function removeAll(tintSortNew) {
		if(!mdb.preparedRemove) {
			prepareFHDB(true, tintSortNew);
		} else {
			let rooms = Array.prototype.slice.call(doc.getElementsByClassName(TopCName));
			for(var i=0;i<rooms.length;i++) {
				var p = rooms[i];
				var id = GetRoomID(p);
				if(mdb.removed[id] && !mdb.dumped[id] && p.getAttribute('fav')==undefined) {
					p.classList.add('selected');
					removeRoom(p);
				}
			}
			if(tintSortNew) {
				selectAll();
				flowSelected();
			}
		}
	}

	function removeSelected() {
		if(selected.length) {
			var batch = [];
			for(var i=0;i<selected.length;i++) {
				var p = selected[i];
				var fav = p.getAttribute('fav');
				if(fav==undefined||fav=='0') {
					var id = GetRoomID(p);
					removeRoom(p);
					batch.push(id);
					mdb.removed[id] = 1;
				}
			}
			mdb.objectStore().fSetRemove(batch);
			selected=[];
		}
	}

	function dumpSelected() {
		if(selected.length) {
			var batch = [];
			for(var i=0;i<selected.length;i++) {
				var p = selected[i];
				var id = GetRoomID(p);
				p.classList.remove('selected');
				batch.push(id);
				mdb.dumped[id] = 1;
			}
			mdb.objectStore().fSetDump(batch);
			selected=[];
		}
	}

	function favAuto(n) {
		const tmp = '可爱学美萌女同宿寝猫姐妹喵考研子小鸭儿嗯呐吖呀木酱丫呗啦一次5了吗姜呦毕畊锻炼耶恋';
		n=n.innerText;
		for(var i=0;i<tmp.length;i++) {
			if(n.indexOf(tmp[i])>=0) {
				return true;
			}
		}
		return false;
	}

	function flowSelected() {
		if(selected.length) {
			var batch = [];
			var roomLst = selected[0].parentNode;
			if(!roomLst) roomLst=doc.getElementsByClassName(TopCName)[0].parentNode;
			let rooms = Array.prototype.slice.call(roomLst.children);
			var tail;
			for(var i=1;i<rooms.length;i++) {
				var p = rooms[i];
				if(p.getAttribute('fav')==undefined) {
					tail = p;
					break;
				}
			}
			tail = tail||rooms[0];
			var tail0 = tail.previousSibling||tail;
			for(var i=0;i<selected.length;i++) {
				var p = selected[i];
				if(p.getAttribute('fav')==undefined) {
					if(p.parentNode==roomLst) {
						var autoFav;
						var na=p.getElementsByClassName('Item_2GEmdhg6')[0];
						var ti=p.getElementsByClassName('Item_QAOnosoB')[0];
						if(na&&ti) {
							autoFav = favAuto(na)||favAuto(ti);
						} else {
							autoFav = favAuto(p);
						}
						//p.remove();
						var bf = autoFav?tail0.nextSibling||tail.previousSibling||tail.nextSibling:tail.nextSibling;
						if(p!=bf)roomLst.insertBefore(p, bf);
						if(autoFav){
							if(tail==tail0||tail==p)tail=p.nextSibling;
							tail0=p;
						} else {
							tail=p;
						}
					}
				}
			}
		}
	}
	
	function selectAll() {
		let rooms = Array.prototype.slice.call(doc.getElementsByClassName(TopCName));
		for(var i=0;i<rooms.length;i++) {
			var p = rooms[i];
			if(!p.classList.contains('selected') && !mdb.dumped[GetRoomID(p)] && p.getAttribute('fav')==undefined)
				select(p, true);
		}
	}

	function initLBox() {
		if(!lstPanel) {
			lstPanel = doc.createElement('DIV');
			lstPanel.id=LstBoxId;
			function wrappedMouseDown(e) {
				var p=FindRoomTopElement(e.srcElement);
				if(p) {
					if(e.altKey && !e.shiftKey) { 
						if(p.classList.contains('selected')) {
							select(p, false);
						}
						lastSelected = p;
					}
					else if(e.ctrlKey) { 
						var shift = e.shiftKey;
						var push = !p.classList.contains('selected');
						if(push || !shift) {
							select(p, push);
						}
						if(shift && lastSelected) { // Shift 快速连选
							var children=p.parentNode.children;
							var st = Array.prototype.indexOf.call(children,lastSelected);
							if(st>=0) {
								push = !e.altKey;
								var ed = Array.prototype.indexOf.call(children,p);
								var allDpd = mdb.dumped[GetRoomID(lastSelected)] && mdb.dumped[GetRoomID(p)];
								for(var i=Math.min(st, ed); i<=Math.max(st, ed); i++) {
									var child = children[i];
									if(child) {
										if(push ^ child.classList.contains('selected')) {
											if(!push || allDpd || !mdb.dumped[GetRoomID(child)])
												select(child, push);
										}
									}
								}
							}
						}
						lastSelected = p;
					}
				}
			}
			
			win.addEventListener("contextmenu", function(e){
				if(FindRoomTopElement(e.srcElement)) {
					e.stopPropagation();
					e.preventDefault();
				}
			});
			win.addEventListener('click', (e)=>{
				debug('click!!!', e);
				if(e.button===0) { // 左键
					if((e.altKey || e.ctrlKey) && FindRoomTopElement(e.srcElement)) { 
						e.stopPropagation();
						e.preventDefault();
					}
				}
				if(e.button===1) { // 中键

				}
            }, true)
			win.addEventListener('mousedown', (e)=>{
				if(e.button===0) { // 左键
					wrappedMouseDown(e);
				}
				if(e.button===2) { // 右键
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
							} else if(e.altKey || parseInt(p.getAttribute('fav'))>=5) {
								lv=7;
							}
							PinRoom(p,-1,lv);
							dbo.put({rid:rid,fav:lv}, GetRoomName(p));
						} else {
							if(e.ctrlKey) {
							} else {
								dbo.put({rid:rid,fav:0}, GetRoomName(p));
								AddRoomToLstPane(p);
								p.remove();
								blocked.push(p);
							}
						}
						//log("撒哟娜拉！", rid, p.getElementsByClassName('Item_QAOnosoB')[0].innerText);
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
	
	if(!window.unsafeWindow) window.unsafeWindow=window;
	unsafeWindow.mdb = mdb;
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
					dbo.put({rid:rid,fav:0});
				} else if(lv) {
					log(rid, "fav="+lv);
					dbo.put({rid:rid,fav:lv});
				} else {
					log(rid, "fav="+fav);
					dbo.add({rid:rid,fav:4});
				}
			}
		}
	}
	
	unsafeWindow.restoreBk = function(e) {
		e=e.split('\n');
		var transaction=mdb.transact('rid','readwrite');
		var cc=0;
		var batch = [];
		for(var i=0;i<e.length;i++){
			var rid = /[0-9]+/.exec(e[i])
			if(rid) rid=rid[0];
			if(rid) {
				var fav = /"fav":"?([0-9]+)/.exec(e[i])
				if(fav) fav=fav[1];
				else fav='0';
				fav = parseInt(fav)||0;
				if(fav===0) {
					log('block::'+rid, '\t', cc++);
					//dbo.put({rid:rid,fav:0});
				} else {
					log(rid, "fav="+fav, '\t', cc++);
					//dbo.put({rid:rid,fav:fav});
				}
				batch.push({rid:rid,fav:fav});
			}
		}
		var dbo=transaction.objectStore('rid');
		dbo.onerror = function(e) {
			debug(e);
		}
		dbo.putBatch(batch);
	}

	var keys=[];
	window.addEventListener('keyup', (e)=>{
		debug('keyup', e);
		keys[e.code]=0;
	});
	window.addEventListener('keydown', (e)=>{
		if(keys[e.code]) return;
		keys[e.code]=1;
		debug('keydown', e);
		if(e.code==='Delete') {
			removeSelected();
		}
		else if(e.code==='Backspace'){
			removeAll(!e.shiftKey);
		}
		else if(e.code==='NumpadAdd'){
			dumpSelected();
		}
		else if(e.code==='NumpadSubtract'){
			flowSelected();
		}
		else if(e.code==='KeyA'){
			e.stopPropagation();
			e.preventDefault();
			if(e.altKey) {
				clearSelection();
			} else if(true){ // e.ctrlKey
				selectAll();
			}
		}
		else if(e.code==='KeyL'){
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
		else if(e.code==='KeyE'){ //e.code==='Digit1' || 
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
				let shift=!e.shiftKey;
				var cc=9;
				if(e.code==='KeyE') { // 开始滚动 e.shiftKey || 
					tAutoScroll = setInterval(function () {
						window.scrollTo(0, window.scrollY + 50);
						if(shift && cc++%5==0) {
							if(document.getElementsByClassName('no__data_txt')[0]) {
								clearInterval(tAutoScroll);
								restore(false, true);
							}
						}
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

	function prepareBatch(revive, still, redump){
		if(!mdb.caching && mdb.ffdbc()) {
			var transaction=mdb.transact('rid');
			var dbo=transaction.objectStore('rid');
			let rooms = Array.prototype.slice.call(doc.getElementsByClassName(TopCName));
			mdb.caching = true;
			var batch = [];
			for(var i=0;i<rooms.length;i++) {
				batch.push({rid:GetRoomID(rooms[i])});
			}
			dbo.onsuccess = function(e) {
				debug('getBatch::onsuccess', e);
				e = JSON.parse(e.response);
				mdb.cached = {};
				for(var i=0;i<e.length;i++) {
					var ret = e[i];
					if(ret.rid) {
						mdb.cached[ret.rid] = ret.fav;
					}
				}
				if(revive)
					restore(still, redump);
				else
					prepareFHDB(true);
			}
			dbo.onerror = function(e) {
				mdb.caching = false;
			}
			dbo.getBatch({rid:-1, fav:-1}, batch);
		}
	}

	function restore(still, redump){
		if(mdb.useCache && !mdb.cached) {
			prepareBatch(true, still, redump);
			return;
		}
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
		function tpRoom(p, rid, fav, idx) {
			if(still) {
				tintRoom(p, fav);
			} else {
				if(fav===0) {
					var id=GetRoomID(p);
					if(!mdb.dumped[id] || mdb.removed[id]) {
						p.style.display='none';
						p.remove();
						AddRoomToLstPane(p);
						blocked.push(p);
						p.setAttribute('fav', 0);
						//log("安宁哈塞哟！", rid, fav, GetRoomName(p));
					}
				} else {
					//log("Beautiful Girl！", p);
					PinRoom(p, idx, fav);
				}
			}
		}
		for(var i=0;i<rooms.length;i++) {
			let p = rooms[i];
			let idx=i;
			if(p.style.display!=='none') {
				let rid = GetRoomID(p);
				if(mdb.ffdbc()) {
					dbo.onsuccess = function(e){
						var ret=JSON.parse(e.response);
						//debug('onsuccess!!!', ret);
						if(ret.fav>=0) {
							tpRoom(p, rid, ret.fav, idx);
						}
					}
					dbo.get({fav:-1}, {rid:rid});
				} else {
					var request=dbo.get(rid+'');
					request.onsuccess=function(e){
						var ret=e.target.result;
						if(ret) {
							//console.log('ret='+ret);
							tpRoom(p, rid, parseInt(ret.fav)||0, idx);
						}
					};
				}
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
		if(redump) {
			removeAll(true);
		}
	}
	//restore();

	var maxLv = 7;
	var PinIdx = [];
	var PinHeadIdx = [];
	function GetRoomName(p){return p.getElementsByClassName('Item_QAOnosoB')[0].innerText};
	
	function PinRoom(p, idx, fav) {
		//log('PinRoom lv=', GetRoomName(p), fav);
		p.setAttribute('fav', fav);
		tintRoom(p, fav);
		var pinEl=0;
		var i=fav;
		for(;i<=maxLv;i++) {
			pinEl = PinIdx[i];
			if(pinEl) break;
		}
		var tail=0;
		if(pinEl) {
			tail = pinEl.nextSibling;
		}
		var roomLst = p.parentElement;
		if(!tail || tail.parentNode!=roomLst) {
			tail = roomLst.children[PinHeadIdx[fav]==undefined?0:(PinHeadIdx[fav]+1)];
		}
		if(!tail) {
			tail = roomLst.firstElementChild;
		}
		if(tail!=p) {
			p.remove();
			roomLst.insertBefore(p, tail);
		}
		PinIdx[fav] = p;
		PinHeadIdx[fav] = Array.prototype.indexOf.call(roomLst.children,p);
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
			if(p.classList.contains(TopCName)){
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