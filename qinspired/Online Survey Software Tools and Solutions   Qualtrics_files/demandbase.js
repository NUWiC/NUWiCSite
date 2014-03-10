var DemandbaseAnalytics=DemandbaseAnalytics||{};
DemandbaseAnalytics.demandbaseGA={
	key:'dddf54c4d42f26dc6161e539bbef8b95ac1027ce',
	/* Customize which variables are sent to GA. 'fields' must be a Demandbase variable name */
	fields:["company_name","audience","industry","employee_range","revenue_range"],
	dbDataSet: null,
	track:function(data) {
      try {
        data=DemandbaseAnalytics.demandbaseGA._flatA(data);
        DemandbaseAnalytics.demandbaseGA.dbDataSet = data;  /*allows access to db dataset in JS outside of this namespace */
        for(field in DemandbaseAnalytics.demandbaseGA.fields){
        	var lbl=DemandbaseAnalytics.demandbaseGA._cA(DemandbaseAnalytics.demandbaseGA._toPC(DemandbaseAnalytics.demandbaseGA.fields[field]));
        	var val=data[DemandbaseAnalytics.demandbaseGA.fields[field]]||'(not set)';
        	DemandbaseAnalytics.demandbaseGA._var((parseInt(field)+1),lbl,val,1);
        	DemandbaseAnalytics.demandbaseGA._logE(lbl+' : '+val);
        }
        
        /*	additional event with Demandbase data as category/action/label  */
        if(data) {
        	var cat=data['audience'] || '(not detected)';
			var act=data['industry'] || '(not detected)';
			var lbl=data['company_name'] || '(not detected)';
			DemandbaseAnalytics.demandbaseGA._p('_trackEvent',cat,act,lbl,0,1);
			DemandbaseAnalytics.demandbaseGA._logE('Custom Event Tracked: '+cat+' : '+act+' : '+lbl);

			/*var cat=data['watch_list_q_industry'] || '(not detected)';
			var act=data['watch_list_company_type'] || '(not detected)';
			var lbl=data['company_name'] || '(not detected)';
			DemandbaseAnalytics.demandbaseGA._p('_trackEvent',cat,act,lbl,0,1);
			DemandbaseAnalytics.demandbaseGA._logE('Custom Event Tracked: '+cat+' : '+act+' : '+lbl);*/
        }
        DemandbaseAnalytics.demandbaseGA._event();
      } catch(e){ DemandbaseAnalytics.demandbaseGA._logE('Integration Error: '+e)}; 
    },
	load:function(){
		try { 
			if(!window._gaq) window._gaq=[];
			var db=document.createElement('script');db.type='text/javascript'; db.async=true;
	        db.src=('https:'==document.location.protocol?'https://':'http://')+'api.demandbase.com/api/v2/ip.json?key='+this.key+'&callback=DemandbaseAnalytics.demandbaseGA.track&page='+document.URL+'&referrer='+document.referrer;
	        var s=document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(db,s);
	        _gaq.push(['_addDevId', 'NE7T9']);
	        DemandbaseAnalytics.demandbaseGA._logE('Loaded Script ' + db.src);
		} catch(e){ this._logE('Script Error: '+e)}; 
	},
	_cA:function(s){ 
		var al=['IP','SID','HQ','DMA','ISP'];
		for(a in al){ 
			s=s.replace(new RegExp(al[a],'ig'),al[a])}return s;
	},
	_flatA:function(a){ 
		for(d in a){ 
			if(typeof a[d]=='object'){ 
				for(cd in a[d]){a[d+'_'+cd]=a[d][cd]};
				delete a[d];
			}
		}; 
		return a;
	},
	_logE:function(m){ if(window['console'] !== 'undefined' && typeof(console) !== 'undefined') { console.log('DB GA '+m); } },
	_toPC:function(s){ 
		return s.replace(/_/g,' ').replace(/\w\S*/g,function(t){ return t.charAt(0).toUpperCase()+t.substr(1).toLowerCase() }); },
	_p:function(t,v1,v2,v3,v4,v5){ window._gaq.push([t,v1,v2,v3,v4,v5]); },
	_var:function(i,k,v,s){ this._p('_setCustomVar',i,k,v,s); },
	_event:function(){ this._p('_trackEvent','Demandbase','API Resolution','IP API',0,1); }
};
DemandbaseAnalytics.demandbaseGA.load();