const baseURL = 'http://127.0.0.1:8000/tarefa'

let tarefa = []
let editing = false
let tarefa_id

function resetar_formulario() {
    const form_tarefa = document.getElementById('form-tarefa')
    form_tarefa.reset()

    const btn_confirmar = document.getElementById('btn-confirmar')
    btn_confirmar.value = 'Adicionar Tarefa'

    editing = false
}

function atualizar_tela(){
    // Manipulacao de DOM
    const ul_tarefas = document.getElementById('list-tarefa')
    ul_tarefas.innerHTML = []

    for(let tarefa of tarefas){
        const item = document.createElement('li')
        const label = `#${tarefa.id} - ${tarefa.descricao} -  ${tarefa.responsavel} - ${tarefa.nivel} -  ${tarefa.prioridade} -  ${tarefa.situacao}  `

        const btn_editar = document.createElement('a') // <a></a>
        btn_editar.innerText = 'Editar' // <a>Editar</a>
        btn_editar.href = '#'
        
        btn_editar.onclick = (event) => {
            event.preventDefault()

            // 1. Preencher o Formulário
            preencher_formulario(tarefa)
            
            // 2. Mudar o Label do Botão para Atualizar
            const btn_confirmar = document.getElementById('btn-confirmar')
            btn_confirmar.value = 'Editar Tarefa'

            // 3. Salvar um Estado Global se está editando
            editing = true
            tarefa_id = tarefa.id
        }

        const btn_remover = document.createElement('a') // <a></a>
        btn_remover.innerText = 'Remover' // <a>Editar</a>
        btn_remover.href = '#'
        const espaco = document.createElement('span')
        espaco.innerText = ' '
        btn_remover.onclick = async (event) => {
            
            event.preventDefault()
            const confirmou = confirm(`Deseja remover a Tarefa: ${tarefa.nome}`)

            if (!confirmou){
                return
            }

            const response = await fetch(baseURL+'/'+tarefa.id, {method: 'DELETE'})

            // se deu certo..
            if (response.ok){
                alert('Filme removido com sucesso!')
                carregar_filmes()
            }
        }

        item.innerText = label
        item.appendChild(btn_editar)
        item.appendChild(espaco)
        item.appendChild(btn_remover)

        ul_filmes.appendChild(item)
    }
}

//function preencher_formulario(filme){
  //  const form_filme = document.getElementById('form-filme')

    //const inputs = form_filme.children
  //  inputs[0].value = filme.nome
  //  inputs[1].value = filme.genero
    //inputs[2].value = filme.ano
   // inputs[3].value = filme.duracao
//}

//async function carregar_filmes(){
  //  console.log('API - Todos os filmes')
  //  const response = await fetch(baseURL)

  //  const status = response.status
   // filmes = await response.json()

    //atualizar_tela()

    // console.log('Status', status)
    // console.log('Dados', dados)
//}

//function configurar_formulario(){
   // const form_filme = document.getElementById('form-filme')
 //   const input_duracao = document.getElementById('duracao')

   //

app()