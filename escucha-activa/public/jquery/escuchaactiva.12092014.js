var miUrl;
var gPagina;
var gTodas;
var cadenaTrending;
var coordMarcador;
var map;
var infowindow;
var textoInfo = []; 
var config  = {
   disable_search: true
 };

function muestraSelect(numSelect)
{
	var n = document.getElementById('escucharlb');
	console.log(n.size);
	

}


function mijsonp(url, callback) {
	
   var script = document.createElement("script");
   script.setAttribute("type","text/javascript");
   script.setAttribute("src", url + "?callback="+callback + "&cachebuster="+new Date().getTime());
   document.getElementsByTagName("head")[0].appendChild(script);
}
var req = new XMLHttpRequest();

function miyql(url,pagina, callback) {
	gPagina = pagina;
	var simbolo;
	if (gTodas == 1)
	{
		simbolo = '?';
	}
	else
	{
		simbolo = '&';
	}
	var paginaUrl;
	if (cadenaTrending == "Trending")
	{
		paginaUrl = url;
	}
	else
	{
		paginaUrl = url +=simbolo+"page="+pagina;
	}
	var baseurl = "http://query.yahooapis.com/v1/public/yql?q=";
	var q = "select * from json where url = '" + url + "'";  
	var nuevaurl = baseurl + encodeURIComponent(q) + "&format=json&diagnostics=true";
	req.timeout = 10000;
	req.open("GET", nuevaurl, true);
	req.onreadystatechange = miFuncionPinta;
	req.send(null);
	
}

function miyql2(url,pagina, callback) {

	gPagina = pagina;
	var simbolo;
	
	if (gTodas == 1)
	{
		simbolo = '?';
	}
	else
	{
		simbolo = '&';
	}
	var paginaUrl = url;
	miUrl = url;
	var baseurl = "http://query.yahooapis.com/v1/public/yql?q=";
	var q = "select * from json where url = '" + url + "'";  
	var nuevaurl = baseurl + encodeURIComponent(q) + "&format=json&diagnostics=true";
	
	req.open("GET", nuevaurl, true);
	req.onreadystatechange = miFuncionPinta;
	req.send(null);
}
function miyqlMapa(url, callback) {
	
	var simbolo;
	var paginaUrl = url;
	miUrl = url;
	var baseurl = "http://query.yahooapis.com/v1/public/yql?q=";
	var q = "select * from json where url = '" + url + "'";  
	var nuevaurl = baseurl + encodeURIComponent(q) + "&format=json&diagnostics=true";
	req.timeout = 10000;
	req.open("GET", nuevaurl, true);
	req.onreadystatechange = cargaMarcadores;
	req.send(null);
}


function miFuncionPinta() 
{
 
	if (req.readyState==4 && req.status==200) 
	{
		
		$('#dvLoading').fadeOut(2000);
		$("#datawindow").empty();
		$("#paginator").empty();
		var miObj;
		var fechaPublicacion;
		var fechaHora;
		var fuenteImg;
		var texto;
		var textoconUrl;
		var textoUrlHastag;
		var cabecera;
		
	
		if (cadenaTrending == "Trending")
		{
				miObj = JSON.parse(req.responseText).query.results.json;
	
				$("#datawindow").append("<table id='tablaDatos'>&nbsp;</table>"); 
				$("#tablaDatos").append("<tr class='separadorpaginas'><td colspan='2'>");
				fechaPublicacion = new Date();
				var dia = fechaPublicacion.getDate();
				var diaString;
				if (dia < 10)
				{
						diaString = '0' + dia.toString();
				}
				else
				{
					diaString = dia.toString();
				}
				var mes = fechaPublicacion.getMonth() + 1;
				var mesString;
				if (mes < 10 )
				{
					mesString = '0' + mes.toString();
				}
				else
				{
					mesString = mes.toString();
				}
				var anno = fechaPublicacion.getFullYear();
				var annoString = anno.toString();
				var fechaString = diaString+'/'+mesString+'/'+annoString;
				var horaActual = new Date();
				var hora = horaActual.getHours();
				var horaString;
				if (hora < 10)
				{
						horaString = '0' + hora.toString();
				}
				else
				{
					horaString = hora.toString();
				}
				var minutos = horaActual.getMinutes();
				var minutosString;
				if (minutos < 10)
				{
					minutosString = '0' + minutos.toString();
				}
				else
				{
					minutosString = minutos.toString();
				}
				var horaActualString = horaString +':'+minutosString;
				fuenteImg = '../escucha-activa/public/i/23-AVATAR-Twitter.png';
	    	for (i = 0; i < miObj.results.length; ++i) 
				{
					texto = miObj.results[i].name;
					if (texto == 'null'){texto = 'S&iacute;n descripci&oacute;n';}
					textoconUrl = convierteUrl(texto);
					if (textoconUrl.indexOf('#') == -1) { textoconUrl = '#'+textoconUrl;}
					textoUrlHastag = convierteHashtag(textoconUrl);
					$("#tablaDatos").append("<tr style='height:15px;'><td>");
					$("#tablaDatos").append("<tr><td class='colizq'><img src="+fuenteImg+" width='60px' height='60px' alt='Facebook'/></td><td class='colder sizeData azul negrita alignIzda'><div class='titulo'>Twitter <span style='color:#ccc; margin:0 5px;'>|</span>"+ fechaString+" <span style='color:#ccc; margin:0 5px;'>|</span> "+horaActualString+"</div><span>"+textoUrlHastag+"</span></td></tr>");
					$("#tablaDatos").append("<tr><td></td><td class='i_i abrir'><a class='sizeData' href="+miObj.results[i].url+" title='Abrir' acronym='Abrir recursos en origen'>Abrir</a></td><td class='d_d sizeData compartirrs'><span style='margin:0 10px 0 0;'>Compartir</span> <a href=https://www.facebook.com/sharer/sharer.php?u=="+miObj.results[i].url+"  title='Compartir en Facebook'><img src='../escucha-activa/public/i/09-ICON-Facebook.png' width='15px' height='15px' alt='Facebook'/></a><a href=https://twitter.com/intent/tweet?url="+miObj.results[i].url+" title='Compartir en Twitter'><img src='../escucha-activa/public/i/10-ICON-Twitter.png' alt='Twitter' width='15px' height='15px'/><a href=https://plus.google.com/share?url="+miObj.results[i].url+"  title='Compartir en Google+'><img src='../escucha-activa/public/i/12-ICON-Google-Plus.png' style='padding-right:5px;'  width='15px' height='15px' alt='Googleplus'/></a></td></tr>");
					$("#tablaDatos").append("<tr style='height:15px;'><td>");
					$("#tablaDatos").append("<tr class='separadorpaginas'><td colspan='2'></td></tr>");
				}	
				
				
		}
		else
		{
		 miObj = JSON.parse(req.responseText).query.results.json;
		 
		 if(typeof miObj === 'undefined' ){
	    			alert("El JSON no ha devuelto nada. Por definir mensaje.");
	 		}
	 		
	 		else
				{console.log(miObj);
				
				 	var numPaginas= miObj.total_pages; 
			
				    var options = {
		            currentPage: gPagina,
		            totalPages: numPaginas,
		             pageUrl: function(type, page, current){
													return "#cabecera";
		
		            },
		            onPageClicked: function(e,originalEvent,type,page){
		            		miyql(miUrl,page, function(data) {  });
		            		//$('#aPrincipio a').trigger('click');
		            		$("#datawindow").empty();
		            		
		 
		            	
									},
									tooltipTitles: function (type, page, current) {
		                switch (type) {
		                case "first":
		                    return "Ir a la primera p\u00e1gina";
		                case "prev":
		                    return "Ir a la p\u00e1gina anterior";
		                case "next":
		                    return "Ir a la p\u00e1gina siguiente";
		                case "last":
		                    return "Ir a la \u00faltima p\u00e1gina";
		                case "page":
		                    return "Ir a la p\u00e1gina " + page ;
		                }
		            }, 
		            itemTexts: function (type, page, current) {
	                    switch (type) {
	                    case "first":
	                        return "Primera";
	                    case "prev":
	                        return "<";
	                    case "next":
	                        return ">";
	                    case "last":
	                        return "\u00daltima";
	                    case "page":
	                        return page;
	                    }
	                },
	            itemContainerClass: function (type, page, current) {
	            		switch(type)
	            		{
	                	case "last":
	                		return  "pagult";
	                	case "first":
	                	 	return "pagprim";
	                	case "page":
	                		if (page === current) {return "linkactivo";}
	                }
	              }
	            
		
		        }
		}
	    $("#datawindow").append("<table id='tablaDatos'>&nbsp;</table>"); 
			$("#tablaDatos").append("<tr class='separadorpaginas'><td colspan='2'>");
	    	for (i = 0; i < miObj.results.length; ++i) 
					{	
						
						$("#tablaDatos").append("<tr style='height:15px;'><td>");
						fechaPublicacion = miObj.results[i].published_on;
						fechaHora = fechaPublicacion.split(' ',2);
						var descripcion;
						texto = miObj.results[i].description;
						if (texto == 'null')
			   				{texto = 'S&iacute;n descripci&oacute;n';}
						textoconUrl = convierteUrl(texto);
						textoUrlHastag = convierteHashtag(textoconUrl);
						
						switch(miObj.results[i].source) 
						{
							case "youtube":
								fuenteImg = '../escucha-activa/public/i/25-AVATAR-YouTube.png';
								break;
							case "facebook_events":
								fuenteImg = '../escucha-activa/public/i/22-AVATAR-Facebook-Eventos.png';
								break;	
							case "twitter":
								
								fuenteImg = '../escucha-activa/public/i/23-AVATAR-Twitter.png';
								break;
							case "spain_info":
								fuenteImg = '../escucha-activa/public/i/19-AVATAR-Spain-Info.png';
								break;
							case "instagram":
							 
								fuenteImg = '../escucha-activa/public/i/26-AVATAR-Instagram.png';
								break;
							case "ticketea":
								fuenteImg = '../escucha-activa/public/i/20-AVATAR-Ticketea.png';
								break;
							case "pinterest":
								fuenteImg = '../escucha-activa/public/i/ICON-Pinterest.png';
								break;
							case "foursquare":
								fuenteImg = '../escucha-activa/public/i/ICON-Foursquare.png';
								textoUrlHastag = miObj.results[i].title;
								break;
							case "flickr":
								fuenteImg = '../escucha-activa/public/i/ICON-Flickr.png';
								break;
							case "github":
								fuenteImg = '../escucha-activa/public/i/GitHub-2.png';
								break;
							case "facebook":
								fuenteImg = '../escucha-activa/public/i/23-AVATAR-Facebook.png';
								break;	
							case "wikipedia":
								fuenteImg = '../escucha-activa/public/i/ICON-Wikipedia.png';
								break;	
							case "google_plus":
								fuenteImg = '../escucha-activa/public/i/ICON-Google+.png';
								break;
							case "vimeo":
								fuenteImg = '../escucha-activa/public/i/ICON-Vimeo.png';
								break;
							case "wordpress":	
								fuenteImg = '../escucha-activa/public/i/wordpress.png';
								break;
						}
						var autor = miObj.results[i].author;
						$("#tablaDatos").append("<tr><td class='colizq'><img src="+fuenteImg+" width='60px' height='60px' alt='Facebook'/></td><td class='colder sizeData azul negrita alignIzda'><div class='titulo'>"+miObj.results[i].source+ " <span style='color:#ccc; margin:0 5px;'>|</span> "+autor+ " <span style='color:#ccc; margin:0 5px;'>|</span> "+ fechaHora[0]+" <span style='color:#ccc; margin:0 5px;'>|</span> "+fechaHora[1]+"</div><span>"+textoUrlHastag+"</span></td></tr>");
			   		switch(miObj.results[i].type)
						{
						case "text":
						$("#tablaDatos").append("<tr style='height:5px;'><td>");
						$("#tablaDatos").append("<tr><td></td><td class='i_i abrir'><a class='sizeData' href="+miObj.results[i].url+" title='Abrir' acronym='Abrir recursos en origen'>Abrir</a></td><td class='d_d sizeData compartirrs'><span style='margin:0 10px 0 0;'>Compartir</span> <a href=https://www.facebook.com/sharer/sharer.php?u=="+miObj.results[i].url+"  title='Compartir en Facebook'><img src='../escucha-activa/public/i/09-ICON-Facebook.png' width='15px' height='15px' alt='Facebook'/></a><a href=https://twitter.com/intent/tweet?url="+miObj.results[i].url+" title='Compartir en Twitter'><img src='../escucha-activa/public/i/10-ICON-Twitter.png' alt='Twitter' width='15px' height='15px'/><a href=https://plus.google.com/share?url="+miObj.results[i].url+"  title='Compartir en Google+'><img src='../escucha-activa/public/i/12-ICON-Google-Plus.png' style='padding-right:5px;'  width='15px' height='15px' alt='Googleplus'/></a></td></tr>");
						$("#tablaDatos").append("<tr style='height:15px;'><td>");
						$("#tablaDatos").append("<tr class='separadorpaginas'><td colspan='2'></td></tr>");	
			   			break;
			   			case "event":
			   			$("#tablaDatos").append("<tr style='height:5px;'><td>");
							$("#tablaDatos").append("<tr><td></td><td class='i_i abrir'><a class='sizeData' href="+miObj.results[i].url+" title='Abrir' acronym='Abrir recursos en origen'>Abrir</a></td><td class='d_d sizeData compartirrs'><span style='margin:0 10px 0 0;'>Compartir</span> <a href=https://www.facebook.com/sharer/sharer.php?u=="+miObj.results[i].url+"  title='Compartir en Facebook'><img src='../escucha-activa/public/i/09-ICON-Facebook.png' width='15px' height='15px' alt='Facebook'/></a><a href=https://twitter.com/intent/tweet?url="+miObj.results[i].url+" title='Compartir en Twitter'><img src='../escucha-activa/public/i/10-ICON-Twitter.png' alt='Twitter' width='15px' height='15px'/><a href=https://plus.google.com/share?url="+miObj.results[i].url+"  title='Compartir en Google+'><img src='../escucha-activa/public/i/12-ICON-Google-Plus.png' style='padding-right:5px;'  width='15px' height='15px' alt='Googleplus'/></a></td></tr>");
							
							$("#tablaDatos").append("<tr style='height:15px;'><td>");
							$("#tablaDatos").append("<tr class='separadorpaginas'><td colspan='2'></td></tr>");
			   				break;
			   			case "video":
			   				
			   				//$("#tablaDatos").append("<tr><td></td><td class='sizeData i_i alignIzda'>V&iacute;deo | <span class='alignJust'>Descripci&oacute;n: "+textoconUrl+"</span> </td></tr>");
			   			 	$("#tablaDatos").append("<tr style='height:5px;'><td>");
			   			 	var urlembedded = getEmbeddedPlayer(miObj.results[i].url,416,740);
			   				$("#tablaDatos").append("<tr><td></td><td class='i_i'>"+urlembedded+"</td></tr>");
			   				$("#tablaDatos").append("<tr><td></td><td class='i_i abrir'><a class='sizeData' href="+miObj.results[i].url+" title='Abrir' acronym='Abrir recursos en origen'>Abrir</a></td><td class='d_d sizeData compartirrs'><span style='margin:0 10px 0 0;'>Compartir</span> <a href=https://www.facebook.com/sharer/sharer.php?u=="+miObj.results[i].url+"  title='Compartir en Facebook'><img src='../escucha-activa/public/i/09-ICON-Facebook.png' width='15px' height='15px' alt='Facebook'/></a><a href=https://twitter.com/intent/tweet?url="+miObj.results[i].url+" title='Compartir en Twitter'><img src='../escucha-activa/public/i/10-ICON-Twitter.png' alt='Twitter' width='15px' height='15px'/><a href=https://plus.google.com/share?url="+miObj.results[i].url+"  title='Compartir en Google+'><img src='../escucha-activa/public/i/12-ICON-Google-Plus.png' style='padding-right:5px;'  width='15px' height='15px' alt='Googleplus'/></a></td></tr>");
								$("#tablaDatos").append("<tr style='height:15px;'><td>");
								$("#tablaDatos").append("<tr class='separadorpaginas'><td colspan='2'></td></tr>");
			   				break;
			   			case "picture":
						
			   			$("#tablaDatos").append("<tr><td></td><td class='i_i'><img src="+miObj.results[i].thumbnail+" alt='Histagram_img  class='ImageBorder'/></td></tr>");
			   			$("#tablaDatos").append("<tr style='height:5px;'><td>");
			   			$("#tablaDatos").append("<tr><td></td><td class='i_i abrir'><a class='sizeData' href="+miObj.results[i].url+" title='Abrir' acronym='Abrir recursos en origen'>Abrir</a></td><td class='d_d sizeData compartirrs'><span style='margin:0 10px 0 0;'>Compartir</span> <a href=https://www.facebook.com/sharer/sharer.php?u=="+miObj.results[i].url+"  title='Compartir en Facebook'><img src='../escucha-activa/public/i/09-ICON-Facebook.png' width='15px' height='15px' alt='Facebook'/></a><a href=https://twitter.com/intent/tweet?url="+miObj.results[i].url+" title='Compartir en Twitter'><img src='../escucha-activa/public/i/10-ICON-Twitter.png' alt='Twitter' width='15px' height='15px' /><a href=https://plus.google.com/share?url="+miObj.results[i].url+"  title='Compartir en Google+'><img src='../escucha-activa/public/i/12-ICON-Google-Plus.png' style='padding-right:5px;'  width='15px' height='15px' alt='Googleplus'/></a></td></tr>");
							$("#tablaDatos").append("<tr style='height:15px;'><td>");
							$("#tablaDatos").append("<tr class='separadorpaginas'><td colspan='2'></td></tr>");
	
			   				break;
			   			case "venue":
				   			//$("#tablaDatos").append("<tr><td></td><td class='i_i'><img src="+miObj.results[i].url+" alt='Histagram_img  class='ImageBorder'/></td></tr>");
				   			$("#tablaDatos").append("<tr style='height:5px;'><td>");
				   			$("#tablaDatos").append("<tr><td></td><td class='i_i abrir'><a class='sizeData' href="+miObj.results[i].url+" title='Abrir' acronym='Abrir recursos en origen'>Abrir</a></td><td class='d_d sizeData compartirrs'><span style='margin:0 10px 0 0;'>Compartir</span> <a href=https://www.facebook.com/sharer/sharer.php?u=="+miObj.results[i].url+"  title='Compartir en Facebook'><img src='../escucha-activa/public/i/09-ICON-Facebook.png' width='15px' height='15px' alt='Facebook'/></a><a href=https://twitter.com/intent/tweet?url="+miObj.results[i].url+" title='Compartir en Twitter'><img src='../escucha-activa/public/i/10-ICON-Twitter.png' alt='Twitter' width='15px' height='15px' /><a href=https://plus.google.com/share?url="+miObj.results[i].url+"  title='Compartir en Google+'><img src='../escucha-activa/public/i/12-ICON-Google-Plus.png' style='padding-right:5px;'  width='15px' height='15px' alt='Googleplus'/></a></td></tr>");
								$("#tablaDatos").append("<tr style='height:15px;'><td>");
								$("#tablaDatos").append("<tr class='separadorpaginas'><td colspan='2'></td></tr>");
		
				   				break;
			   			case "code":
				   			//$("#tablaDatos").append("<tr><td></td><td class='i_i'><img src="+miObj.results[i].url+" alt='Histagram_img  class='ImageBorder'/></td></tr>");
				   			$("#tablaDatos").append("<tr style='height:5px;'><td>");
				   			$("#tablaDatos").append("<tr><td></td><td class='i_i abrir'><a class='sizeData' href="+miObj.results[i].url+" title='Abrir' acronym='Abrir recursos en origen'>Abrir</a></td><td class='d_d sizeData compartirrs'><span style='margin:0 10px 0 0;'>Compartir</span> <a href=https://www.facebook.com/sharer/sharer.php?u=="+miObj.results[i].url+"  title='Compartir en Facebook'><img src='../escucha-activa/public/i/09-ICON-Facebook.png' width='15px' height='15px' alt='Facebook'/></a><a href=https://twitter.com/intent/tweet?url="+miObj.results[i].url+" title='Compartir en Twitter'><img src='../escucha-activa/public/i/10-ICON-Twitter.png' alt='Twitter' width='15px' height='15px' /><a href=https://plus.google.com/share?url="+miObj.results[i].url+"  title='Compartir en Google+'><img src='../escucha-activa/public/i/12-ICON-Google-Plus.png' style='padding-right:5px;'  width='15px' height='15px' alt='Googleplus'/></a></td></tr>");
								$("#tablaDatos").append("<tr style='height:15px;'><td>");
								$("#tablaDatos").append("<tr class='separadorpaginas'><td colspan='2'></td></tr>");
		
				   				break;
				   		 case "wiki":
				   			
				   			$("#tablaDatos").append("<tr style='height:5px;'><td>");
				   			$("#tablaDatos").append("<tr><td></td><td class='i_i abrir'><a class='sizeData' href="+miObj.results[i].url+" title='Abrir' acronym='Abrir recursos en origen'>Abrir</a></td><td class='d_d sizeData compartirrs'><span style='margin:0 10px 0 0;'>Compartir</span> <a href=https://www.facebook.com/sharer/sharer.php?u=="+miObj.results[i].url+"  title='Compartir en Facebook'><img src='../escucha-activa/public/i/09-ICON-Facebook.png' width='15px' height='15px' alt='Facebook'/></a><a href=https://twitter.com/intent/tweet?url="+miObj.results[i].url+" title='Compartir en Twitter'><img src='../escucha-activa/public/i/10-ICON-Twitter.png' alt='Twitter' width='15px' height='15px' /><a href=https://plus.google.com/share?url="+miObj.results[i].url+"  title='Compartir en Google+'><img src='../escucha-activa/public/i/12-ICON-Google-Plus.png' style='padding-right:5px;'  width='15px' height='15px' alt='Googleplus'/></a></td></tr>");
								$("#tablaDatos").append("<tr style='height:15px;'><td>");
								$("#tablaDatos").append("<tr class='separadorpaginas'><td colspan='2'></td></tr>");
		
				   				break;
			    	}
			    }

			    if (miObj.results.length > 0) 
					{
			    	 $("#paginator").bootstrapPaginator(options);
			     
			     }
			    
			   }
			 }
}

function getEmbeddedPlayer(url, height, width){
	var output = '';
	var youtubeUrl = url.match(/watch\?v=([a-zA-Z0-9\-_]+)/);
	var vimeoUrl = url.match(/^http:\/\/(www\.)?vimeo\.com\/(clip\:)?(\d+).*$/);
	if( youtubeUrl ){
		output = '<iframe src="http://www.youtube.com/embed/'+youtubeUrl[1]+'?rel=0" height='+height+' width='+width+' allowfullscreen="" frameborder="0"></iframe>'
		
		}
		return output;
}

function convierteUrl(text) {
	
		var urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, function(url) {
    		
        return '<a class="sizeData" href="' + url + '">' + url + '</a>';
    })
 }
 
 
 
function convierteHashtag(text) {
   var hashtag_regexp = /#([a-zA-Z0-9-\u00F1|\u00D1|\u00e1|\u00e9|\u00ed|\u00f3|\u00fa|\u00c1|\u00c9|\u00cd|\u00d3|\u00da]+)/g;
   //\u0027
   var nuevaUrl = "http://opendata.aragon.es/socialdata/data?query=$1";
   
	 return text.replace(
        hashtag_regexp,
        "<a class='sizeData' href='#' onclick='on_click(&#39;"+nuevaUrl+"&#39;);'>#$1</a>"
    );
} 






function on_click(nuevaUrl)
{
	$("#datawindow").empty();
	if (cadenaTrending == "Trending")
	{
		cadenaTrending = "Toda" ;
	} 
	miyql2(nuevaUrl,1, function(data) {  });
}

function GetURLParameter(sParam,urlParam)
{
   	 if(typeof urlParam !== 'undefined' ){
		    var sURLVariables = urlParam.split('?');
		   
		    for (var i = 0; i < sURLVariables.length; i++)
		    {
		        var sParameterName = sURLVariables[i].split('=');
		        if (sParameterName[0] == sParam)
		        {
		            return sParameterName[1];
		
		        }
		    }
		 }
		
}

	

	
/*$("#enlb").change(function(event){
		event.preventDefault();
		var cadenaSel;
		cadenaSel = $( "#enlb :selected" ).val() ;
		
		if (cadenaSel == 'Mapa' )
		{
			montarMapa();
		}
		else
		{
			montarUrl(1);
		}
	});*/



function montarMapa()
{
	$("#datawindow").empty();
	$("#paginator").empty();
	inicializaMapa();
}

function inicializaMapa()
{
  $("#datos_terceros").hide();
  $("#miMapa").hide();
  var mapProp = {
    center: new google.maps.LatLng(41.39, 0.52),
    zoom:7,
    panControl:true,
    zoomControl:true,
    mapTypeControl:true,
    scaleControl:true,
    streetViewControl:true,
    overviewMapControl:true,
    rotateControl:true,    
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  $('<div id ="mapaDinamico"></div>').appendTo('#miMapa');
  map = new google.maps.Map(document.getElementById("mapaDinamico"),mapProp);
  var cadenaUrl = "http://opendata.aragon.es/socialdata/data"; 
  var fechaInicio = new Date();
  fechaInicio.setTime(fechaInicio.getTime()-(2*7*24*60*60*1000));
  var fechaString = convertirFecha(fechaInicio) ;
	cadenaUrl += "?start_date="+fechaString+"&geolocated=true";
	miyqlMapa(cadenaUrl, function(data) {  });
}

function cargaMarcadores()
{
	if (req.readyState==4 && req.status==200) 
	{	 textoInfo.length = 0;
			var miObj;
			miObj = JSON.parse(req.responseText).query.results.json;
			console.log(miObj);
			var latitud;
			var longitud;
			var contador = 0;
			var marcadores;
			for (i = 0; i < miObj.results.length; ++i) 
			{
				latitud = miObj.results[i].lat;
				longitud = miObj.results[i].lng;
				if (latitud == 'null')
				{
					
					//alert("nulo");
				}
				else
				{
					contador++;
					coordMarcador = new google.maps.LatLng(latitud, longitud);
 
					 ponMarcador(coordMarcador,miObj.results[i],contador);
					
    
				}
				
			}	
			if (contador > 0)
			{
					
					$("#miMapa").show();
					//como el hide provoca que el mapa se descuadre usamos las tres siguientes líneas para volver a dejarlo como estaba
					var center = map.getCenter();
					google.maps.event.trigger(map, "resize");
					map.setCenter(center);
					
			}
			
	}
	
}

function convertirFecha(fecha) 
{
  function pad(s) { return (s < 10) ? '0' + s : s; }
  var d = new Date(fecha);
  return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/');
}

function ponMarcador(latilongi,nodo,contador) {
     var marcador = new google.maps.Marker({
        position: latilongi,
        title: 'Social Data',
        draggable: true,
        map: map,
        icon:'../escucha-activa/public/i/pin_red.png'
    });
  	map.setCenter(marcador.getPosition());
    
		var informacion;
    var texto;
		var textoconUrl;
		var textoUrlHastag;
		texto = nodo.description;
		if (texto == 'null')
 				{texto = 'S&iacute;n descripci&oacute;n';}
		textoconUrl = convierteUrl(texto);
		textoconUrl = textoconUrl.replace('<a class="sizeData"',"<a style='font-size:10px;'");
		textoUrlHastag = convierteHashtag(textoconUrl);
		var find = "<a class='sizeData'";
		var remp = new RegExp(find, 'g');
		textoUrlHastag = textoUrlHastag.replace(remp,"<a style='font-size:10px;'");
   
    informacion ='<div class="colder azul negrita alignIzda">'+nodo.source+' | '+nodo.author+'</div>';
   
    switch(nodo.type)
		{
			case "text":
			informacion +='<p>'+textoUrlHastag+'</p>';
			informacion +='<a style="font-size:10px;" href='+nodo.url+' title="Abrir" acronym="Abrir recursos en origen">Abrir</a>';
				break;
			case "video":
			informacion +='<a style="font-size:10px;" href='+nodo.url+' title="Abrir" acronym="Abrir recursos en origen">Abrir</a>';
				break;
			case "event":
			  
				informacion +='<a style="font-size:10px;" href='+nodo.url+' title="Abrir" acronym="Abrir recursos en origen">Abrir</a>';
				
				break;
			case "picture":
			
				informacion +='<tr><td></td><td class="i_i"><img src='+nodo.thumbnail+' class="ImageBorder"/></td></tr>"';
				informacion +='<a style="font-size:10px;" href='+nodo.url+' title="Abrir" acronym="Abrir recursos en origen">Abrir</a>';
				
				break;
			case "venue":
			  informacion +='<a style="font-size:10px;" href='+nodo.url+' title="Abrir" acronym="Abrir recursos en origen">Abrir</a>';
				break;
			case "code":
			informacion +='<a style="font-size:10px;" href='+nodo.url+' title="Abrir" acronym="Abrir recursos en origen">Abrir</a>';
				break;
		}
		textoInfo.push(informacion); 
		 infowindow = new google.maps.InfoWindow({
  content: '<div id= "infoventana" >'+informacion+'</div> ',
  maxWidth:600});
	 google.maps.event.addListener(marcador, 'click', function() {

 						infowindow.close();
 						infowindow.setContent(textoInfo[contador -1]);
        		infowindow.open(map, marcador);
 
});

  


}
function cargadaPagina()
{
	var paginaUrl;
	$(window).load(function(){
		$('#dvLoading').fadeOut(1000);
	});
	paginaUrl = "http://opendata.aragon.es/socialdata/data?page=1" 
	miyql2(paginaUrl,1, function(data) {  });
	$("#delb").chosen(config).change(onChgChosen2);
	$("#escucharlb").chosen(config).change(onChgChosen1);
	$("#enlb").chosen(config).change(onChgChosen3);

}

 function onChgChosen1() 
 {
				
	 			
      	var valorLang = $("#escucharlb").chosen().val();	
      	var valorLang2 = $("#delb").chosen().val();
      	var valorLang3 = $("#enlb").chosen().val();
      	nuevamontarUrl(valorLang,valorLang2,valorLang3);
      	// aqui lo que sea que haya que hacer al seleccionar un elemento en el desplegable
        
 }
  function onChgChosen2() 
 {
				

      var valorLang = $("#escucharlb").chosen().val();	
      var valorLang2 = $("#delb").chosen().val();
      var valorLang3 = $("#enlb").chosen().val();
      nuevamontarUrl(valorLang,valorLang2,valorLang3);
      // aqui lo que sea que haya que hacer al seleccionar un elemento en el desplegable
        
 }
  function onChgChosen3() 
 {
				
	 		var valorLang = $("#escucharlb").chosen().val();	
      var valorLang2 = $("#delb").chosen().val();
      var valorLang3 = $("#enlb").chosen().val();
      nuevamontarUrl(valorLang,valorLang2,valorLang3);
       // aqui lo que sea que haya que hacer al seleccionar un elemento en el desplegable
        
 }

function nuevamontarUrl(valorLang,valorLang2,valorLang3)
{
	gTodas = 0;
	cadenaTrending = "";
	var cadenaUrl = "http://opendata.aragon.es/socialdata/data"; 
	if (valorLang3 == 'Mapa' )
	{
		montarMapa();
	}
	else
	{
		
		$("#datos_terceros").show()
		$("#mapaDinamico").remove();
		
		if (valorLang == 'Trending' )
		{
			cadenaUrl = "http://opendata.aragon.es/socialdata/trendings?type=diff";
			cadenaTrending = "Trending";
		}
		else
		{
			switch(valorLang2){
		  	case "Todas":
		  	gTodas = 1; 
		  	 break;
		  	case "Microblogging":
		  	 cadenaUrl += "?type=text";
		  	 break;
		  	case "Blogging":
		  		cadenaUrl += "?source=twitter";
		  	  break;
		  	case "Redes":
		  	 cadenaUrl += "?source=facebook_events";
		  	 break;
		  	case "Eventos":
		  	 cadenaUrl += "?type=event";
		  		break;
		  	case "Video":
		  	 cadenaUrl += "?type=video";
		  	 break;
		  	case "Foto":
		  		cadenaUrl += "?type=picture";
		  		break;
		  	case "Web":
		  	 cadenaUrl += "?source=ticketea";
		  		break;
		  	case "Prensa":
		  	 cadenaUrl += "?source=spain_info";
		  		break;
		  	case "Wiki":
		  	 cadenaUrl += "?source=wikipedia";
		  		break;
		  	case "Desarrolladores":
		  	 cadenaUrl += "?type=code";
		  		break;
		  	case "Lugares":
		  	 cadenaUrl += "?type=venue";
		  		break;
		  	
		  }
		}
		 $('#dvLoading').fadeIn(200);
	  miUrl = cadenaUrl;
   miyql(cadenaUrl,1, function(data) {  });
	}
}

function montaCabecera()
{
	  var cabecera;
	  
cabecera = '<tr><th class="cabeceraTablaResultadosDataset"><div class="labelCabeceraTablaResultadosDataset">1.877 conjuntos de datos encontrados</div>';
cabecera += '<ul class="d_d"><li><a href="javascript:changeOrder(\'sort=title_string+asc\')"  title="Orden ascendente"><img src="/public/i/buscaDatos/flechaBlancaUp.png" alt="Orden ascendente">';
cabecera +=	'</a></li><li><a href="javascript:changeOrder(\'sort=title_string+desc\')"  title="Orden descendente"><img src="/public/i/buscaDatos/flechaAzulDown.png" alt="Orden descendente">';
cabecera += '</a></li></ul></th><th class="cabeceraTablaResultadosDataset tamEstrecho"><div class="labelCabeceraTablaResultadosDataset">N&ordm; ACCESOS</div>';
cabecera += '<ul class="d_d"><li><a href="javascript:changeOrder(\'sort=views_total+asc\')"  title="Orden ascendente"><img src="/public/i/buscaDatos/flechaAzulUp.png" alt="Orden ascendente">';
cabecera +='</a></li><li><a href="javascript:changeOrder(\'sort=views_total+desc\')"  title="Orden descendente">';
cabecera +=		'<img src="/public/i/buscaDatos/flechaAzulDown.png" alt="Orden descendente"></a></li></ul>';
cabecera += '</th><th class="cabeceraTablaResultadosDataset tamEstrecho"><div class="labelCabeceraTablaResultadosDataset">FECHA (ACT)</div>';
cabecera += '<ul class="d_d"><li><a href="javascript:changeOrder(\'sort=metadata_modified+asc\')  title="Orden ascendente">';
cabecera += '<img src="/public/i/buscaDatos/flechaAzulUp.png" alt="Orden ascendente"></a></li><li><a href="javascript:changeOrder(\'sort=metadata_modified+desc\')"  title="Orden descendente"><img src="/public/i/buscaDatos/flechaAzulDown.png" alt="Orden descendente"></a></li></ul></th> </tr>"';
return(cabecera);

}
/* An InfoBox is like an info window, but it displays
 * under the marker, opens quicker, and has flexible styling.
 * @param {GLatLng} latlng Point to place bar at
 * @param {Object} opts Passes configuration options - content, 
 *   offsetVertical, offsetHorizontal, className, height, width
 */
function InfoBox(latlng, map, opts) {
  google.maps.OverlayView.call(this, map);
  this.latlng_ = latlng;
  this.content_ = opts.content || "Hello World";
  this.offsetVertical_ = opts.offsetVertical || -185;
  this.offsetHorizontal_ = opts.offsetHorizontal || -5;

  this.height_ = opts.height || 175;
  this.width_ = opts.width || 270;
  this.map_ = map;
}

/* InfoBox extends GOverlay class from the Google Maps API
 */
InfoBox.prototype = new google.maps.OverlayView();

/* Creates the DIV representing this InfoBox
 * @param {GMap2} map The map to add infobox to
 */
InfoBox.prototype.panes_changed = function() {
  if (this.div_) {
    this.div_.parentNode.removeChild(this.div_);
    this.div_ = null;
  }

  var panes = this.get('panes');

  if (panes) {
    // Create the DIV representing our Bar
    var div = this.div_ = document.createElement("div");
    div.style.border = "0px none";
    div.style.position = "absolute";
    div.style.background = "url('http://ace.imageg.net/images/WIZ_ACE_myStore/mapBubble.png')";
    div.style.paddingTop = "12px";
    div.style.width = this.width_ + "px";
    div.style.height = this.height_ + "px";
    var contentDiv = document.createElement("div");
    contentDiv.style.padding = "30px"
    contentDiv.innerHTML = this.content_;

    var topDiv = document.createElement("div");
    topDiv.style.textAlign = "right";
    topDiv.style.paddingRight = "10px";
    var closeImg = document.createElement("img");
    closeImg.style.cursor = "pointer";
    closeImg.src = "http://www.google.com/intl/en_us/mapfiles/close.gif";
    topDiv.appendChild(closeImg);

    function removeInfoBox(ib) {
      return function() { 
        ib.setMap(null);
      };
    }

    google.maps.event.addDomListener(closeImg, 'click', removeInfoBox(this));

    div.appendChild(topDiv);
    div.appendChild(contentDiv);

    this.draw();

    // Then add this overlay to the DOM
    panes.floatPane.appendChild(div);
  }
}

/* Redraw the Bar based on the current projection and zoom level
 */
InfoBox.prototype.draw = function() {
  if (!this.div_) return;

  // Calculate the DIV coordinates of two opposite corners of our bounds to
  // get the size and position of our Bar
  var pixPosition = this.getProjection.fromLatLngToDivPixel(this.latlng_);
  if (!pixPosition) return;

  // Now position our DIV based on the DIV coordinates of our bounds
  this.div_.style.width = this.width_ + "px";
  this.div_.style.left = (pixPosition.x + this.offsetHorizontal_) + "px";
  this.div_.style.height = this.height_ + "px";
  this.div_.style.top = (pixPosition.y + this.offsetVertical_) + "px";
  this.div_.style.display = 'block';

  // if we go beyond map, pan map
  var mapWidth = this.map_.getDiv().offsetWidth;
  var mapHeight = this.map_.getDiv().offsetHeight;
  var bounds = this.map_.getBounds();
  var boundsSpan = bounds.toSpan();
  var longSpan = boundsSpan.lng();
  var latSpan = boundsSpan.lat();
  var degWidth = (this.width_/mapWidth) * longSpan;
  var degHeight = (this.height_/mapHeight) * latSpan;

  if (this.latlng_.lng() + degWidth > bounds.getNorthEast().lng()) {
    this.map_.setCenter(this.latlng_);
  }

  var bottompt = new google.maps.LatLng( (this.latlng_.lat() - degHeight), this.latlng_.lng());
  if (!bounds.contains(bottompt)) {
    this.map_.setCenter(this.latlng_);
  }
}
