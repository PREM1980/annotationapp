paper.install(window)
$(document).ready(function(){		
    paper.setup('myCanvas')
    var tool = new Tool();
    tool.minDistance = 10
    project.currentStyle = {
		strokeColor: 'red',
		fillColor: '#ff0000',
		strokeWidth: 3
    };
	    
//    console.log(annotationsObject)
    
    $('#annotation-file-upload').on('change', function(){
            if (this.files && this.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {      
            	console.log(typeof reader.result)
            	annotationsObject = JSON.parse(reader.result)
            	console.log(annotationsObject)
            	console.log(typeof annotationsObject)
            	load_data(annotationsObject)
            };
            reader.readAsText(this.files[0])
//            reader.readAsDataURL(this.files[0]);
        }
        })

    function load_data(annotationsObject){
    	
        var path;
        var resolution = .02

	    for (var i=0; i < annotationsObject.annotations.aisles.length; i++) {
	    	x_y_axis = Object.values(annotationsObject.annotations.aisles[i])[0]	    	
	    	from = new Point(x_y_axis[0]/resolution, 1788 - x_y_axis[1]/resolution)
	    	to = new Point(x_y_axis[3]/resolution, 1788 - x_y_axis[4]/resolution)
	    	path = new Path.Line(from, to);
	    	path.name = Object.keys
	    	
	    }
        for (var i=0; i < annotationsObject.annotations.poses.length; i++) {
        	console.log('poses')
        	poses = Object.values(annotationsObject.annotations.aisles[i])[0]
        	console.log('poses = ', poses)
        	r = 100
        	x = poses[0]/resolution
        	y = 1788 - poses[1]/resolution
        	theta = poses[2]
        	start = new Point(x, y)
            x1 = x + r*Math.cos(theta),
            y1 = y + r*Math.sin(theta)
            end = new Point(x1,y1)       
        	drawArrow(start, end)
        }                
    }
    
    function drawArrow(start, end) {
    		console.log('drawArrow start =', start)
    		console.log('drawArrow end =', end)
            var headLength = 10;
            var headAngle = 135;
            var arrowColor = 'green';
            var tailLine = new Path.Line(start, end);
            var tailVector = end.subtract(start);

            var headLine = tailVector.normalize(headLength);          
            arrowline = new Group([
                new Path.Circle(new Point(start, end), 5),                   
                new Path([start, end]),
                new Path([
                    end.add(headLine.rotate(headAngle)),
                    end,
                    end.add(headLine.rotate(-headAngle))
                ])
            ]);
            arrowline.strokeColor = arrowColor;
            arrowline.selected = true;
//            arrowline.strokeWidth = 10;
            
        }
    
    $('#save-data').on('click', function(){
    	JSON.parse(paper.project.exportJSON())[0][1].children
    })
})

