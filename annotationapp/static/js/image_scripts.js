$(document).ready(function(){
    //http://jsbin.com/cudecedere/edit?html,js,output
		       
    $('#file-upload').on('change', function(){
            if (this.files && this.files[0]) {
            var reader = new FileReader();

            reader.onload = function () {

                var image = new Image()
                image.src = reader.result

                image.onload = function(){
                    $('#freq-img')
                    .attr('src', image.src)
                    $('#image-widget').hide()
                	var raster = new Raster('freq-img')
                	raster.position = view.center;
                }
                
            };

            reader.readAsDataURL(this.files[0]);
        }
        })
    
                
    })