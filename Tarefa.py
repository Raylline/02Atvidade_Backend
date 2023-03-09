
from fastapi import FastAPI, HTTPException, status, responses
from pydantic import BaseModel

app = FastAPI()

class tarefas(BaseModel):
    id: int | None
    descricao: str | None
    responsavel: str | None
    nivel: int #Nivel 1,3,5,8
    prioridade: int #Prioridades1,2,3
    situacao: str | None # Nova, Em Andamento, Pendente, Resolvida, Cancelada

Task:list[tarefas]=[]    

#Adicionar, Remover, Listar, Detalhes (Obter um)
@app.get('/tarefa')
async def tarefa():
    return Task

@app.get('/tarefa/{tarefa_id}')
def tarefa_uma(tarefa_id:int):
    for tarefa in Task: 
        if tarefa.id == tarefa_id:
            return tarefa

@app.post('/tarefa',status_code = status.HTTP_201_CREATED)
async def tarefa(tarefa: tarefas):
    tarefa.id = len(Task) + 0
    Task.append(tarefa)
    return tarefa

@app.delete('/tarefa/{id}')
async def tarefa(id: int):
    Task.remove(id)
    return id

#Marcar como EM ANDAMENTO
#Marcar como PENDENTE
#Marcar como RESOLVIDA
@app.put('/tarefa/{id}')
async def tarefa(id: int, tarefa: tarefas):
    Task[id] = tarefa
    return tarefa

@app.put('/tarefa/atualizar/em_andamento/situacao/{tarefa_id}')
def atualizar_EmAndamento(tarefa_id:int):
    for index in range(len(Task)):
        tarefa_atual = Task[index]
        if tarefa_atual.id == tarefa_id:
            tarefa_id = tarefa_atual
            if tarefa_atual.situacao == "Nova" or "Pendente":
                tarefa_atual.situacao = "Em Andamento"
                Task[index] = tarefa_atual
                return tarefa_atual
        
    raise HTTPException(status_code = status.HTTP_404_NOT_FOUND,
                        detail= f'not found id={tarefa_id}')


@app.put('/tarefa/atualizar/pendente/situacao/{tarefa_id}')
def atualizar_EmAndamento(tarefa_id:int):
    for index in range(len(Task)):
        tarefa_atual = Task[index]
        if tarefa_atual.id == tarefa_id:
            tarefa_id = tarefa_atual
            if tarefa_atual.situacao == "Nova" or "Em Andamento":
                tarefa_atual.situacao = "Pendente"
                Task[index] = tarefa_atual
                return tarefa_atual
        
    raise HTTPException(status_code = status.HTTP_404_NOT_FOUND,
                        detail= f'not found id={tarefa_id}')

@app.put('/tarefa/atualizar/resolvida/situacao/{tarefa_id}')
def atualizar_EmAndamento(tarefa_id:int):
    for index in range(len(Task)):
        tarefa_atual = Task[index]
        if tarefa_atual.id == tarefa_id:
            tarefa_id = tarefa_atual
            if tarefa_atual.situacao == "Em Andamento" :
                tarefa_atual.situacao = "Resolvida"
                Task[index] = tarefa_atual
                return tarefa_atual
        
    raise HTTPException(status_code = status.HTTP_404_NOT_FOUND,
                        detail= f'not found id={tarefa_id}')

@app.put('/tarefa/atualizar/cancelar/situacao/{tarefa_id}')
def atualizar_EmAndamento(tarefa_id:int):
    for index in range(len(Task)):
        tarefa_atual = Task[index]
        if tarefa_atual.id == tarefa_id:
            tarefa_id = tarefa_atual
            if tarefa_atual.situacao == "Nova" or "Pendente" or "Em Andamento" and "Resolvida":
                tarefa_atual.situacao = "Cancelada"
                Task[index] = tarefa_atual
                return tarefa_atual
        
    raise HTTPException(status_code = status.HTTP_404_NOT_FOUND,
                        detail= f'not found id={tarefa_id}')

#Listar Filtrado por Situação (usar Query Param)

#Listar Filtrado por Nível e Prioridade (usar Query Param)



