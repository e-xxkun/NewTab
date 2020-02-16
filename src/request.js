import axios from 'axios'

export const getImg = (callback) => {
  var pos
  try {
    pos=JSON.parse(localStorage.getItem('pos'))
    pos.index++
    if(pos.index>pos.len){
      pos.page++
      pos.index=1
    }
  } catch (error) {
    pos={index:1,page:1,len:20}
  }
  var tagName='电脑壁纸'
  var data={
    cateId:1,
    subCateId:14,
    tagName:tagName,
    order:1,
    page:{
      showCount:20,
      currentPage:pos.page
    }
  }
  
  axios.post('https://www.ssyer.com/apis/20001', data).then(res=>{
    console.log(res)
    if(res&&res.data&&res.data.data){
      var url=res.data.data[pos.index-1].showUrl
      console.log(url)
      callback(url)
      pos.len=res.data.data.length
      pos.url=url
      localStorage.setItem('pos',JSON.stringify(pos))
      /*
      getDataURI(url,img=>{
        console.log(img)
        localStorage.setItem('bg-ca',img)
        localStorage.setItem('pos',JSON.stringify(pos))
      })
      */
    }
  })
}

export const getDownLink = url =>{
  try{
    var pos=JSON.parse(localStorage.getItem('pos'))
    if(pos&&pos.url)
      return pos.url
  }catch(e){
    console.log(e)
    return '#'
  }
  return 
}
/*
function getDataURI(url,callback){
  var img = new Image()
  console.log(img)
  img.onload=onload
  img.onerror=onerror
  img.setAttribute('crossOrigin', 'Anonymous');
  img.src=url

  function onload() {
    unbindEvent();
    var canvas = document.createElement( "canvas" );
    canvas.width  = img.width;
    canvas.height = img.height;
    canvas.getContext( "2d" ).drawImage( img, 0, 0 );
    img=null
    callback(canvas.toDataURL( "image/jpeg" ))
  }

  function onerror ( error ) {
    unbindEvent();
  }

  function unbindEvent() {
    img.onload  = null;
    img.onerror = null;
    img.onabort = null;
  }
}
/*
function save(uri,file_name) {
  window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
  window.requestFileSystem( window.TEMPORARY , 52428800, fileEntry => {
    console.log( "File init complete.", fileEntry );
    fileEntry.root.getFile( file_name, { create : true }, file => {
      file.createWriter( function( fileWriter ) {
        console.log("fileEntry.toURL() = " + file.toURL());
        fileWriter.onwriteend    = onwriteend;
        fileWriter.onabort       = unBindEvent;
        fileWriter.onerror       = unBindEvent;
        fileWriter.write( dataURItoBlob( uri ));

        function unBindEvent(e) {
            fileWriter.onabort      = null;
            fileWriter.onerror      = null;
            fileWriter.onwriteend   = null;
        };
        function onwriteend(e){
          unBindEvent(e)
          console.log("Completed")
        }
      },error => {
        console.log("Save file fail",error);
      });
    },error => {
      console.log( "Get file fail:", error );
    });
  }, error => {
    console.log( "Save file fail:", error );
  } );
}

function dataURItoBlob( dataURI ) {
  // convert base64 to raw binary data held in a string
  var byteString = atob( dataURI.split(',')[1] );
  // separate out the mime component
  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
  // write the bytes of the string to an ArrayBuffer
  var ab = new ArrayBuffer( byteString.length );
  var ia = new Uint8Array( ab );
  for ( var i = 0; i < byteString.length; i++ ) {
      ia[i] = byteString.charCodeAt(i);
  }
  var blob = new Blob( [ia], { type: "image/jpg" });
  console.log(blob)
  return blob;
}
*/