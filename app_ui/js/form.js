function form(option){
    var api = 'http://localhost:3000/users';
    console.log(option.test)
    option.test.forEach(function(testFn){
        const inputElement = document.querySelector(testFn.selection);
        const errorElement = inputElement.parentElement.querySelector('.form-message');
        inputElement.onblur = function(){
            const errorMessage = testFn.test(inputElement.value);
            console.log(errorMessage)
            if(errorMessage){
                errorElement.innerHTML = errorMessage;
            }
            else{
                errorElement.innerHTML = '';
            }
        }
    })
    const formElement = document.querySelector('.form-submit')
    console.log(option.form)
    formElement.onclick = function(e){
        e.preventDefault();
        option.test.forEach(function(testFn){
            const inputElement = document.querySelector(testFn.selection);
            const errorElement = inputElement.parentElement.querySelector('.form-message');
            const errorMessage = testFn.test(inputElement.value);
            console.log(inputElement)
            console.log(errorMessage)
            if(errorMessage){
                errorElement.innerHTML = errorMessage;  
            }
            else{
                errorElement.innerHTML = '';
            }
        })
        let count = 0;
        for(let i =0 ; i< option.test.length; i++){
            const inputElement = document.querySelector(option.test[i].selection);
            if(option.test[i].test(inputElement.value)){
                alert(option.erorrMessage);
                break;
            }
            count++;
        }
        function createUser(user){
            var options = {
              method: 'POST',
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(user)
            }
            fetch(api, options)
              .then(function(response){
                return response.json();
              }) 
        }
        function getUser(account,password){
            fetch(api)
              .then(function(response){
                return response.json();
              }) 
              .then(function(list_users){
                return list_users;
              })
              .then(function(users){
                users.forEach(function(user){
                  if (user.name === account &&user.password === password){
                    window.location.href = '/app_ui/html/qls.html';
                  }
                })
              })
          }
        if(count === option.test.length){
            alert(option.message);
            var user = option.test.reduce(function(obj,testFn){
                const inputElement = document.querySelector(testFn.selection);
                obj[inputElement.name] = inputElement.value;
                return obj;
            },{})
            if(option.form === 'form-2'){     
                getUser(document.querySelector('#name').value, document.querySelector('#password').value)
            }
            if(option.form === 'form-1'){
                console.log(user);
                createUser(user)
            }
            
        }
    }
}
function testName(selection){
    return  {
        selection: selection,
        test: function(value){
            return value.trim() ? undefined : "Vui lòng nhập trường này"
        }
    }
}
function testPassword(selection){
    return  {
        selection: selection,
        test: function(value){
            return value.length >= 6 ? undefined : "Mật khẩu tốt thiểu cần 6 ký tự"
        }
    }
}
function testConfirmPassword(selection, password){
    return  {
        selection: selection,
        test: function(value){
            return value === password() ? undefined : 'Mật khẩu nhập lại không trùng khớp'
        }
    }
}