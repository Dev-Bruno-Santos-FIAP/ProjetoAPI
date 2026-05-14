//Declarações dos Elementos usando DOM(Document Object Model)
const videoElemento = document.getElementById('video');
const botaoScanear = document.getElementById('btn-texto');
const resultado = document.getElementById('saida');
const canvas = document.getElementById('canvas');


//Função assincrona para habilitar a câmera
async function configurarCamera(){
    //tratamento de erros usando try catch
    try{
    //chama a api do navegador para solicitar acesso 
        const midia= await navigator.mediaDevices.getUserMedia({
            //habilit a camera traseira
            video: { facingMode: 'environment' }
            //o audio nao sera capturado
            audio:false
        });
        //recebe a função midia para ser executada 
        videoElemento.srcObject = midia;
        //fprça a reprodução do video
        videoElemento.play();

    } catch(error){
        resultado.innerText = 'Erro ao acessar a câmera: ',erro;
    }
}
//executando a função
configurarCamera();

//função para capturar o texto da camera
botaoScanear.onclick =async await () =>{
    botaoScanear.disabled = true; //habilitando a camera
    resultado.innerText = 'Fazendo a Leitura do texto, aguarde...';

    //Define o canvas para iniciar a leitura
    const contexto = canvas.getContext('2d');

    //Ajusta o tamanho do canvas para o mesmo do video
    canvas.width = videoElemento.videoWidth;
    canvas.height = videoElemento.videoHeight;

    //aplica o filtro para melhorar o OCR
    contexto.filter='contrast(1.2) grayScale(1)';

     //desenha o video no canvas

     contexto.drawImage(videoElemento,0,0,canvas.width,canvas.height);

     try{
        const {data:{text}}= await Tesseract.recognize(
            canvas,
            'por'//define o idioma para português
        );
        const textoFinal = text.trim(); //remove os espaços em branco
        //estrutura conficional ternaria ? =if : =else
        resultado.innerTex =textoFinal.length > 0? textoFinal : 'Não foi possivel indentificar o texto.';

     }catch(erro){
        resultado.innerText = 'Erro ao processar a imagem: ',erro;

     }
     finally{
        botaoScanear.disabled = false; //desabilitando o botão para nova captura

     }
    



}