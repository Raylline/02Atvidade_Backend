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
    
    const ul_tarefas = document.getElementById('list-tarefa')
    ul_tarefas.innerHTML = []

    for(let tarefa of tarefas){
        const item = document.createElement('li')
        const label = `#${tarefa.id} - ${tarefa.descricao} -  ${tarefa.responsavel} - ${tarefa.nivel} -  ${tarefa.prioridade} -  ${tarefa.situacao}  `

        const btn_editar = document.createElement('a') 
        btn_editar.innerText = 'Editar' 
        btn_editar.href = '#'
        
        btn_editar.onclick = (event) => {
            event.preventDefault()
            preencher_formulario(tarefa)
            
            
            const btn_confirmar = document.getElementById('btn-confirmar')
            btn_confirmar.value = 'Editar Tarefa'
            editing = true
            tarefa_id = tarefa.id
        }

        const btn_remover = document.createElement('a') 
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

function preencher_formulario(tarefa){
  const form_tarefa = document.getElementById('form-tarefa')

    const inputs = form_tarefa.children
    inputs[0].value = tarefa.descricao
    inputs[1].value = tarefa.responsavel
    inputs[2].value = tarefa.nivel
    inputs[3].value = tarefa.prioridade
    inputs[4].value = tarefa.situacao
}


async function carregar_tarefas(){
console.log('API - Todos as tarefas cadastradas')
const response = await fetch(baseURL)

const status = response.status
tarefas = await response.json()

atualizar_tela()

console.log('Status', status)
console.log('Dados', dados)
}

function configurar_formulario(){
const form_tarefas = document.getElementById('form-tarefas')
const input_nivel = document.getElementById('nivel')
}

app()
