var campoFiltro = document.querySelector('#filtrarCategoria');
campoFiltro.addEventListener('input', function(){
    console.log(this.value); 
 
    var categorias = document.querySelectorAll('#categoria');

    if(this.value.length > 0){
        for(var i = 0; i < categorias.length; i++){
            var categoria = categorias[i];
            var tdNome = categoria.querySelector('#titulo');
            var nome = tdNome.textContent;
            
            var expressao = new RegExp(this.value, "i");

            if(!expressao.test(nome)){
                categoria.classList.add('invisivel');
            } else {
                categoria.classList.remove('invisivel');
            }
        }
    } else {
        for(var i = 0; i < categorias.length; i++){
            var categoria = categorias[i];
            categoria.classList.remove('invisivel');
        }
    }
});