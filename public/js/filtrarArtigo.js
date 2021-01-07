var campoFiltro = document.querySelector('#filtrarArtigo');
campoFiltro.addEventListener('input', function(){
    console.log(this.value); 
 
    var artigos = document.querySelectorAll('#artigo');

    if(this.value.length > 0){
        for(var i = 0; i < artigos.length; i++){
            var artigo = artigos[i];
            var tdNome = artigo.querySelector('#titulo');
            var nome = tdNome.textContent;
            
            var expressao = new RegExp(this.value, "i");

            if(!expressao.test(nome)){
                artigo.classList.add('invisivel');
            } else {
                artigo.classList.remove('invisivel');
            }
        }
    } else {
        for(var i = 0; i < artigos.length; i++){
            var artigo = artigos[i];
            artigo.classList.remove('invisivel');
        }
    }
});