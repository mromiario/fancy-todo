function editdata(id){
    $('#editform').empty()
    $('#viewall').empty()
    $.ajax({
        method : 'GET',
        url : `http://localhost:3000/api/todos/${id}`,
        headers : {
            token : localStorage.getItem('token')
        }
    })
    .done(data=>{
        console.log(data);
        let date = new Date(data.due)
        let month
        if(date.getMonth()<10) {
            month = '0'+date.getMonth()
        } else {
            month = date.getMonth()
        }
        date = `${date.getFullYear()}-${month}-${date.getDate()}`
        $('#editform').prepend(

            `
            <form class = "ml-4 mt-4 mb-4 mr-4" >
            <div class="form-group">
                <label for="u_nameTodo">Task:</label>
                <input type="text" class="form-control" id="u_nametodo" value = "${data.name}">
            </div>

            <div class="form-group">
                <label for="u_desc">Description:</label>
                <input type="text" class="form-control" id="u_desc" value = "${data.description}">
            </div>

            <div class="form-group">
                <label for="u_due">Due date:</label>
                <input type="date" class="form-control" id="u_due" value = '${date}'>
            </div>

            <button type="submit" class="btn btn-default" onclick ="updated('${id}')">Update</button> 
        </form>`
        )

    })
    .fail(function(gg, textStatus){
        console.log('Error :',textStatus);
    })

}


function updated(id){
    $.ajax({
        method : 'PATCH',
        url : `http://localhost:3000/api/todos/${id}`,
        headers : {
            token : localStorage.getItem('token')
        }, 
        data : {
            name : $('#u_nametodo').val(),
            description : $('#u_desc').val(),
            due : $('#u_due').val()
        }
    })
        .done(function(data){
            findAll()
            console.log(data);
        })
        .fail(function(gg, textStatus){
            console.log('Error :',textStatus);
        })
    }

